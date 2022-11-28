import {IsString} from 'class-validator';

export class DocumentOperationDto {
    @IsString()
    documentUUID: string;

    @IsString()
    requester: string;
}