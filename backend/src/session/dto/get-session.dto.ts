import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';
import { BaseGetDto } from '../../base-dto';

export class GetSessionDto extends IntersectionType(
  BaseGetDto,
  CreateSessionDto,
) {
  @ApiProperty()
  @IsBoolean()
  isInvoiced: boolean;
}
