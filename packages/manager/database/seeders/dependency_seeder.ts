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
					url: "http://localhost:3333/assets/react/dev.index.js",
					integrity: "",
					status: true,
				},
			},
			{
				name: "react-dom",
				status: true,
				version: {
					version: "19.0.0",
					url: "http://localhost:3333/assets/react-dom/dev.index.js",
					integrity: "",
					status: true,
				},
			},
			{
				name: "react-dom/client",
				status: true,
				version: {
					version: "19.0.0",
					url: "http://localhost:3333/assets/react-dom/dev.client.js",
					integrity: "",
					status: true,
				},
			},
			{
				name: "single-spa",
				status: true,
				version: {
					version: "7.0.0-beta.1",
					url: "http://localhost:3333/assets/single-spa/single-spa.min.js",
					integrity: "",
					status: true,
				},
			},
      {
				name: "@shuffle-clone/root-config",
				status: true,
				version: {
					version: "1.0.0",
					url: "http://localhost:9000/shuffle-clone-root-config.js",
					integrity: "",
					status: true,
				},
			},
      {
				name: "@shuffle-clone/chat",
				status: true,
				version: {
					version: "1.0.0",
					url: "http://localhost:8080/shuffle-clone-chat.js",
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
