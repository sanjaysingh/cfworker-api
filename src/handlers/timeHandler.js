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
    const timeFormats = {
      // UTC first
      UTC: now.toISOString().replace(/\.\d{3}Z$/, 'Z'),

      // Americas
      'America/New_York': formatTimeForZone(now, 'America/New_York', '-04:00'),      // Eastern US
      'America/Los_Angeles': formatTimeForZone(now, 'America/Los_Angeles', '-07:00'), // Western US
      'America/Chicago': formatTimeForZone(now, 'America/Chicago', '-05:00'),         // Central US
      'America/Sao_Paulo': formatTimeForZone(now, 'America/Sao_Paulo', '-03:00'),     // Brazil

      // Europe & Africa
      'Europe/London': formatTimeForZone(now, 'Europe/London', '+01:00'),            // UK
      'Europe/Paris': formatTimeForZone(now, 'Europe/Paris', '+02:00'),              // Central Europe
      'Europe/Moscow': formatTimeForZone(now, 'Europe/Moscow', '+03:00'),            // Russia
      'Africa/Cairo': formatTimeForZone(now, 'Africa/Cairo', '+02:00'),              // Egypt

      // Asia & Oceania
      'Asia/Dubai': formatTimeForZone(now, 'Asia/Dubai', '+04:00'),                  // UAE
      'Asia/Kolkata': formatTimeForZone(now, 'Asia/Kolkata', '+05:30'),             // India
      'Asia/Singapore': formatTimeForZone(now, 'Asia/Singapore', '+08:00'),          // Singapore
      'Asia/Tokyo': formatTimeForZone(now, 'Asia/Tokyo', '+09:00'),                 // Japan
      'Australia/Sydney': formatTimeForZone(now, 'Australia/Sydney', '+10:00')       // Australia
    }

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