import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class HttpHandler {
  public okResponse(ctx: HttpContextContract, data: any) {
    return ctx.response.ok(data)
  }

  public notFoundResponse(ctx: HttpContextContract, message = 'Not Found') {
    return ctx.response.notFound({ body: { message: message } })
  }

  public internalServerErrorResponse(ctx: HttpContextContract, message) {
    return ctx.response.internalServerError({ body: { message } })
  }

  public badRequestResponse(ctx: HttpContextContract, message) {
    return ctx.response.badRequest({ body: { message: message } })
  }

  public unauthorizedResponse(ctx: HttpContextContract, message) {
    return ctx.response.unauthorized({ body: { message: message } })
  }
  public GenericErrorResponse(ctx: HttpContextContract, error: any) {
    return ctx.response.status(error.status).json(error)
  }
}
