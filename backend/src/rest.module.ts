import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { CurrentUserModule } from './current-user/current-user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CurrentUserModule,
    UserModule,
    ProjectModule,
    SessionModule,
    MeModule,
  ],
})
export class RestModule {}
