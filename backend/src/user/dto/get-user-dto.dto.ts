import { IntersectionType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';
import { BaseGetDto } from '../../base-dto';

export class GetUserDto extends IntersectionType(BaseGetDto, BaseUserDto) {}
