import { Dependency } from "@app/domain/manager/dependency";
import { DependencyVersion } from "@app/infra/persistence/mongoose/entities/dependency.entity";

export abstract class DependencyRepository {
    abstract findMany(): Promise<Dependency[]>;
    abstract create(data: Dependency): Promise<Dependency>;
    abstract getActiveVersion(packageName: string): Promise<Dependency | null>;
    abstract updateVersionStatus(packageName: string, version: string, status: boolean): Promise<void>;
    abstract addVersion(packageName: string, versionData: Partial<DependencyVersion>): Promise<Dependency>;
}
