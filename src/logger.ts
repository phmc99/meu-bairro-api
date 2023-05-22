import pino from 'pino'
import config from 'config'
import * as pinoHttp from 'pino-http'

export default pino({
  enabled: config.get('App.logger.enabled'),
  level: config.get('App.logger.level')
})

export const pinoHttpLogger = pinoHttp.default({
  logger: pino()
})
