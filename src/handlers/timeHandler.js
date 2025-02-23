import { jsonResponse } from '../utils/responseHelper'

// Get list of all IANA time zones
export function handleTimeZonesRequest() {
  try {
    // Get the full list of time zones using Intl.supportedValuesOf
    const timeZones = Intl.supportedValuesOf('timeZone')
    
    return jsonResponse({
      count: timeZones.length,
      zones: timeZones
    })
  } catch (error) {
    return jsonResponse({
      error: 'Failed to retrieve time zones',
      message: error.message
    }, 500)
  }
}

// Get current time in multiple formats
export function handleTimeNowRequest() {
  const now = new Date()
  
  const timeFormats = {
    est: formatTimeForZone(now, 'America/New_York', '-05:00'),
    pst: formatTimeForZone(now, 'America/Los_Angeles', '-08:00'),
    mst: formatTimeForZone(now, 'America/Denver', '-07:00'),
    ist: formatTimeForZone(now, 'Asia/Kolkata', '+05:30'),
    utc: now.toISOString().replace(/\.\d{3}Z$/, 'Z')  // Remove milliseconds
  }
  
  return jsonResponse(timeFormats)
}

function formatTimeForZone(date, timezone, offset) {
  const formatted = date.toLocaleString('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  
  // Convert "MM/DD/YYYY, HH:mm:ss" to "YYYY-MM-DDTHh:mm:ss GMT±XX:XX"
  const [datePart, timePart] = formatted.split(', ')
  const [month, day, year] = datePart.split('/')
  
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart} GMT${offset}`
} 