import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateSessionDto {
  @IsDateString()
  fromDate: Date;

  @IsDateString()
  toDate: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @IsOptional()
  @IsString()
  note: string;
}
