import { DependencyRepository } from "@app/application/manager/ports/dependency.repositoy";
import { Dependency } from "@app/domain/manager/dependency";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Dependency as DependencyMongoose } from "../entities/dependency.entity";
import { MongooseDependencyMapper } from "../mapper/dependency-mapper";
import { MongooseDependencyDetailsMapper } from "../mapper/dependency-details-mapper";

@Injectable()
export class MongooseDependencyRepository implements DependencyRepository {
    constructor(
        @InjectModel(DependencyMongoose.name) private readonly dependencyModel: Model<DependencyMongoose>,
    ) { }

    async findMany(): Promise<Dependency[]> {
        const findQuery = await this.dependencyModel
            .find();

        return findQuery.map((item) => MongooseDependencyDetailsMapper.toDomain(item));
    }

    async create(dependency: Dependency): Promise<Dependency> {
        const data = MongooseDependencyMapper.toMongoose(dependency);
        const entity = new this.dependencyModel({ ...data })
        await entity.save();

        return MongooseDependencyMapper.toDomain(entity);
    }
}