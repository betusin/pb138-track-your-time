import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { BaseGetDto } from '../../base-dto';
import { CreateProjectDto } from './create-project.dto';
import { IsBoolean } from 'class-validator';

export class GetProjectDto extends IntersectionType(
  BaseGetDto,
  CreateProjectDto,
) {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
