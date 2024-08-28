import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SignInController {
  async handle({ auth, request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return { data: user }
  }
}
