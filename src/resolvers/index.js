import userByPublicAddress from './queries/userByPublicAddress'
import userByUsername from './queries/userByUsername'
import session from './queries/session'
import isUsernameAvailable from './queries/isUsernameAvailable'
import tokenMetadata from './queries/tokenMetadata'

import userCreate from './mutations/userCreate'
import auth from './mutations/auth'
import userUpdateById from './mutations/userUpdateById'
import signFileUpload from './mutations/signFileUpload'
import setUserIsCreator from './mutations/setUserIsCreator'
import tokenMetadataCreate from './mutations/tokenMetadataCreate'

const resolvers = {
  Query: {
    userByPublicAddress,
    userByUsername,
    session,
    isUsernameAvailable,
    tokenMetadata
  },
  Mutation: {
    userCreate,
    userUpdateById,
    auth,
    signFileUpload,
    setUserIsCreator,
    tokenMetadataCreate
  }
}

export default resolvers
