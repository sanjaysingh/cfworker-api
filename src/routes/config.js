import { handleTimeRequest } from '../handlers/nowHandler'
import { handleIndexRequest } from '../handlers/indexHandler'

export const routesConfig = {
  '/': {
    handler: handleIndexRequest,
    description: 'API Index'
  },
  '/now': {
    handler: handleTimeRequest,
    description: 'Get current time in multiple timezones'
  }
} 