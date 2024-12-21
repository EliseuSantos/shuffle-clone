import { Injectable } from "@nestjs/common";
import { DependencyRepository } from "../ports/dependency.repositoy";

interface GetDependencyUseCaseCommand {}

@Injectable()
export class GetDependencyUseCase {
  constructor(private dependencyRepository: DependencyRepository) {}

  async execute({}: GetDependencyUseCaseCommand): Promise<any> {
    return await this.dependencyRepository.findMany();
  }
}
