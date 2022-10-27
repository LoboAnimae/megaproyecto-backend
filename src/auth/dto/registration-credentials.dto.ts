import { IsBoolean, IsOptional, IsDateString, IsNumber } from "class-validator";
import { LoginCredentialsDto } from "./login-credentials.dto";

export class RegistrationParamsDto extends LoginCredentialsDto {
    // @IsBoolean()
    // @IsOptional()
    // sex: boolean = true;
  
    // @IsDateString()
    // dateOfBirth: string;
  
    // @IsNumber()
    // portalRoleId: number;
  
    // @IsNumber()
    // institutionId: number;
  }
  