import { serverTiming } from '@elysiajs/server-timing'

export const serverTimingSetup = serverTiming({
  allow: ({ request }) => {
    const { pathname } = new URL(request.url)
    return pathname.startsWith('/api')
  },
})
