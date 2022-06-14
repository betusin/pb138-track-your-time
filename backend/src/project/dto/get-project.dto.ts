import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { BaseGetDto } from '../../base-dto';
import { CreateProjectDto } from './create-project.dto';
import { IsDateString } from 'class-validator';

export class GetProjectDto extends IntersectionType(
  BaseGetDto,
  CreateProjectDto,
) {
  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
