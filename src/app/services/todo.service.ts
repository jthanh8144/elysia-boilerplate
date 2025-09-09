import { todoRepository } from '../repositories'
import { Service } from './common.service'

export class TodoService extends Service {
  static async delete(id: number) {
    await todoRepository.delete(id)
    return { message: 'Deleted' }
  }
}
