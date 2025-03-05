import { jsonResponse } from '../utils/responseHelper'

export function handleUuidRequest(request) {
  // Get count from query parameters, default to 1, max 50
  const url = new URL(request.url)
  const count = Math.min(Math.max(1, parseInt(url.searchParams.get('count') || '1')), 50)
  
  // Generate array of UUIDs
  const uuids = Array.from({ length: count }, () => {
    const uuid = crypto.randomUUID()
    return {
      uuid_lower: uuid.toLowerCase(),
      uuid_upper: uuid.toUpperCase()
    }
  })
  
  return jsonResponse({
    count,
    uuids
  })
} 