import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty()
  @IsDateString()
  fromDate: Date;

  @ApiProperty()
  @IsDateString()
  toDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note: string;
}
