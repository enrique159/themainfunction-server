import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/users_validators'

export default class CreateUserController {
  async handle(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(createUserValidator)

      let user = new User().fill(payload)
      user = await user.save()

      return ctx.response.created({ data: user })
    } catch (error) {
      return ctx.response.badRequest({ message: 'Error creating user', error })
    }
  }
}
