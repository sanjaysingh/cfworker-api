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
  try {
    const now = new Date()
    const timeZones = Intl.supportedValuesOf('timeZone')
    const timeFormats = {}

    // Add all time zones
    timeZones.forEach(zone => {
      const offset = getTimezoneOffset(now, zone)
      timeFormats[zone] = formatTimeForZone(now, zone, offset)
    })

    // Add UTC time
    timeFormats.UTC = now.toISOString().replace(/\.\d{3}Z$/, 'Z')

    return jsonResponse(timeFormats)
  } catch (error) {
    return jsonResponse({
      error: 'Failed to process time request',
      message: error.message
    }, 500)
  }
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

function getTimezoneOffset(date, timeZone) {
  // Get the timezone offset in minutes
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }))
  const offset = (utcDate - tzDate) / 60000

  // Convert offset to "±HH:mm" format
  const hours = Math.floor(Math.abs(offset) / 60)
  const minutes = Math.abs(offset) % 60
  const sign = offset <= 0 ? '+' : '-'

  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
} 