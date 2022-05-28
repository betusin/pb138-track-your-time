import { IsString, IsInt, Min, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @IsOptional()
  @IsString()
  customer: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
