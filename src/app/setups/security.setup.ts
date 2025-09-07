import { cors } from '@elysiajs/cors'
import { type Elysia } from 'elysia'
import { compression } from 'elysia-compression'
import { helmet } from 'elysia-helmet'
import { ip } from 'elysia-ip'
import { rateLimit } from 'elysia-rate-limit'

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
    .use(compression())
