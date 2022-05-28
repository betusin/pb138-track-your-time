import { IsString, IsInt, Min, IsOptional, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsUUID()
  userId: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  hourlyRate: number;

  @IsString()
  @IsOptional()
  customer: string;
}
