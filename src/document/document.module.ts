import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { S3Service } from '../s3/s3.service';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from '../s3/s3.module';

@Module({
  providers: [DocumentService],
  imports: [S3Module],
  controllers: [DocumentController]
})
export class DocumentModule { }
