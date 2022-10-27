import { Body, Controller, Delete, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentCreateDto, DocumentGetDto } from './dto';
import { JWT } from 'src/user/get-jwt.decorator';
import { DocumentService } from './document.service';
@Controller('document')
export class DocumentController {

    constructor(
        private documentService: DocumentService
    ) { }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    newFile(@UploadedFile() file: Express.Multer.File, @JWT() jwt: any) {
        const documentCreateDto = new DocumentCreateDto();
        documentCreateDto.file = file;
        documentCreateDto.requester = jwt.username;
        documentCreateDto.documentName = file.originalname;
        return this.documentService.createDocument(documentCreateDto);
    }

    @Delete()
    deleteFile(@Body('fileName') fileName: string, @JWT() jwt: any) {
        return this.documentService.deleteDocument(fileName, jwt.username);
    }
}
