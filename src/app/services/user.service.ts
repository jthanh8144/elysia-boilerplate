import { profileRepository, todoRepository } from '../repositories'

export class UserService {
  static async getUserProfile(userId: number) {
    return await profileRepository.findOne({
      where: { userId },
    })
  }

  static async getUserTodos(userId: number) {
    return await todoRepository.find({
      where: { userId },
    })
  }
}
