import { EnvService } from "@app/infra/env";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		snapshot: true,
		rawBody: true,
	});

	const configService = app.get(EnvService);
	const port = configService.get("PORT");

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	if (process.env.NODE_ENV !== "production") {
		const config = new DocumentBuilder()
			.setTitle("API")
			.setVersion("0.1")
			.addServer(`http://localhost:${port}`)
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("docs", app, document);
	}

	await app.listen(port);
}
bootstrap();
