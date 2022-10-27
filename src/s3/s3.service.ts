import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
const AWS = require('aws-sdk');
@Injectable()
export class S3Service {
    private accessKeyId: string;
    private secretAccessKey: string;
    private bucketName: string;
    private region: string;
    private apiVersion: string;


    constructor(
        private configService: ConfigService
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
    async uploadToBucket(Key: string, file: Express.Multer.File) {
        const Bucket = this.#getBucketName();
        const s3Instance = this.#s3Factory();

        const uploadedFile = await s3Instance.upload({ Bucket, Key, Body: file.buffer }).promise();
        const { Location: url } = uploadedFile;
        const filePath = Key;
        const fileType = Key.split('.').pop();
        return { url, filePath, fileType };
    }

    async deleteFromBucket(Key: string) {
        const Bucket = this.#getBucketName();
        const s3Instance = this.#s3Factory();

        const deletedFile = await s3Instance.deleteObject({ Bucket, Key }).promise();
        if (deletedFile.$response.error) throw new InternalServerErrorException();
        return;
    }
}
