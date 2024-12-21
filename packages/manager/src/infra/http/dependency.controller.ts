import { CreateDependencyUseCase } from '@app/application/manager/use-case/create-dependency';
import {
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { GetDependencyUseCase } from '@app/application/manager/use-case/get-dependency';
import { ApiTags } from '@nestjs/swagger';
import { CacheKey } from '@nestjs/cache-manager';
import { HttpCacheInterceptor } from '@app/infra/persistence/cache/interceptor/http-cache.interceptor';

@Controller('/dependency')
@ApiTags('Dependency')
export class DependencyController {
    constructor(
        private createDependencyUseCase: CreateDependencyUseCase,
        private getDependencyUseCase: GetDependencyUseCase
    ) { }

    @Get('')
    @CacheKey('dependencys')
    @UseInterceptors(HttpCacheInterceptor)
    getAll() {
        const response = this.getDependencyUseCase.execute({});
        return response;
    }

    @Post('')
    create(@Body() createDependencyDto: CreateDependencyDto) {
        const response = this.createDependencyUseCase.execute(createDependencyDto);
        return response;
    }
}
