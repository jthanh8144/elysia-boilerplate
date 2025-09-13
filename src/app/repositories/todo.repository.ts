import { Repository } from 'typeorm'

import dataSource from '@/configs/data-source.config'

import { Todo } from '../entities/todo.entity'

export class TodoRepository extends Repository<Todo> {
  constructor() {
    super(Todo, dataSource.manager)
  }
}
