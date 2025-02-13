import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { SqlExceptionFilter } from './utils/database';
import { BadRequestExceptionFilter } from './utils/bad_requiest';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const migrationsPath = path.join(__dirname, './migrations')
  if (!fs.existsSync(migrationsPath)) {
    fs.mkdirSync(migrationsPath)
  }

  const config = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription('The HH OpenAPI documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(express.json({ limit: '3gb' }));
  app.use(express.urlencoded({ limit: '3gb', extended: true }));

  app.useGlobalFilters(new SqlExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter())
  app.enableCors({
    allowedHeaders: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
});
  await app.listen(process.env.PORT);
}

bootstrap();