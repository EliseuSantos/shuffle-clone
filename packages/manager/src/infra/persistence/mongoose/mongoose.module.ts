import { DependencyRepository } from '@app/application/manager/ports/dependency.repositoy';
import { EnvModule, EnvService } from '@app/infra/env';
import { Module, Global } from '@nestjs/common';
import { MongooseModule as MongooseModuleLib } from '@nestjs/mongoose';
import { Dependency, DependencySchema } from './entities/dependency.entity';

// Non exported
import { MongooseDependencyRepository } from './repositories/dependency.repositoy';

@Global()
@Module({
    imports: [
        MongooseModuleLib.forRootAsync({
            imports: [EnvModule],
            useFactory: (envService: EnvService) => ({
                uri: envService.get('MONGODB_URL'),
            }),
            inject: [EnvService],
        }),
        MongooseModuleLib.forFeature([
            { name: Dependency.name, schema: DependencySchema },
        ]),
    ],
    providers: [
        {
            provide: DependencyRepository,
            useClass: MongooseDependencyRepository
        },
    ],
    exports: [DependencyRepository],
})
export class MongooseModule { }
