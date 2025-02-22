import { handleTimeRequest } from '../handlers/nowHandler'
import { handleIndexRequest } from '../handlers/indexHandler'
import { handleUuidRequest } from '../handlers/uuidHandler'
import { handleIpRequest } from '../handlers/ipHandler'
import { handleHealthRequest } from '../handlers/healthHandler'
import { handleHashRequest } from '../handlers/hashHandler'
import { handleDnsRequest } from '../handlers/dnsHandler'

export const routesConfig = {
  '/': {
    handler: handleIndexRequest,
    description: 'API Index'
  },
  '/now': {
    handler: handleTimeRequest,
    description: 'Get current time in multiple timezones'
  },
  '/uuid': {
    handler: handleUuidRequest,
    description: 'Generate a random UUID v4'
  },
  '/ip': {
    handler: handleIpRequest,
    description: 'Get IP address and request information'
  },
  '/health': {
    handler: handleHealthRequest,
    description: 'API health check status'
  },
  '/hash': {
    handler: handleHashRequest,
    description: 'Generate hash (MD5, SHA-1, SHA-256) of input text. Usage: /hash?text=hello&algorithm=sha256'
  },
  '/dns': {
    handler: handleDnsRequest,
    description: 'DNS lookup for a domain. Usage: /dns?domain=example.com&type=A'
  }
} 