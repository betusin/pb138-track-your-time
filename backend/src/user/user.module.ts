import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, CurrentUserProvider],
})
export class UserModule {}
