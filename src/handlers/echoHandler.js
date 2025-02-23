import { jsonResponse } from '../utils/responseHelper'

export function handleEchoRequest(request) {
  const url = new URL(request.url)
  const headers = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })

  // Filter out specific CF fields we don't want
  const { tlsClientAuth, tlsExportedAuthenticator, ...cfData } = request.cf || {}

  const echo = {
    method: request.method,
    url: request.url,
    path: url.pathname,
    headers,
    cf: cfData
  }

  return jsonResponse(echo)
} 