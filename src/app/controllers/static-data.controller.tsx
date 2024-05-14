import { html } from '@elysiajs/html'
import { Elysia } from 'elysia'

export const staticDataController = new Elysia({ prefix: '/static' })
  .use(html()) // prerequisite to return HTML or JSX
  .get('/html', () => {
    return `<html lang="en">
        <head>
          <title>Elysia HTML Page</title>
        </head>
        <body>
          <h1 style="color: red;">Hello World!</h1>
        </body>
      </html>`
  })
  .get('/jsx', async () => {
    return await (
      <html lang="en">
        <head>
          <title>Elysia JSX Page</title>
        </head>
        <body>
          <h1 style="color: blue;">Hello World!</h1>
        </body>
      </html>
    )
  })
