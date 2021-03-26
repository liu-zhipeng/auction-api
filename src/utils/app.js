import express from 'express'
import cors from 'cors'
import compression from 'compression'
import sslRedirect from 'heroku-ssl-redirect'
import * as config from '../config'
import apolloServer from './apollo-server'
import * as Sentry from '@sentry/node'
import nftMiddleware from '../middleware/nft'

Sentry.init({ dsn: config.SENTRY_DSN })

const app = express()

app.use(sslRedirect())
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.errorHandler())

app.get('/tokenId', nftMiddleware())

if (config.NODE_ENV === 'production') {
  app.use(compression())
}

app.use(cors())

app.use(express.json({
  limit: '2mb'
}))

apolloServer.applyMiddleware({
  app,
  path: '/api/graphql'
})

export default app
