import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class GetUsersController {
  async handle(ctx: HttpContext) {
    const users = await User.all()
    return ctx.response.ok({ data: users })
  }
}
