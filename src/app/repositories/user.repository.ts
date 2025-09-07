import { Repository } from 'typeorm'

import dataSource from '../../shared/configs/data-source.config'
import { User } from '../entities/user.entity'

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, dataSource.manager)
  }

  public async checkEmailExists(email: string) {
    const count = await this.count({ where: { email } })
    return count > 0
  }

  public async registerUser(email: string, password: string) {
    return await this.save(this.create({ email, password }))
  }
}
