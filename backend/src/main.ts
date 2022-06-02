import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaExceptionFilter } from './exception/prisma-exception.filter';
import { ServiceExceptionFilter } from './exception/service-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);
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
  const config = new DocumentBuilder()
    .setTitle('TrackYourTime')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}

bootstrap();
