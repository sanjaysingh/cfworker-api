import { handleTimeZonesRequest, handleTimeNowRequest } from '../handlers/timeHandler'
import { handleIndexRequest } from '../handlers/indexHandler'
import { handleUuidRequest } from '../handlers/uuidHandler'
import { handleHashRequest } from '../handlers/hashHandler'
import { handleDnsRequest } from '../handlers/dnsHandler'
import { handleLocationRequest } from '../handlers/locationHandler'

export const routesConfig = {
  '/': {
    handler: handleIndexRequest,
    description: 'API Index page'
  },
  '/time/zones': {
    handler: handleTimeZonesRequest,
    description: 'Get list of all available IANA time zones'
  },
  '/time/now': {
    handler: handleTimeNowRequest,
    description: 'Get current time in multiple formats.'
  },
  '/uuid': {
    handler: handleUuidRequest,
    description: 'Generate random UUID v4s (default: 1, max: 50) in both lowercase and uppercase formats. Example: <a href="/uuid?count=3">Generate 3 UUIDs</a>'
  },
  '/hash': {
    handler: handleHashRequest,
    description: 'Generate hash of input text. Example: <a href="/hash?text=hello&algorithm=sha256">Get SHA-256 hash of "hello"</a>'
  },
  '/dns': {
    handler: handleDnsRequest,
    description: 'DNS lookup for a domain. Example: <a href="/dns?domain=google.com&type=A">Lookup A records for google.com</a>'
  },
  '/location': {
    handler: handleLocationRequest,
    description: 'Get detailed location information about the caller like country, city, etc.'
  }
} 