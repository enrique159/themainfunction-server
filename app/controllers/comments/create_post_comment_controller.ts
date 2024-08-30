import { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { createPostCommentValidator } from '#validators/comments_validators'

export default class CreatePostCommentController {
  async handle(ctx: HttpContext) {
    try {
      const user = await ctx.auth.use('web').authenticate()
      const payload = await ctx.request.validateUsing(createPostCommentValidator)
      const postId = ctx.request.params().postId

      let postComment = new Comment().fill({ ...payload, userId: user.id, postId })
      postComment = await postComment.save()

      await postComment.load('user', (userQuery) => {
        userQuery.select('id', 'username', 'fullName', 'profileAvatar')
      })
      return ctx.response.created({ data: postComment })
    } catch (error) {
      return ctx.response.badRequest({ message: 'Error creating post comment', error })
    }
  }
}
