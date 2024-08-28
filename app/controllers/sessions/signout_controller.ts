import { HttpContext } from '@adonisjs/core/http'

export default class SignOutController {
  async handle({ auth }: HttpContext) {
    await auth.use('web').logout()
    return { data: 'Logged out' }
  }
}
