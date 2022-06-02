import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';

@Module({
  imports: [PrismaModule],
  controllers: [SessionController],
  providers: [SessionService, CurrentUserProvider],
})
export class SessionModule {}
