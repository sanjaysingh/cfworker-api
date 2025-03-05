import { jsonResponse } from '../utils/responseHelper'

export function handleUuidRequest() {
  const uuid = crypto.randomUUID()
  
  return jsonResponse({
    uuid_lower: uuid.toLowerCase(),
    uuid_upper: uuid.toUpperCase()
  })
} 