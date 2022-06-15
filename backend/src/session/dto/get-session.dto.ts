import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-session.dto';
import { BaseGetDto } from '../../base-dto';

export class GetSessionDto extends IntersectionType(
  BaseGetDto,
  CreateSessionDto,
) {
  @ApiProperty({ format: 'uuid' })
  projectId: string;
}
