import { jsonResponse } from '../utils/responseHelper'

export async function handleEchoRequest(request) {
  const url = new URL(request.url)
  const headers = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })

  const echo = {
    method: request.method,
    url: request.url,
    path: url.pathname,
    headers,
    cf: request.cf // Cloudflare-specific request data
  }

  // If there's a request body, try to parse it
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      const contentType = request.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        echo.body = await request.json()
      } else {
        echo.body = await request.text()
      }
    } catch (error) {
      echo.body = null
    }
  }

  return jsonResponse(echo)
} 