import Dependency from '#models/dependency'
import DependencyVersion from '#models/dependency_version'
import { Infer } from '@vinejs/vine/types'
import { createDependencyValidator, createScopeValidator } from '#validators/dependency_validator'
import DependencyScope from '#models/dependency_scope'

export class DependencyService {
  public async getImportMap() {
    const dependencies = await Dependency.query()
      .where('external', true)
      .preload('versions', (query) => query.where('status', true))

    const imports = Object.fromEntries(
      dependencies.flatMap((dependency) => {
        const activeDependencyVersion = dependency.versions[0]
        return activeDependencyVersion ? [[dependency.name, activeDependencyVersion.url]] : []
      })
    )

    const integrity = Object.fromEntries(
      dependencies.flatMap((dependency) => {
        const activeDependencyVersion = dependency.versions[0]
        return activeDependencyVersion?.integrity
          ? [[activeDependencyVersion.url, activeDependencyVersion.integrity]]
          : []
      })
    )

    const scopes = await DependencyScope.query()

    const scopeMap = Object.fromEntries(
      scopes.flatMap((scope) => {
        return [
          [
            scope.path,
            {
              [scope.name]: scope.url,
            },
          ],
        ]
      })
    )

    return { imports, scopes: scopeMap, integrity }
  }

  public async registerPackage(payload: Infer<typeof createDependencyValidator>) {
    const { name, version, url, status, integrity } = payload

    const dependency = await Dependency.firstOrCreate(
      { name },
      { external: true, autoUpdate: false }
    )

    const versionExists = await DependencyVersion.query()
      .where('dependencyId', dependency.id)
      .andWhere('version', version)
      .first()

    if (versionExists) {
      throw new Error(`DependencyVersion ${version} already exists for dependency ${name}`)
    }

    await DependencyVersion.create({
      dependencyId: dependency.id,
      version,
      url,
      status,
      integrity,
    })

    if (status) {
      await this.setActiveDependencyVersion(dependency, version)
    }

    return dependency
  }

  private async setActiveDependencyVersion(dependency: Dependency, version: string) {
    await DependencyVersion.query().where('dependencyId', dependency.id).update({ status: false })

    await DependencyVersion.query()
      .where('dependencyId', dependency.id)
      .andWhere('version', version)
      .update({ status: true })
  }

  public async registerScope(payload: Infer<typeof createScopeValidator>) {
    const { path, name, url, status } = payload

    let scope = await DependencyScope.findBy('path', path)
    if (!scope) {
      scope = new DependencyScope()
      scope.path = path
      scope.name = name
      scope.url = url
      scope.status = status ?? true
      await scope.save()
    } else {
      scope.name = name
      scope.url = url
      scope.status = status ?? scope.status
      await scope.save()
    }

    return scope
  }

  public async getScopes() {
    return await DependencyScope.all()
  }

  public async updateScopeStatus(path: string, status: boolean) {
    const scope = await DependencyScope.findBy('path', path)
    if (!scope) {
      throw new Error(`Scope with path ${path} not found`)
    }

    scope.status = status
    await scope.save()
    return scope
  }
}
