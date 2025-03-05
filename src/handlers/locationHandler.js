import { jsonResponse } from '../utils/responseHelper'

export function handleLocationRequest(request) {
  // Get geolocation data from Cloudflare headers
  const cf = request.cf || {}
  
  const locationData = {
    ip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for'),
    country: cf.country || 'Unknown',
    countryCode: cf.countryCode || 'Unknown',
    city: cf.city || 'Unknown',
    region: cf.region || 'Unknown',
    regionCode: cf.regionCode || 'Unknown',
    latitude: cf.latitude || null,
    longitude: cf.longitude || null,
    timezone: cf.timezone || 'Unknown',
    continent: cf.continent || 'Unknown',
    continentCode: cf.continentCode || 'Unknown',
    postalCode: cf.postalCode || 'Unknown',
    asn: cf.asn || 'Unknown',
    asnOrganization: cf.asnOrganization || 'Unknown',
    isProxy: cf.isProxy || false,
    isVpn: cf.isVpn || false,
    isTor: cf.isTor || false,
    isBot: cf.isBot || false,
    isMobile: cf.isMobile || false,
    isDesktop: cf.isDesktop || false,
    isTablet: cf.isTablet || false,
    browser: cf.browser || 'Unknown',
    browserVersion: cf.browserVersion || 'Unknown',
    deviceType: cf.deviceType || 'Unknown',
    os: cf.os || 'Unknown',
    osVersion: cf.osVersion || 'Unknown'
  }

  return jsonResponse(locationData)
} 