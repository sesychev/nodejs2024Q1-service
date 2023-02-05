import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await readFile(
    join(__dirname, '..', 'doc', 'api.yaml'),
    'utf-8',
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(PORT, () =>
    console.log(
      `Server running on ${PORT} port as a http://${HOST}:${PORT} service`,
    ),
  );
}

bootstrap();
