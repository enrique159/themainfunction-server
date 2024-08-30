import { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'

export default class GetPostsController {
  async handle({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const posts = await Post.query()
      .preload('user', (userQuery) => {
        userQuery.select('id', 'username', 'fullName', 'profileAvatar', 'position', 'company')
      })
      .preload('comments', (commentQuery) => {
        commentQuery.select('id', 'content', 'createdAt', 'userId').preload('user', (userQuery) => {
          userQuery.select('id', 'username', 'fullName', 'profileAvatar')
        })
      })
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)
    return posts
  }
}
