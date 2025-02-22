import { jsonResponse } from '../utils/responseHelper'

export function handleHealthRequest() {
  return jsonResponse({
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
} 