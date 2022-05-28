import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeController } from './me.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [MeController],
  providers: [UserService],
})
export class MeModule {}
