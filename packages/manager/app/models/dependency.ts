import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import DependencyVersion from './dependency_version.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Dependency extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare external: boolean

  @column()
  declare autoUpdate: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => DependencyVersion)
  public versions!: HasMany<typeof DependencyVersion>

  async addDependencyVersion(
    version: string,
    url: string,
    status: boolean = false,
    integrity: string = ''
  ) {
    const existingDependencyVersion = await DependencyVersion.query()
      .where('dependencyId', this.id)
      .andWhere('version', version)
      .first()

    if (existingDependencyVersion) {
      throw new Error(`DependencyVersion ${version} already exists for dependency ${this.name}`)
    }

    await DependencyVersion.create({
      dependencyId: this.id,
      version,
      url,
      status,
      integrity,
    })
  }

  async setActiveDependencyVersion(version: string) {
    const versionExists = await DependencyVersion.query()
      .where('dependencyId', this.id)
      .andWhere('version', version)
      .first()

    if (!versionExists) {
      throw new Error(`DependencyVersion ${version} not found for dependency ${this.name}`)
    }

    await DependencyVersion.query().where('dependencyId', this.id).update({ status: false })

    versionExists.status = true
    await versionExists.save()
  }
}
