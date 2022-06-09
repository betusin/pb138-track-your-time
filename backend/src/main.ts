import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { createOpenApiDocument } from './app-common';
import { PrismaExceptionFilter } from './exception/prisma-exception.filter';
import { ServiceExceptionFilter } from './exception/service-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(RestModule, {
    cors: {
      origin: ['http://localhost:8080', 'http://localhost:4000'],
      credentials: true,
    },
  });

  // To read cookies from request
  app.use(cookieParser());

  // Add Prisma shutdown hooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Endpoint prefix and versioning
  app.setGlobalPrefix('/api');
  app.enableVersioning({ type: VersioningType.URI });

  // Exception handling
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new ServiceExceptionFilter());

  // Swagger UI
  const document = await createOpenApiDocument(app);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}

bootstrap();
