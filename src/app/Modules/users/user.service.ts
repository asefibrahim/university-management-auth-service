import config from '../../../config'
import ApiError from '../../../error/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  const newUser = {
    ...user,
    id,
    password: user.password || (config.default_user_pass as string),
  }

  const createdUser = await User.create(newUser)

  if (!createdUser) {
    throw new ApiError(400, 'Failed resolving the issue  to create user')
  }

  return createdUser
}

export const UserService = {
  createUser,
}
