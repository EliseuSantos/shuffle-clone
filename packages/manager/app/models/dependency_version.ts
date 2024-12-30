import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Dependency from '#models/dependency'

export default class DependencyVersion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dependencyId: number

  @column()
  declare version: string

  @column()
  declare url: string

  @column()
  declare status: boolean

  @column()
  declare integrity: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Dependency)
  public dependency!: BelongsTo<typeof Dependency>
}
