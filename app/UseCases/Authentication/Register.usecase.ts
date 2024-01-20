import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationException from 'App/Exceptions/AuthenticationException'
import RegisterOutput from 'App/Interfaces/Output/Authentication/RegisterOutput'
import { IUserRegistration } from 'App/Interfaces/user'
import InstitutionRepository from 'App/Repository/InstitutionRepository'
import UserRepository from 'App/Repository/UserRepository'

export default class RegisterUseCase {
  private userRepository = new UserRepository()
  private institutionRepository = new InstitutionRepository()

  /**
   * Executes the function with the provided context and user data.
   *
   * @param {HttpContextContract} ctx - The context object for the HTTP request.
   * @param {UserRegistration} userData - The user registration data.
   * @return {Promise<any>} The promise that resolves with the response data.
   */
  /**
   * Executa o registro do usuário.
   *
   * @param {HttpContextContract} ctx - O contexto do HTTP request.
   * @param {IUserRegistration} userData - Os dados do usuário para registro.
   * @return {Promise<any>} A promise que resolve com os dados da resposta.
   */
  public async execute(
    ctx: HttpContextContract,
    userData: IUserRegistration
  ): Promise<RegisterOutput | Error> {
    if (await this.userRepository.findByEmail(userData.email)) {
      return new AuthenticationException('Email already in use', 400, 'E_NOTFOUND_FAILURE')
    }

    if (!(await this.ensureInstitutionIdExists(userData.institutionId))) {
      return new AuthenticationException(
        'Institution does not exist',
        400,
        'E_INSTITUTION_NOT_FOUND'
      )
    }

    try {
      const user = await this.userRepository.registerAnUser(userData)

      return await ctx.auth.login(user)
    } catch (error) {
      return new AuthenticationException(
        'An error occurred while registering the user',
        500,
        'E_DATABASE_FAILURE'
      )
    }
  }

  /**
   * Verifica se a instituição existe.
   *
   * @param {string} institutionId - O ID da instituição.
   * @return {Promise<boolean>} Retorna true se a instituição existir, false caso contrário.
   */
  private async ensureInstitutionIdExists(institutionId: string): Promise<boolean> {
    const institution = await this.institutionRepository.getInstitutionById(institutionId)
    return institution !== null
  }
}
