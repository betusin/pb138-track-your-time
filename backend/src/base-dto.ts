import { ApiProperty } from '@nestjs/swagger';

export class BaseGetDto {
  @ApiProperty({ format: 'uuid' })
  id: string;
}
