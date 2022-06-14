import { IntersectionType } from '@nestjs/swagger';
import { BaseGetDto } from '../../base-dto';
import { CreateProjectDto } from './create-project.dto';

export class GetProjectDto extends IntersectionType(
  BaseGetDto,
  CreateProjectDto,
) {}
