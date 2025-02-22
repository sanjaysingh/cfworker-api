import { routesConfig } from './routes/config'
import { errorResponse } from './utils/responseHelper'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const route = routesConfig[url.pathname]
  
  if (route) {
    return route.handler(request)
  }
  
  return errorResponse()
} 