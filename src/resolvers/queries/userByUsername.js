import User from '../../models/User'
import formatUser from '../../formatters/user'

const userByUsername = async (_, args, context) => {
  const result = await User
    .findOne({
      username: args.username
    })
    .lean()
    .exec()

  if (!result) {
    return null
  }

  return formatUser(result, context)
}

export default userByUsername
