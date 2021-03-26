/**
 * Here's some inspiration:
 *
 * - https://github.com/apollographql/fullstack-tutorial
 * - https://github.com/amaurym/login-with-metamask-demo
 * - https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
 */

import { connectMongoose } from './utils/mongoose'
import { startServer } from './utils/server'
import { startSync } from './utils/eth-sync'
import logger from './utils/logger'
import { NAME, NODE_ENV, PORT, VERSION } from './config'

const main = async () => {
  await connectMongoose()
  logger.info('Connected to MongoDB')
  await startServer()
  logger.info(`${NAME} v${VERSION} (${NODE_ENV}) is running, listening on port: ${PORT}`)
  await startSync()
  logger.info('Started syncing')
}

main()
