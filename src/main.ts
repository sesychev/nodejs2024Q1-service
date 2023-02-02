import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(
      `Server running on ${PORT} port as a http://${HOST}:${PORT} service`,
    ),
  );
}

bootstrap();
