import { cors } from '@elysiajs/cors'
import { type Elysia } from 'elysia'
import { helmet } from 'elysia-helmet'
import { ip } from 'elysia-ip'
import { rateLimit } from 'elysia-rate-limit'

import { compressionPlugin } from '../middlewares/compression.middleware'

export const securitySetup = (app: Elysia) =>
  app
    .use(cors())
    .use(
      helmet({
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'script-src': ["'self'", 'https://cdn.jsdelivr.net/'],
          },
        },
      }),
    )
    .use(ip())
    .use(rateLimit())
    .use(compressionPlugin())
