import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isInvoiced?: boolean;
}
