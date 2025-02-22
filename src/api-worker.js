import { handleTimeRequest } from './handlers/timeHandler'
import { errorResponse } from './utils/responseHelper'

const routes = {
  '/time': handleTimeRequest
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const handler = routes[url.pathname]
  
  if (handler) {
    return handler(request)
  }
  
  return errorResponse()
} 