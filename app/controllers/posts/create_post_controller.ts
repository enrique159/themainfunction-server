import { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/posts_validators'

export default class CreatePostController {
  async handle(ctx: HttpContext) {
    try {
      const user = await ctx.auth.use('web').authenticate()
      const payload = await ctx.request.validateUsing(createPostValidator)

      let post = new Post().fill({ ...payload, userId: user.id })
      post = await post.save()

      await post.load('user', (userQuery) => {
        userQuery.select('id', 'username', 'fullName', 'profileAvatar', 'position', 'company')
      })

      return ctx.response.created({ data: post })
    } catch (error) {
      return ctx.response.badRequest({ message: 'Error creating post', error })
    }
  }
}
