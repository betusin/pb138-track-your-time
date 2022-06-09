import { ApiProperty } from '@nestjs/swagger';
import { GetSessionPhotoDto } from 'src/session_photo/dto/get-session_photo.dto';
import { GetSessionDto } from './get-session.dto';

export class GetSessionWithPhotosDto extends GetSessionDto {
  @ApiProperty()
  photos: GetSessionPhotoDto[];
}
