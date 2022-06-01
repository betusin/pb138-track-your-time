import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionPhotoService } from '../session_photo/session_photo.service';

@Module({
  imports: [PrismaModule],
  controllers: [SessionController],
  providers: [SessionService, SessionPhotoService],
})
export class SessionModule {}
