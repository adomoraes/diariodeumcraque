import { IsOptional, IsEmail, MaxLength, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date | null;
}
