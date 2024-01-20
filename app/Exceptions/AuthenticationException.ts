import { Exception } from '@adonisjs/core/build/standalone'
import Sentry from '@ioc:Adonis/Addons/Sentry'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new CreateKnowledgebaseException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AuthenticationException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    console.error(error)

    if (error.code === 'E_GENERAL_FAILURE') {
      Sentry.captureException(error)
      return ctx.response
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } })
    }
    if (error.code === 'E_NOTFOUND_FAILURE') {
      return ctx.response
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } })
    }
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } })
    }
    if (error.code === 'E_DATABASE_FAILURE') {
      Sentry.captureException(error)
      return ctx.response
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } })
    }

    if (error.code === 'E_DETELE_FAILURE') {
      Sentry.captureException(error)
      return ctx.response
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } })
    }

    if (error.code === 'E_PERMISSION_DENIED') {
      Sentry.captureException(error)
      return ctx.response
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } })
    }
    Sentry.captureException(error)
    return ctx.response
      .status(error.status)
      .json({ error: { code: error.code, message: error.message } })
  }
}
