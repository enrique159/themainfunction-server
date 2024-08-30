import { HttpContext } from '@adonisjs/core/http'

export default class MeController {
  async handle({ auth }: HttpContext) {
    const user = await auth.use('web').authenticate()
    return { data: user }
  }
}
