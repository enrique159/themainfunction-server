import { HttpContext } from '@adonisjs/core/http'
import PostScript from '#models/post_script'
import { createPostScriptValidator } from '#validators/post_scripts_validators'

export default class CreatePostScriptController {
  async handle(ctx: HttpContext) {
    try {
      const user = await ctx.auth.use('web').authenticate()
      const payload = await ctx.request.validateUsing(createPostScriptValidator)
      const postId = ctx.request.params().postId

      let postScript = new PostScript().fill({ ...payload, userId: user.id, postId })
      postScript = await postScript.save()

      return ctx.response.created({ data: postScript })
    } catch (error) {
      return ctx.response.badRequest({ message: 'Error creating post', error })
    }
  }
}
