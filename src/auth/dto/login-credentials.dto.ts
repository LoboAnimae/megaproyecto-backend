import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginCredentialsDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}