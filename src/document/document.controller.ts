import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
    // StreamableFile,
    UploadedFile, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {FileInterceptor} from '@nestjs/platform-express';
import {Response} from 'express';
import {JWT} from 'src/user/get-jwt.decorator';
import {DocumentService} from './document.service';
import {DocumentCreateDto} from './dto';
import {AuthGuard} from '@nestjs/passport';
import {DocumentInstanceCreateDto} from './dto/document-instance-create.dto';
import {DocumentOperationDto} from './dto/document-operation.dto';
import {AddCommentDto} from './dto/add-comment.dto';


@Controller('document')
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
    constructor(
        private documentService: DocumentService,
        private jwtService: JwtService,
    ) {
    }

    @Get('/:documentUUID')
    async getDocument(@Param('documentUUID') documentUUID: string, @Res({passthrough: true}) res: Response, @JWT() jwt: string): Promise</*StreamableFile*/any> {
        const {username} = await this.jwtService.decode(jwt) as { username };
        const documentOperationDto = new DocumentOperationDto();
        documentOperationDto.documentUUID = documentUUID;
        documentOperationDto.requester = username;
        return await this.documentService.getDocument(documentOperationDto);
        // const fileRaw =  await this.documentService.getDocument(documentUUID, jwt);
        // res.set({'Content-Type': 'text/plain'})
        // return new StreamableFile(fileRaw.Body);
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

    @Delete('/:documentUUID')
    async deleteFile(@Param('documentUUID') documentUUID: string, @JWT() jwt: any) {
        const {username} = await this.jwtService.decode(jwt) as { username };
        const documentOperationDto = new DocumentOperationDto();
        documentOperationDto.documentUUID = documentUUID;
        documentOperationDto.requester = username;
        return this.documentService.deleteDocument(documentOperationDto);
    }

    @Post('/new-instance/:documentUUID')
    async createDocumentInstance(@Param('documentUUID') documentUUID: string, @JWT() jwt: string, @Body() documentInstanceCreateDto: DocumentInstanceCreateDto) {

        const {username} = await this.jwtService.decode(jwt) as { username };
        const documentOperationDto = new DocumentOperationDto();
        documentOperationDto.documentUUID = documentUUID;
        documentOperationDto.requester = username;
        return this.documentService.createDocumentInstance(documentOperationDto, documentInstanceCreateDto);
    }

    @Post('/new-comment')
    async newComment(@Body() addCommentDto: AddCommentDto, @JWT() jwt) {
        const {username} = this.jwtService.decode(jwt) as { username };
        addCommentDto.requester = username;
        return this.documentService.addComment(addCommentDto);
    }
}
