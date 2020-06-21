import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	DocumentBuilder,
	SwaggerModule
	} from '@nestjs/swagger';

async function bootstrap() {
	//TODO variabilize globalPrefix, port, title, description, version, tags
	const globalPrefix = 'api';
	const port = 5001;
	const description = 'Nest.js API to manage embedded devices';
	const title = 'embedded-devices-manager-api-nest';
	const version = '1.0.0';

	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix(globalPrefix);

	const options = new DocumentBuilder().setDescription(description).setTitle(title).setVersion(version).build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup(globalPrefix, app, document);

	await app.listen(port, () => {
		Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
	});
}

bootstrap();
