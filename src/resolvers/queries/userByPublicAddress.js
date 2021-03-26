import User from '../../models/User'
import formatUser from '../../formatters/user'

const userByPublicAddress = async (_, args) => {
  const user = await User
    .findOne({
      publicAddress: args.publicAddress
    })
    .lean()
    .exec()

  if (!user) {
    return null
  }

  return formatUser(user)
}

export default userByPublicAddress
