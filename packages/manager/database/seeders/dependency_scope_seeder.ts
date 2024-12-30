import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DependencyScope from "#models/dependency_scope";

export default class extends BaseSeeder {
  async run() {
    const scopes = [
      {
        name: 'process',
        path: 'http://localhost:3333/assets/',
        status: true,
        url: 'http://localhost:3333/assets/process/process.js'
      },
       {
        name: 'scheduler',
        path: 'http://localhost:3333/assets/',
        status: true,
        url: 'http://localhost:3333/assets/scheduler/dev.index.js'
      },
      {
        name: 'tslib',
        path: 'http://localhost:3333/assets/',
        status: true,
        url: 'http://localhost:3333/assets/tslib/tslib.es6.mjs'
      }
    ];

    for (const scope of scopes) {
      await DependencyScope.create(scope);
    }
  }
}
