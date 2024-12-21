import { CreateDependencyUseCase } from '@app/application/manager/use-case/create-dependency';
import { GetDependencyUseCase } from '@app/application/manager/use-case/get-dependency';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CacheManagerModule } from '../persistence/cache/cache.module';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { DependencyController } from './dependency.controller';
import { MongooseModule } from "@app/infra/persistence/mongoose/mongoose.module";

describe('DependencysController', () => {
    let httpServer: any;
    let app: any;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                CacheManagerModule,
                MongooseModule,
            ],
            controllers: [DependencyController],
            providers: [CreateDependencyUseCase, GetDependencyUseCase],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        httpServer = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('DependencyController', () => {
        it('should create dependency', async () => {
            const createDto: CreateDependencyDto = {
                name: 'Jonh Doe',
            };
            const response = await request(httpServer)
                .post('/dependency')
                .send(createDto);

            expect(response.status).toBe(201);
            expect(response.body.data.name).toEqual(createDto.name);
        });
    });
});
