import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ProjectModule, SessionModule],
  controllers: [AppController],
})
export class RestModule {}