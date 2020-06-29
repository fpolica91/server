import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import uploadConfig from '../config/upload'
import User from '../models/User'
import AppError from '../Errors/AppError'

interface Request {
  user_id: string
  avatarFilename: string
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(user_id)
    if (!user) {
      throw new AppError('Please login to update your avatar', 401)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      //check if the user exists in the provided filepath
      const userAvatarfileExist = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarfileExist) {
        //if a user alreaady has an avatar delete this is in our tempFolder.
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFilename
    await userRepository.save(user)
    return user
  }
}
