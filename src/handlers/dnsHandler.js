import { jsonResponse, errorResponse } from '../utils/responseHelper'

export async function handleDnsRequest(request) {
  const url = new URL(request.url)
  const domain = url.searchParams.get('domain')
  const type = (url.searchParams.get('type') || 'A').toUpperCase()
  
  if (!domain) {
    return errorResponse('Missing required parameter: domain', 400)
  }
  
  const validTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT']
  if (!validTypes.includes(type)) {
    return errorResponse(`Invalid record type. Must be one of: ${validTypes.join(', ')}`, 400)
  }

  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`, {
      headers: {
        'Accept': 'application/dns-json'
      }
    })
    
    const data = await response.json()
    
    return jsonResponse({
      domain,
      type,
      records: data.Answer || []
    })
  } catch (error) {
    return errorResponse('DNS lookup failed', 500)
  }
} 