import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //clean params not valid in dto
      whitelist: true,
      //transform params to dto object
      transform: true,
      //raise error if the params doesnot exist
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
