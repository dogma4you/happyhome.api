"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const fs = require("fs");
const path = require("path");
const database_1 = require("./utils/database");
const bad_requiest_1 = require("./utils/bad_requiest");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const migrationsPath = path.join(__dirname, './migrations');
    if (!fs.existsSync(migrationsPath)) {
        fs.mkdirSync(migrationsPath);
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Api Documentation')
        .setDescription('The HH OpenAPI documentation')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'Authorization')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(express.json({ limit: '3gb' }));
    app.use(express.urlencoded({ limit: '3gb', extended: true }));
    app.useGlobalFilters(new database_1.SqlExceptionFilter());
    app.useGlobalFilters(new bad_requiest_1.BadRequestExceptionFilter());
    app.enableCors({
        allowedHeaders: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        origin: '*',
    });
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map