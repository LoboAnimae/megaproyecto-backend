import { Body, Controller, Delete, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JWT } from 'src/user/get-jwt.decorator';
import { DocumentService } from './document.service';
import { DocumentCreateDto } from './dto';
@Controller('document')
export class DocumentController {

    constructor(
        private documentService: DocumentService,
        private jwtService: JwtService
    ) { }

    @Get('/:documentUUID')
    async getDocument(@Param('documentUUID') documentUUID: string, @Res({ passthrough: true}) res: Response): Promise<StreamableFile> {
        const fileRaw = await this.documentService.getDocument(documentUUID);
        res.set({
            'Content-Type': 'text/plain',
        })
        return new StreamableFile(fileRaw.Body);
    }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    newFile(@UploadedFile() file: Express.Multer.File, @JWT() jwt: any) {
        const documentCreateDto = new DocumentCreateDto();
        documentCreateDto.file = file;
        documentCreateDto.requester = (this.jwtService.decode(jwt) as any)?.username;
        documentCreateDto.documentName = file.originalname;
        return this.documentService.createDocument(documentCreateDto);
    }

    @Delete()
    deleteFile(@Body('fileName') fileName: string, @JWT() jwt: any) {
        return this.documentService.deleteDocument(fileName, jwt.username);
    }
}
