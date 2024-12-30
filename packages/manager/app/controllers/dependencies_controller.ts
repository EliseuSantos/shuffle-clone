import type { HttpContext } from '@adonisjs/core/http'
import { createDependencyValidator, createScopeValidator } from '#validators/dependency_validator'

import { DependencyService } from '#services/dependency_service'

export default class DependenciesController {
  private dependencyService = new DependencyService()

  /**
   * @getImportMap
   * @tag Dependency
   * @responseBody <200> - {"imports": { "a": "b"}, "scopes": { "a": "b"}, "integrity": { "a": "b"}}
   * @description Returns importmap json
   */
  public async getImportMap({ response }: HttpContext) {
    const importMap = await this.dependencyService.getImportMap()
    return response.header('content-type', 'application/importmap+json').json(importMap)
  }

  /**
   * @getStatics
   * @tag Dependency
   * @responseBody <200>
   * @description Returns file
   */
  public async getStatics({ params, response }: HttpContext) {
    const file = await this.dependencyService.getFileStatic(params.filename)
    if(!file) {
      return response.notFound()
    }

    return response.download(file)
  }

  /**
   * @deployDependency
   * @tag Dependency
   * @requestBody <createDependencyValidator>
   * @description Create new version of dependency
   */
  public async deployDependency({ request }: HttpContext) {
    const data = await request.validateUsing(createDependencyValidator)
    return await this.dependencyService.registerPackage(data)
  }

  /**
   * @deployScopeDependency
   * @tag Dependency
   * @requestBody <createScopeValidator>
   * @description Create new scope of dependency
   */
  public async deployScopeDependency({ request }: HttpContext) {
    const data = await request.validateUsing(createScopeValidator)
    return await this.dependencyService.registerScope(data)
  }
}
