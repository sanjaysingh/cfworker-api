import { jsonResponse } from '../utils/responseHelper'

export async function handleTimeRequest() {
  const now = new Date()
  
  const timeFormats = {
    est: formatTimeForZone(now, 'America/New_York'),
    pst: formatTimeForZone(now, 'America/Los_Angeles'),
    mst: formatTimeForZone(now, 'America/Denver'),
    ist: formatTimeForZone(now, 'Asia/Kolkata'),
    utc: now.toISOString()
  }
  
  return jsonResponse(timeFormats)
}

function formatTimeForZone(date, timezone) {
  return date.toLocaleString('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2T')
} 