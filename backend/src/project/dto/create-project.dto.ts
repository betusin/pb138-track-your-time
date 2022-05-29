import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  customer?: string;
}
