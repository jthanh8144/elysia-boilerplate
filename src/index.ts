/* eslint-disable no-console */
import staticPlugin from '@elysiajs/static'
import { Elysia } from 'elysia'

import { authController } from './app/controllers/auth.controller'
import { staticDataController } from './app/controllers/static-data.controller'
import { todoController } from './app/controllers/todo.controller'
import { userController } from './app/controllers/user.controller'
import { apiDocSetup } from './app/setups/api-doc.setup'
import { hookSetup } from './app/setups/hook.setup'
import { securitySetup } from './app/setups/security.setup'
import dataSource from './shared/configs/data-source.config'
import { environment } from './shared/constants'

try {
  const { isInitialized } = await dataSource.initialize()
  console.log('Database initialize status:', isInitialized)

  const app = new Elysia()
    .use(securitySetup)
    .use(staticPlugin({ prefix: '/' }))
    .use(apiDocSetup)
    .use(hookSetup)
    .get('/', ({ set }) => {
      set.redirect = '/docs'
    })
    .group('/api', (app) =>
      app.use(authController).use(userController).use(todoController),
    )
    .use(staticDataController)
    .listen(environment.port)

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  )
} catch (e) {
  console.log(e)
}
