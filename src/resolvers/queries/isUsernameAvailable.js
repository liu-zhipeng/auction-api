import User from '../../models/User'

// TOOD: Maybe this can be optimized?
const isUsernameAvailable = async (_, args) => {
  const result = await User
    .findOne({
      username: args.username
    })
    .lean()
    .exec()

  return !result
}

export default isUsernameAvailable
