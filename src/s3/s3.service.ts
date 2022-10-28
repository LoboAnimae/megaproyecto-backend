import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
const AWS = require('aws-sdk');
import { v4 as uuid } from 'uuid';
import { Document } from '../Entities/document.entity';
import { User } from '../Entities/user.entity';
import { DocumentRepository } from '../Entities/document.repository';
@Injectable()
export class S3Service {
    private accessKeyId: string;
    private secretAccessKey: string;
    private bucketName: string;
    private region: string;
    private apiVersion: string;


    constructor(
        private configService: ConfigService,
        private documentRepository: DocumentRepository
    ) { }
    #getCredentials() {
        if (!this.accessKeyId) {
            this.accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        }
        if (!this.secretAccessKey) {
            this.secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        }
        return { accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey };
    }

    #getBucketName() {
        if (!this.bucketName) {
            this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        }

        return this.bucketName;
    }

    #getRegion() {
        if (!this.region) {
            this.region = this.configService.get('AWS_REGION');
        }
        return this.region;
    }

    #getApiVersion() {
        if (!this.apiVersion) {
            this.apiVersion = this.configService.get('AWS_API_VERSION');
        }
        return this.apiVersion;
    }

    #s3Factory() {
        const credentials = this.#getCredentials();
        const Bucket = this.#getBucketName();
        const region = this.#getRegion();
        const apiVersion = this.#getApiVersion();
        const params = { Bucket };
        AWS.config.update({ region, credentials });
        return new AWS.S3({ apiVersion, params });
    }
    async uploadToBucket(file: Express.Multer.File, fromUser: User) {
        const Bucket = this.#getBucketName();
        const s3Instance = this.#s3Factory();
        const documentUUID = uuid();
        const newDocument = new Document();
        newDocument.uuid = documentUUID;
        newDocument.name = file.originalname;

        const uploadedFile = await s3Instance.upload({ Bucket, Key: documentUUID, Body: file.buffer }).promise();
        const { Location: url } = uploadedFile;
        newDocument.path = url;
        newDocument.user = fromUser;
        await this.documentRepository.save(newDocument);
        return { fileId: newDocument.uuid };
    }

    async deleteFromBucket(Key: string) {
        const Bucket = this.#getBucketName();
        const s3Instance = this.#s3Factory();

        const deletedFile = await s3Instance.deleteObject({ Bucket, Key }).promise();
        if (deletedFile.$response.error) throw new InternalServerErrorException();
        return;
    }

    async getFromBucket(Key: string) {
        const Bucket = this.#getBucketName();
        const s3Instance = this.#s3Factory();
        return await s3Instance.getObject({ Bucket, Key }).promise();
    }
}
