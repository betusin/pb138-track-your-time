import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [PrismaModule, UserModule, ProjectModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
