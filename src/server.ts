import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'
import { logger, errorLogger } from './shared/logger/logger'
async function main() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect db ', error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled rejection is detected, we are closing our server')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()
