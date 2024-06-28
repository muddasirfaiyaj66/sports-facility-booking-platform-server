import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (payload: TUser) => {
  const userData = await User.create(payload)
  const preciseData = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    phone: userData.phone,
    address: userData.address,
  }
  return preciseData
}

export const UserServices = {
  createUserIntoDB,
}
