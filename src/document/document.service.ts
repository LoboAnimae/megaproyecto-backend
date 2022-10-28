import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../Entities/user.repository';
import { S3Service } from '../s3/s3.service';
import { DocumentCreateDto, DocumentGetDto } from './dto';


@Injectable()
export class DocumentService {
    constructor(
        private s3Service: S3Service,
        private userRepository: UsersRepository
    ) { }

    /**
     * Creates a document without an instance. It basically creates a document that is stored in a bucket.
     */

    async createDocument(documentCreateDto: DocumentCreateDto) {
        const file = documentCreateDto.file;
        const requester = documentCreateDto.requester;
        const user = await this.userRepository.findByUsername(requester);
        if (!user) throw new ForbiddenException();
        return this.s3Service.uploadToBucket(file, user);
    }


    createDocumentInstance() { }

    getDocument(documentId: string) {
        return this.s3Service.getFromBucket(documentId);
    }

    deleteDocument(fileName: string, requester: string) {
        return this.s3Service.deleteFromBucket(fileName);
    }
}
