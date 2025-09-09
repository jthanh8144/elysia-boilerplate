import type { DeepPartial, ObjectLiteral, Repository } from 'typeorm'

export abstract class Service {
  static async save<T extends ObjectLiteral>(
    repository: Repository<T>,
    data: DeepPartial<T>,
  ) {
    return await repository.save(repository.create(data))
  }
}
