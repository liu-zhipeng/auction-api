import { createLogger, transports, format } from 'winston'
import { LOG_LEVEL, NODE_ENV } from '../config'

const baseFormatter = NODE_ENV === 'development' ? format.simple : format.json

const logger = createLogger({
  transports: [
    new transports.Console({
      level: LOG_LEVEL,
      format: format.combine(
        format.timestamp(),
        baseFormatter()
      )
    })
  ]
})

export default logger
