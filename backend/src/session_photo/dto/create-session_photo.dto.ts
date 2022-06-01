import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionPhotoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
