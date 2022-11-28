import {IsNumber, IsString, Length, MinLength} from 'class-validator';

export class AddCommentDto {
    @IsString()
    requester: string = '';

    @IsString()
    @Length(36, 36)
    groupUUID: string;

    @IsString()
    @MinLength(1)
    contents: string;

    @IsNumber()
    fromCharacter: number;
    @IsNumber()
    toCharacter: number;
}