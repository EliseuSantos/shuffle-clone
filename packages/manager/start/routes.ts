/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const HealthController = () => import('#controllers/health_checks_controller')
const DependencyController = () => import('#controllers/dependencies_controller')

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router.get('/health', [HealthController, 'handle'])

// Dependency
router
  .group(() => {
    router.post('scopes', [DependencyController, 'deployScopeDependency'])
    router.post('deploy', [DependencyController, 'deployDependency'])
    router.get('importmap', [DependencyController, 'getImportMap'])
  })
  .prefix('dependency')
