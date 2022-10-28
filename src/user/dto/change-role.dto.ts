import { IsNumber, IsString } from "class-validator";

export class ChangeRoleDto {
    @IsString()
    username: string;

    @IsString()
    newRole: string;
}