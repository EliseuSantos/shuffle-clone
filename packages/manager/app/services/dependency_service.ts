import type { Infer } from "@vinejs/vine/types";
import Dependency from "#models/dependency";
import DependencyScope from "#models/dependency_scope";
import type {
	createDependencyValidator,
	createScopeValidator,
} from "#validators/dependency_validator";
import { getActiveVersion } from "../utils/index.js";

export class DependencyService {
	public async getImportMap() {
		const dependencies = await Dependency.query().preload("versions", (query) =>
			query.where("status", true),
		);

		const imports = Object.fromEntries(
			dependencies.flatMap((dependency) => {
				const activeDependencyVersion = getActiveVersion(dependency.versions);

				return activeDependencyVersion
					? [[dependency.name, activeDependencyVersion.url]]
					: [];
			}),
		);

		const integrity = Object.fromEntries(
			dependencies.flatMap((dependency) => {
				const activeDependencyVersion = getActiveVersion(dependency.versions);

				return activeDependencyVersion?.integrity
					? [[activeDependencyVersion.url, activeDependencyVersion.integrity]]
					: [];
			}),
		);

		const scopes: DependencyScope[] = await DependencyScope.query();

		const scopeMap: Record<string, Record<string, string>> = {};

		for (const scope of scopes) {
			if (!scopeMap[scope.path]) {
				scopeMap[scope.path] = {};
			}
			scopeMap[scope.path][scope.name] = scope.url;
		}

		return { imports, scopes: scopeMap, integrity };
	}

	public async registerPackage(
		payload: Infer<typeof createDependencyValidator>,
	) {
		const { name, version, url, status, integrity } = payload;
		let dependency = await Dependency.findBy("name", name);
		if (!dependency) {
			dependency = new Dependency();
			dependency.name = name;
			await dependency.save();
		}

		try {
			await dependency.addDependencyVersion(version, url, status, integrity);
		} catch (error) {
			throw new Error(`Error adding version: ${error.message}`);
		}

		if (status) {
			await dependency.setActiveDependencyVersion(version);
		}

		return dependency;
	}

	public async registerScope(payload: Infer<typeof createScopeValidator>) {
		const { path, name, url, status } = payload;

		let scope = await DependencyScope.findBy("path", path);
		if (!scope) {
			scope = new DependencyScope();
			scope.path = path;
			scope.name = name;
			scope.url = url;
			scope.status = status ?? true;
			await scope.save();
		} else {
			scope.name = name;
			scope.url = url;
			scope.status = status ?? scope.status;
			await scope.save();
		}

		return scope;
	}

	public async getScopes() {
		return await DependencyScope.all();
	}

	public async updateScopeStatus(path: string, status: boolean) {
		const scope = await DependencyScope.findBy("path", path);
		if (!scope) {
			throw new Error(`Scope with path ${path} not found`);
		}

		scope.status = status;
		await scope.save();
		return scope;
	}
}
