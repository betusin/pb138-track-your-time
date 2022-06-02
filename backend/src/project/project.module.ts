import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, SessionService, CurrentUserProvider],
})
export class ProjectModule {}
