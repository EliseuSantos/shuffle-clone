import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Dependency from "#models/dependency";
import DependencyVersion from "#models/dependency_version";

export default class extends BaseSeeder {
	async run() {
		const dependencies = [
			{
				name: "react",
				status: true,
				version: {
					version: "19.0.0",
					url: "https://react.microfrontends.app/deps/npm:react@19.0.0/dev.index.js",
					integrity: "",
					status: true,
				},
			},
			{
				name: "react-dom",
				status: true,
				version: {
					version: "19.0.0",
					url: "https://react.microfrontends.app/deps/npm:react-dom@19.0.0/dev.index.js",
					integrity: "",
					status: true,
				},
			},
			{
				name: "react-dom/client",
				status: true,
				version: {
					version: "19.0.0",
					url: "https://react.microfrontends.app/deps/npm:react-dom@19.0.0/dev.client.js",
					integrity: "",
					status: true,
				},
			},
			{
				name: "single-spa",
				status: true,
				version: {
					version: "7.0.0-beta.1",
					url: "https://react.microfrontends.app/deps/npm:single-spa@7.0.0-beta.1/lib/esm/single-spa.min.js",
					integrity: "",
					status: true,
				},
			},
		];

		for (const dependency of dependencies) {
			const { name, status } = dependency;
			const dependencyModel = await Dependency.create({ name, status });
			await DependencyVersion.create({
				...dependency.version,
				dependencyId: dependencyModel.id,
			});
		}
	}
}
