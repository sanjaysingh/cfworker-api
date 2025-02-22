import { jsonResponse } from '../utils/responseHelper'

export function handleUuidRequest() {
  return jsonResponse({
    uuid: crypto.randomUUID()
  })
} 