import path from 'node:path'

import { DataSource } from 'typeorm'

import { environment } from '@/constants/index'
import customNamingStrategy from '@/database/naming-strategies/custom-naming-strategy'

const dataSource = new DataSource({
  type: 'postgres',
  replication: {
    master: {
      database: environment.database.name,
      username: environment.database.username,
      password: environment.database.password,
      port: +(environment.database.port ?? 0),
      host: environment.database.host,
    },
    slaves: [
      {
        database: environment.database.name,
        username: environment.database.username,
        password: environment.database.password,
        port: +(environment.database.port ?? 0),
        host: environment.database.host,
      },
    ],
  },
  entities: [
    path.join(__dirname, '..', '..', 'app/entities/*.entity{.ts,.js}'),
  ],
  migrations: [
    path.join(__dirname, '..', '..', 'database/migrations/*{.ts,.js}'),
  ],
  namingStrategy: customNamingStrategy,
  synchronize: false,
  logging: false,
})

export default dataSource
