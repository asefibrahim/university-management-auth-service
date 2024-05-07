import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const id = await generateUserId()
    const newUser = {
      ...user,
      id,
      password: user.password || (config.default_user_pass as string),
    }

    const createdUser = await User.create(newUser)

    if (!createdUser) {
      throw new Error('Failed resolving the issue  to create user')
    }

    return createdUser
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

export default {
  createUser,
}
