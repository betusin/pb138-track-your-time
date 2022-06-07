import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { PrismaExceptionFilter } from './exception/prisma-exception.filter';
import { ServiceExceptionFilter } from './exception/service-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);

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

  // Ignore CORS for the time being
  app.enableCors({
    origin: '*',
  });

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
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}

bootstrap();
