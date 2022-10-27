import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DocumentCreateDto {
    @IsDefined()
    @IsNotEmpty()
    file: Express.Multer.File;

    @IsString()
    requester: string;

    @IsString()
    documentName: string
}