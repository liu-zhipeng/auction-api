import { ApolloServer } from 'apollo-server-express'
import { InMemoryLRUCache } from 'apollo-server-caching'
import { typeDefs } from '../schema'
import resolvers from '../resolvers'
import context from '../context'
import * as config from '../config'
import { get } from 'lodash'
import { GraphQLError } from 'graphql'
import sentryPlugin from './sentry'
import AuthDirective from '../directives/auth'

const formatError = error => {
  if (config.DEBUG) {
    return error
  }

  const responseStatus = get(error, 'originalError.extensions.response.status')

  if (!responseStatus || responseStatus < 400 || responseStatus >= 500) {
    return new GraphQLError('An Unexpected Error Has Occurred')
  }

  const response = error.extensions.response && {
    ...error.extensions.response,
    url: undefined
  }

  // Create a new error object with only information we don't mind revealing
  return new GraphQLError(
    error.message,
    error.nodes,
    null,
    null,
    error.path,
    null,
    { response }
  )
}

const apolloServer = new ApolloServer({
  playground: config.HAS_PLAYGROUND,
  typeDefs,
  resolvers,
  context,
  debug: config.DEBUG,
  tracing: config.TRACING,
  introspection: config.HAS_PLAYGROUND,
  schemaDirectives: {
    auth: AuthDirective
  },
  uploads: false,
  cache: new InMemoryLRUCache({
    maxSize: config.CACHE_IN_MEMORY_MAX_SIZE
  }),
  formatError,
  plugins: [
    sentryPlugin
  ]
})

export default apolloServer
