import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RateLimiterService from 'App/Services/RateLimiterService.service'

export default class RateLimiterMiddleware {
  private rateLimiterService: RateLimiterService

  constructor() {
    this.rateLimiterService = new RateLimiterService()
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    try {
      await this.rateLimiterService.handleLoginRateLimit(ctx)
      await next()
    } catch (error) {
      return ctx.response.status(429).json({
        message: error.message,
      })
    }
  }
}
