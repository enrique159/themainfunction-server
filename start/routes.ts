import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const HealthChecksController = () => import('#controllers/health_checks_controller')
const SignInController = () => import('#controllers/sessions/signin_controller')
const SignOutController = () => import('#controllers/sessions/signout_controller')
const CreateUserController = () => import('#controllers/users/create_user_controller')
const GetUsersController = () => import('#controllers/users/get_users_controller')
const UpdateUserController = () => import('#controllers/users/update_user_controller')

router.get('/', async () => {
  return { server: 'TheMainFunction Server API', version: env.get('VERSION') }
})
router.get('/health', [HealthChecksController])
// AUTH
router.post('/auth/signin', [SignInController])
router.post('/auth/signout', [SignOutController]).use(middleware.auth())
// USERS
router.post('/users', [CreateUserController])
router.get('/users', [GetUsersController]).use(middleware.auth())
router.put('/users/:id', [UpdateUserController]).use(middleware.auth())
