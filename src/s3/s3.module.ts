import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentRepository } from '../Entities/document.repository';
import { S3Service } from './s3.service';

@Module({
    imports: [ConfigModule],
    exports: [S3Service],
    providers: [S3Service, DocumentRepository],
})
export class S3Module { }
