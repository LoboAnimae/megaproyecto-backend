
import {IsNotEmpty, IsString, Length} from 'class-validator';

export class DocumentInstanceCreateDto {

    @IsString()
    @Length(6, 6)
    color: string = '3b3c3a';

    @IsString()
    groupName: string = 'New Group';

    @IsString()
    @IsNotEmpty()
    instanceName: string;
}