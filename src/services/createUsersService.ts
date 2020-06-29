import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'
import AppError from '../Errors/AppError'

interface Request {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)
    const checkUserExist = await usersRepository.findOne({ where: { email } })
    if (checkUserExist) {
      throw new AppError('This email is already in use, Please sign in.', 401)
    }
    const hashedPassword = await hash(password, 8)
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    await usersRepository.save(user)
    return user
  }
}
