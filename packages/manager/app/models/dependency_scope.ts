import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class DependencyScope extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare path: string

  @column()
  declare name: string

  @column()
  declare url: string

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
