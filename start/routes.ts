import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const HealthChecksController = () => import('#controllers/health_checks_controller')
const SignInController = () => import('#controllers/sessions/signin_controller')
const SignOutController = () => import('#controllers/sessions/signout_controller')
const MeController = () => import('#controllers/sessions/me_controller')
const CreateUserController = () => import('#controllers/users/create_user_controller')
// const GetUsersController = () => import('#controllers/users/get_users_controller')
const UpdateUserController = () => import('#controllers/users/update_user_controller')
const CreatePostControler = () => import('#controllers/posts/create_post_controller')
const GetPostsController = () => import('#controllers/posts/get_posts_controller')
const CreatePostCommentController = () =>
  import('#controllers/comments/create_post_comment_controller')
const CreatePostScriptController = () =>
  import('#controllers/post_scripts/create_post_script_controller')

router.get('/', async () => {
  return { server: 'TheMainFunction Server API', version: env.get('VERSION') }
})
router.get('/health', [HealthChecksController])
// AUTH
router.post('/auth/signin', [SignInController])
router.post('/auth/signout', [SignOutController]).use(middleware.auth())
router.get('/auth/me', [MeController])
// USERS
router.post('/users', [CreateUserController])
// router.get('/users', [GetUsersController]).use(middleware.auth())
router.put('/users/:id', [UpdateUserController]).use(middleware.auth())
// POSTS
router.post('/posts', [CreatePostControler]).use(middleware.auth())
router.get('/posts', [GetPostsController]).use(middleware.auth())
// COMMENTS
router.post('/posts/:postId/comments', [CreatePostCommentController]).use(middleware.auth())
// POST SCRIPTS
router.post('/posts/:postId/scripts', [CreatePostScriptController]).use(middleware.auth())
