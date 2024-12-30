import {healthChecks} from '#start/health'
import type {HttpContext} from '@adonisjs/core/http'

export default class HealthChecksController {
  /**
   * @handle
   * @tag default
   * @summary Lorem ipsum dolor sit amet
   * @paramPath provider - The login provider to be used - @enum(google, facebook, apple)
   * @responseBody 200 - {"token": "xxxxxxx"}
   * @requestBody {"code": "xxxxxx"}
   */
  async handle({response}: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }
}
