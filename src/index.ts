import staticPlugin from '@elysiajs/static'
import { Elysia } from 'elysia'

import { authController } from './app/controllers/auth.controller'
import { staticDataController } from './app/controllers/static-data.controller'
import { todoController } from './app/controllers/todo.controller'
import { userController } from './app/controllers/user.controller'
import {
  apiDocSetup,
  errorHandlerSetup,
  securitySetup,
  serverTimingSetup,
} from './app/setups'
import dataSource from './shared/configs/data-source.config'
import { environment } from './shared/constants'

const { isInitialized } = await dataSource.initialize()
// eslint-disable-next-line no-console
console.log('Database initialize status:', isInitialized)

const app = new Elysia()
  .use(securitySetup)
  .use(staticPlugin({ prefix: '/' }))
  .use(errorHandlerSetup)
  .use(staticDataController)
  .use(apiDocSetup)
  .get('/', ({ redirect }) => {
    return redirect('/docs')
  })
  .use(serverTimingSetup)
  .group('/api', (app) =>
    app.use(authController).use(userController).use(todoController),
  )
  .listen(environment.port)

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
