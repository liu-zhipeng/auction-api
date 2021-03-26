import UserModel from '../../models/User'
import formatUser from '../../formatters/user'
import { ADMIN_WHITELIST } from '../../config'

const getIsAdmin = publicAddress => {
  return ADMIN_WHITELIST.includes(publicAddress)
}

const userCreate = async (_, args) => {
  const { publicAddress } = args.input

  const isAdmin = getIsAdmin(publicAddress)

  const newUser = await UserModel
    .create({
      publicAddress,
      username: publicAddress,
      isAdmin
    })

  return formatUser(newUser)
}

export default userCreate
