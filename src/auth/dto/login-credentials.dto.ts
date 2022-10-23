import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class RegistrationParamsDto extends LoginCredentialsDto {
  @IsBoolean()
  @IsOptional()
  sex: boolean = true;

  @IsDateString()
  dateOfBirth: string;

  @IsNumber()
  portalRoleId: number;

  @IsNumber()
  institutionId: number;
}
