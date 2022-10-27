import { IsString } from "class-validator";

export class DocumentGetDto {
    @IsString()
    documentId: string;
}