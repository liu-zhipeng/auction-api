import UserModel from '../../models/User'

const setUserIsCreator = async (_, args) => {
  await UserModel.findByIdAndUpdate(args.id, {
    isCreator: args.isCreator
  })
    .lean()
    .exec()

  return true
}

export default setUserIsCreator
