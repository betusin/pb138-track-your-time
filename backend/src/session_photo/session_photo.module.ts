import { Module } from '@nestjs/common';
import { SessionPhotoService } from './session_photo.service';
import { SessionPhotoController } from './session_photo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';

@Module({
  imports: [PrismaModule],
  controllers: [SessionPhotoController],
  providers: [SessionPhotoService, CurrentUserProvider],
})
export class SessionPhotoModule {}
