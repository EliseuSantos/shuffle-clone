import { Entity } from "@app/core/entities/entity";

export interface DependencyVersionData {
    id?: string;
    version: string;
    status: boolean;
}

export interface DependencyData {
    id?: string;
    name: string;
    versions?: DependencyVersionData[];
}

export class DependencyVersion extends Entity<DependencyVersionData> {
    constructor(data: DependencyVersionData) {
        super(data);
    }

    get id(): string {
        return this.data.id;
    }

    get version(): string {
        return this.data.version;
    }

    get currentState(): DependencyVersionData {
        return this.data;
    }
}


export class Dependency extends Entity<DependencyData> {
    constructor(data: DependencyData) {
        super(data);
    }

    get id(): string {
        return this.data.id;
    }

    get name(): string {
        return this.data.name;
    }

    get currentState(): DependencyData {
        return this.data;
    }
}
