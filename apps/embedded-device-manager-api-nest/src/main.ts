import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import {
	DocumentBuilder,
	SwaggerModule
	} from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	//TODO variabilize title, description, version, tags
	const options = new DocumentBuilder()
		.setDescription('Nest.js API to manage embedded device')
		.setTitle('embedded-device-manager-api-nest')
		.setVersion('1.0.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);

	await app.listen(8080);
}

bootstrap();
