import { cors } from '@elysiajs/cors'
import { type Elysia } from 'elysia'
import { helmet } from 'elysia-helmet'

export const securitySetup = (app: Elysia) =>
  app.use(cors()).use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", 'https://cdn.jsdelivr.net/'],
        },
      },
    }),
  )
