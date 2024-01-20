import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationException from 'App/Exceptions/AuthenticationException'
import LoginOutput from 'App/Interfaces/Output/Authentication/LoginOutput'
import { IUserLoginAttempt } from 'App/Interfaces/user'
import UserRepository from 'App/Repository/UserRepository'

export default class LoginUseCase {
  /**
   * Executa a tentativa de login de um usuário.
   *
   * @param {IUserLoginAttempt} userData - Os dados de login do usuário.
   * @param {Auth} auth - O objeto de autenticação.
   * @return {Promise<any>} - Uma promise que resolve para o resultado da tentativa de login.
   */
  private async handleLogin(userData: IUserLoginAttempt, auth) {
    return await auth.attempt(userData.email, userData.password)
  }

  /**
   * Executa a função com o UserLoginAttemptPayload e HttpContextContract fornecidos.
   *
   * @param {IUserLoginAttempt} UserLoginAttemptPayload - O payload contendo os dados da tentativa de login do usuário.
   * @param {HttpContextContract} ctx - O contexto HTTP.
   * @return {Promise} Uma promise que resolve para o objeto do usuário.
   */
  public async execute(
    UserLoginAttemptPayload: IUserLoginAttempt,
    ctx: HttpContextContract
  ): Promise<LoginOutput | Error> {
    try {
      const userRepository = new UserRepository()
      const usuario = await userRepository.findByEmail(UserLoginAttemptPayload.email)
      console.log(usuario)
      console.log('---------')

      if (!(await Hash.verify(usuario?.password, UserLoginAttemptPayload.password))) {
        console.log('CREDENCIAL INVALIDA')
      } else {
        return ctx.auth.attempt(UserLoginAttemptPayload.email, UserLoginAttemptPayload.password)
      }
      /*
      console.log(`[Execute LoginUseCase]: ${UserLoginAttemptPayload}`)

      const userInstance = await ctx.auth
        .use('api')
        .attempt(UserLoginAttemptPayload.email, UserLoginAttemptPayload.password)
      console.log(`[USERINSTANCE]: ${userInstance}`)
      //z'await ctx.auth.use('api').login(UserLoginAttemptPayload.email, UserLoginAttemptPayload.password)
      return userInstance
      */
    } catch (error) {
      console.log(error)
      if (error.code === 'E_INVALID_AUTH_UID' || error.code === 'E_INVALID_AUTH_PASSWORD') {
        return new AuthenticationException('Invalid email or password', 400, 'E_NOTFOUND_FAILURE')
      }

      return new AuthenticationException(
        'An error occurred while logging in the user',
        500,
        'E_DATABASE_FAILURE'
      )
    }
  }
}
