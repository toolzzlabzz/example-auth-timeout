import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginOutput from 'App/Interfaces/Output/Authentication/LoginOutput'
import RegisterOutput from 'App/Interfaces/Output/Authentication/RegisterOutput'
import { IUserRegistration } from 'App/Interfaces/user'
import { LoginUseCase, RegisterUseCase } from 'App/UseCases/Authentication/'

export default class AuthenticationService {
  private register = new RegisterUseCase()
  private login = new LoginUseCase()

  public async loginHandler(
    UserLoginAttemptPayload: any,
    ctx: HttpContextContract
  ): Promise<LoginOutput | Error | void> {
    console.log(`loginHandler: ${UserLoginAttemptPayload}`)
    const loginUser = await this.login.execute(UserLoginAttemptPayload, ctx)
    if (loginUser instanceof Error) {
      throw loginUser
    }
    console.log('retorno do login: ' + loginUser)
    return ctx.response.ok(new LoginOutput(loginUser))
  }

  /**
   * Registers a user handler.
   *
   * @param {IUserRegistration} UserRegistration - the user registration data
   * @param {HttpContextContract} ctx - the HttpContextContract object
   * @return {Promise<void>} a promise that resolves when the registration is complete
   */
  public async registerHandler(
    UserRegistration: IUserRegistration,
    ctx: HttpContextContract
  ): Promise<RegisterOutput | Error | void> {
    const user = await this.register.execute(ctx, UserRegistration)
    if (user instanceof Error) {
      throw user
    }
    return ctx.response.created(new RegisterOutput(user))
  }
}
