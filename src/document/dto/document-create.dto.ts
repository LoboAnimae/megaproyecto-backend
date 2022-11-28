import {IsNotEmpty, IsString} from "class-validator";

export class DocumentCreateDto {
    @IsNotEmpty()
    file: Express.Multer.File;

    @IsString()
    requester: string;

    @IsString()
    documentName: string
}