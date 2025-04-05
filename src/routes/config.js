import { handleTimeZonesRequest, handleTimeNowRequest } from '../handlers/timeHandler'
import { handleIndexRequest } from '../handlers/indexHandler'
import { handleUuidRequest } from '../handlers/uuidHandler'
import { handleHashRequest } from '../handlers/hashHandler'
import { handleDnsRequest } from '../handlers/dnsHandler'
import { handleLocationRequest } from '../handlers/locationHandler'
import { handleIPInfo } from '../handlers/ipInfoHandler'

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
    description: 'Generate random UUID v4s (default: 1, max: 50) in both lowercase and uppercase formats.',
    example: {
      url: '/uuid?count=3',
      description: 'Generate 3 UUIDs'
    }
  },
  '/hash': {
    handler: handleHashRequest,
    description: 'Generate hash of input text. Supported algorithms: sha1, sha256 (default), sha384, sha512.',
    example: {
      url: '/hash?text=hello&algorithm=sha256',
      description: 'Get SHA-256 hash of "hello"'
    }
  },
  '/dns': {
    handler: handleDnsRequest,
    description: 'DNS lookup for a domain.',
    example: {
      url: '/dns?domain=google.com&type=A',
      description: 'Lookup A records for google.com'
    }
  },
  '/location': {
    handler: handleLocationRequest,
    description: 'Get detailed location information about the caller like country, city, etc.'
  },
  '/ipinfo': {
    handler: handleIPInfo,
    description: 'Get detailed information about an IP address including geolocation and network details.',
    example: {
      url: '/ipinfo?ip=8.8.8.8',
      description: 'Get info for 8.8.8.8'
    }
  }
} 