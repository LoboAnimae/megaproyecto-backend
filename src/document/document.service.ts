import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { DocumentCreateDto, DocumentGetDto } from './dto';


@Injectable()
export class DocumentService {
    constructor(
        private s3Service: S3Service
    ) { }

    /**
     * Creates a document without an instance. It basically creates a document that is stored in a bucket.
     */

    createDocument(documentCreateDto: DocumentCreateDto) {
        const file = documentCreateDto.file;
        const name = 'trying23/' + documentCreateDto.documentName;
        return this.s3Service.uploadToBucket(name, file);
    }


    createDocumentInstance() { }

    getDocument(documentGetDto: DocumentGetDto) { }

    deleteDocument(fileName: string, requester: string) {
        return this.s3Service.deleteFromBucket(fileName);
    }
}
