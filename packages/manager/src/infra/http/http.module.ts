import { Module } from '@nestjs/common';
import { CacheManagerModule } from '@app/infra/persistence/cache/cache.module';
import { DependencyController } from './dependency.controller';


import { CreateDependencyUseCase } from '@app/application/manager/use-case/create-dependency';
import { GetDependencyUseCase } from '@app/application/manager/use-case/get-dependency';
import { AppController } from './app.controller';

@Module({
  imports: [CacheManagerModule],
  controllers: [AppController, DependencyController],
  providers: [CreateDependencyUseCase, GetDependencyUseCase],
  exports: [],
})
export class HttpModule { }
