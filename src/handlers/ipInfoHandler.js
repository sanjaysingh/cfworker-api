/**
 * IP Information Handler
 * Provides detailed information about an IP address using ip-api.com service
 */

const IP_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function isValidIP(ip) {
  return IP_REGEX.test(ip);
}

async function getIPInfo(ip) {
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
  const data = await response.json();
  
  if (data.status === 'fail') {
    throw new Error(data.message || 'Failed to fetch IP information');
  }

  return {
    ip: data.query,
    continent: data.continent,
    country: data.country,
    countryCode: data.countryCode,
    region: data.region,
    regionName: data.regionName,
    city: data.city,
    postalCode: data.zip,
    latitude: data.lat,
    longitude: data.lon,
    timezone: data.timezone,
    isp: data.isp,
    organization: data.org,
    asn: data.as
  };
}

async function handleIPInfo(request, env) {
  try {
    const url = new URL(request.url);
    const ip = url.searchParams.get('ip');

    if (!ip) {
      return new Response(JSON.stringify({
        error: 'IP address parameter is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate IP format
    if (!isValidIP(ip)) {
      return new Response(JSON.stringify({
        error: 'Invalid IP address format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const ipInfo = await getIPInfo(ip);

    // Clean up undefined values
    Object.keys(ipInfo).forEach(key => {
      if (ipInfo[key] === undefined) {
        delete ipInfo[key];
      }
    });

    return new Response(JSON.stringify(ipInfo, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch IP information',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export { handleIPInfo }; 