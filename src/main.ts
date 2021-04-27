import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // handle bad request data doesn't conform DTO
      whitelist: true,
      forbidNonWhitelisted: true,
      // payload data incoming conform to DTO types
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
