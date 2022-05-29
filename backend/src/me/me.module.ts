import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeController } from './me.controller';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';

@Module({
  imports: [PrismaModule],
  controllers: [MeController],
  providers: [UserService, ProjectService],
})
export class MeModule {}
