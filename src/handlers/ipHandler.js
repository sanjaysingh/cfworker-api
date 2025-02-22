import { jsonResponse } from '../utils/responseHelper'

export function handleIpRequest(request) {
  const ip = request.headers.get('cf-connecting-ip') || 
             request.headers.get('x-real-ip') ||
             'unknown'
  
  return jsonResponse({
    ip,
    headers: {
      userAgent: request.headers.get('user-agent'),
      country: request.headers.get('cf-ipcountry')
    }
  })
} 