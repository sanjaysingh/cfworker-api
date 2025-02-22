import { jsonResponse, errorResponse } from '../utils/responseHelper'

export async function handleHashRequest(request) {
  const url = new URL(request.url)
  const text = url.searchParams.get('text')
  const algorithm = url.searchParams.get('algorithm')?.toLowerCase() || 'sha256'
  
  if (!text) {
    return errorResponse('Missing required parameter: text', 400)
  }
  
  const validAlgorithms = ['md5', 'sha1', 'sha256']
  if (!validAlgorithms.includes(algorithm)) {
    return errorResponse(`Invalid algorithm. Must be one of: ${validAlgorithms.join(', ')}`, 400)
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm.replace('md5', 'md-5'), data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return jsonResponse({
    input: text,
    algorithm,
    hash: hashHex
  })
} 