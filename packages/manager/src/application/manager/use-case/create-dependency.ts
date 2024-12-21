import { Dependency } from "@app/domain/manager/dependency";
import { Injectable } from "@nestjs/common";
import { DependencyRepository } from "../ports/dependency.repositoy";

interface CreateDependencyUseCaseCommand {
  name: string;
}

@Injectable()
export class CreateDependencyUseCase {
  constructor(private dependencyRepository: DependencyRepository) {}

  async execute({ name }: CreateDependencyUseCaseCommand): Promise<any> {
    const dependency = new Dependency({
      name
    });

    return await this.dependencyRepository.create(dependency);
  }
}
