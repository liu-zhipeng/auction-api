import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    const { isAdmin } = this.args

    field.resolve = async function (...args) {
      const context = args[2]

      if (!context || !context.user) {
        throw new AuthenticationError('Not allowed')
      }

      if (isAdmin && isAdmin === true) {
        if (!context.user.isAdmin) {
          throw new AuthenticationError('Not allowed')
        }
      }

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
