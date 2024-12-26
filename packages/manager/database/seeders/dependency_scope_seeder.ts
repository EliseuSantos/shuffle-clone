import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DependencyScope from "#models/dependency_scope";

export default class extends BaseSeeder {
  async run() {
    const scopes = [
      {
        name: 'process',
        path: 'https://react.microfrontends.app/deps/',
        status: true,
        url: 'https://react.microfrontends.app/deps/npm:@jspm/core@2.1.0/nodelibs/browser/process.js'
      },
       {
        name: 'scheduler',
        path: 'https://react.microfrontends.app/deps/',
        status: true,
        url: 'https://react.microfrontends.app/deps/npm:scheduler@0.25.0/dev.index.js'
      },
      {
        name: 'tslib',
        path: 'https://react.microfrontends.app/deps/',
        status: true,
        url: 'https://react.microfrontends.app/deps/npm:tslib@2.8.1/tslib.es6.mjs'
      }
    ];

    for (const scope of scopes) {
      await DependencyScope.create(scope);
    }
  }
}
