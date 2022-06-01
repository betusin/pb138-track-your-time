import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { SessionPhotoModule } from './session_photo/session_photo.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ProjectModule,
    SessionModule,
    SessionPhotoModule,
    MeModule,
  ],
})
export class RestModule {}
