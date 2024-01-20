import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationService from 'App/Services/Authentication.service'
import LoginAttemptValidator from 'App/Validators/LoginAttemptValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
    private authenticationService = new AuthenticationService()

    /**
     * Register a new user.
     *
     * @param {HttpContextContract} context - The HttpContextContract object.
     * @return {Promise<void>} - A promise that resolves when the registration is complete.
     */
    public async register(context: HttpContextContract) {
        await this.authenticationService.registerHandler(await context.request.validate(RegisterValidator), context)
    }

    /**
     * Login function that handles the login process.
     *
     * @param {HttpContextContract} context - The HttpContextContract object for the request.
     */
    public async login(context: HttpContextContract) {
      const UserLoginAttemptPayload = await context.request.validate(LoginAttemptValidator)
      return await context.auth.attempt(UserLoginAttemptPayload.email, UserLoginAttemptPayload.password)
    }
}
