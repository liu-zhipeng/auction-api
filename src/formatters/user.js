import { getIsUserAdmin } from '../utils/user'

export const formatUser = (user, context) => {
  const {
    _id,
    publicAddress,
    nonce,
    email,
    username,
    image,
    isCreator,
    isAdmin,
    name,
    bio,
    links
  } = user

  const output = {
    id: _id.toString(),
    publicAddress,
    nonce,
    email,
    username,
    image,
    isCreator,
    isAdmin,
    name,
    bio,
    links
  }

  const isUserAdmin = getIsUserAdmin(context?.user)
  const isSelf = _id.toString() === context?.user?._id?.toString()
  const shouldStrip = !isUserAdmin || !isSelf

  if (shouldStrip) {
    delete user.nonce
    delete user.isAdmin
  }

  return output
}

export default formatUser
