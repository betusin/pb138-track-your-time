import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSessionPhotoDto } from './create-session_photo.dto';
import { IsString } from 'class-validator';

export class UpdateSessionPhotoDto extends PartialType(CreateSessionPhotoDto) {
  @ApiProperty()
  @IsString()
  data: string; // Base64 encoded image
}
