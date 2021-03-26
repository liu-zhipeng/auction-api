import * as Sentry from '@sentry/node'
import { ApolloError } from 'apollo-server-express'

// This code is adapted from https://blog.sentry.io/2020/07/22/handling-graphql-errors-using-sentry
const sentryPlugin = {
  requestDidStart: () => ({
    didEncounterErrors (ctx) {
      if (!ctx.operation) {
        return
      }

      ctx.errors
        .filter((err) => !(err instanceof ApolloError))
        .forEach((err) => {
          Sentry.withScope((scope) => {
            // mutation, query, subscription
            scope.setTag('kind', ctx.operation.operation)
            scope.setExtra('query', ctx.request.query)

            if (err.path) {
              scope.addBreadcrumb({
                category: 'query-path',
                message: err.path.join(' > '),
                level: Sentry.Severity.Debug
              })
            }

            Sentry.captureException(err)
          })
        })
    }
  })
}

export default sentryPlugin
