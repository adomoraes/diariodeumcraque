import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateDiaryEntryDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @MaxLength(500)
  focus?: string;

  @IsOptional()
  @MaxLength(2000)
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  techniquRating?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  physicalRating?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  mentalRating?: number;

  @IsOptional()
  @MaxLength(1000)
  whatWentWell?: string;

  @IsOptional()
  @MaxLength(1000)
  whatWasDifficult?: string;

  @IsOptional()
  @MaxLength(500)
  nextGoal?: string;
}
