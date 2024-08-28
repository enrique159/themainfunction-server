import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { updateUserValidator } from '#validators/users_validators'

export default class UpdateUserController {
  async handle(ctx: HttpContext) {
    try {
      const { id } = ctx.params
      const payload = await ctx.request.validateUsing(updateUserValidator)

      const user = await User.findOrFail(id)
      user.merge(payload)
      await user.save()

      return ctx.response.ok({ data: user })
    } catch (error) {
      return ctx.response.status(error?.status || 500).send({ errors: [error] })
    }
  }
}
