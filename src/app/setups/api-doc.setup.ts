import { openapi } from '@elysiajs/openapi'

export const apiDocSetup = openapi({
  path: '/docs',
  documentation: {
    info: {
      title: 'Elysia Boilerplate',
      version: '1.0.0',
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'User', description: 'User endpoints' },
      { name: 'Todo', description: 'To do endpoints' },
    ],
  },
})
