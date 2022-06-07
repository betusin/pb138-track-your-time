import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { BaseGetDto } from '../../base-dto';
import { CreateSessionPhotoDto } from './create-session_photo.dto';
import { IsString } from 'class-validator';

export class GetSessionPhotoDto extends IntersectionType(
  BaseGetDto,
  CreateSessionPhotoDto,
) {
  @ApiProperty({ required: false })
  @IsString()
  data?: string; // Base64 encoded image
}
