import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class UpdateSessionDto {
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

  @IsOptional()
  @IsBoolean()
  isInvoiced: boolean;
}
