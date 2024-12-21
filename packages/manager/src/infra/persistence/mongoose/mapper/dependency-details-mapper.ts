import { Dependency } from '@app/domain/manager/dependency';
import { Dependency as DependencyDocument } from '../entities/dependency.entity';

export class MongooseDependencyDetailsMapper {
  static toDomain(entity: DependencyDocument): Dependency {
    const model = new Dependency({
      id: entity._id.toString(),
      name: entity.name,
    });
    return model;
  }
}