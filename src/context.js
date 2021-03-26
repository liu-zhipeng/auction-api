import UserModel from './models/User'
import { getDecodedToken } from './utils/jwt'
import { AuthenticationError } from 'apollo-server-express'

const TOKEN_HEADER_NAME = 'x-token'

const getTokenFromHeaders = req => {
  const headers = req?.headers
  return headers?.[TOKEN_HEADER_NAME]
}

// TODO: convert cookie
const context = async ({ req }) => {
  const tokenFromHeaders = getTokenFromHeaders(req)
  const context = {}

  if (tokenFromHeaders) {
    const decodedToken = await getDecodedToken(tokenFromHeaders)
    const userId = decodedToken?.userId
    const publicAddress = decodedToken?.publicAddress

    if (!userId || !publicAddress) {
      throw new AuthenticationError('Invalid token')
    }

    const user = await UserModel
      .findById(userId)
      .lean()
      .exec()

    if (!user || user.publicAddress !== publicAddress) {
      throw new AuthenticationError('Invalid token')
    }

    context.user = user
  }

  return context
}

export default context
