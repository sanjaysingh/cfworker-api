import { jsonResponse, errorResponse } from '../utils/responseHelper'

export async function handleHashRequest(request) {
  const url = new URL(request.url)
  const text = url.searchParams.get('text')
  const algorithm = url.searchParams.get('algorithm')?.toLowerCase() || 'sha256'
  
  if (!text) {
    return errorResponse('Missing required parameter: text', 400)
  }
  
  // Map of supported algorithms to their Web Crypto API names
  const algorithmMap = {
    'sha1': 'SHA-1',
    'sha256': 'SHA-256',
    'sha384': 'SHA-384',
    'sha512': 'SHA-512'
  }
  
  if (!algorithmMap[algorithm]) {
    return errorResponse(`Invalid algorithm. Must be one of: ${Object.keys(algorithmMap).join(', ')}`, 400)
  }

  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest(algorithmMap[algorithm], data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return jsonResponse({
      input: text,
      algorithm,
      hash: hashHex
    })
  } catch (error) {
    return errorResponse('Hash generation failed', 500)
  }
} 