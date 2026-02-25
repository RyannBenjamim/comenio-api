import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://comenio-front.vercel.app'
    ], 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    credentials: true, 
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            
      forbidNonWhitelisted: true, 
      transform: true,            
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
