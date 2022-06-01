import { Module } from '@nestjs/common';
import { SessionPhotoService } from './session_photo.service';
import { SessionPhotoController } from './session_photo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SessionPhotoController],
  providers: [SessionPhotoService],
})
export class SessionPhotoModule {}
