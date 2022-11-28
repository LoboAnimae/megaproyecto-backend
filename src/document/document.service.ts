import {ForbiddenException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {UsersRepository} from '../Entities/user.repository';
import {S3Service} from '../s3/s3.service';
import {DocumentCreateDto} from './dto';
import {RoleService} from "../role/role.service";
import {ROLES} from "../Entities/role.entity";
import {RoleRepository} from "../Entities/role.repository";
import {DataSource} from "typeorm";
import {Document} from "../Entities/document.entity";
import {v4 as uuid} from 'uuid'

@Injectable()
export class DocumentService {
    constructor(
        private s3Service: S3Service,
        private userRepository: UsersRepository,
        private roleService: RoleService,
        private roleRepository: RoleRepository,
        private dataSource: DataSource
    ) {
    }

    async #protect(requester: string, forbiddenRole: ROLES, relations?: any) {
        // @ts-ignore
        const user = await this.userRepository.findByUsername(requester, {relations});
        if (!user || this.roleRepository.hasRole(user, forbiddenRole)) throw new ForbiddenException();
        return user;
    }

    /**
     * Creates a persistent document in a bucket.
     */
    async createDocument(documentCreateDto: DocumentCreateDto) {
        // Check if the user requesting the document creation is allowed to do so
        const requester = documentCreateDto.requester;
        const user = await this.#protect(requester, ROLES.STUDENT, ['role']);
        const file = documentCreateDto.file;
        file.filename = uuid().replaceAll('-', '');
        let result = undefined;
        const queryRunner = this.dataSource.createQueryRunner()
        try {
            await queryRunner.startTransaction()
            // result = await this.s3Service.uploadToBucket(file, user);
            result = {
                path: "/some/example/bucket/path/" + file.filename,
                identifier: file.filename,
                name: documentCreateDto.documentName
            }
            const newDocument = new Document()
            newDocument.name = documentCreateDto.documentName;
            newDocument.user = user;
            newDocument.path = result.path;
            newDocument.data = ''
            newDocument.uuid = file.filename;
            await queryRunner.manager.save(newDocument);
            await queryRunner.commitTransaction()
            await queryRunner.release();
            return {uuid: result.identifier, name: result.name};
        } catch (e) {
            await queryRunner.rollbackTransaction()
            await queryRunner.release();
            throw new InternalServerErrorException("There seems to be a problem with our storage system. Sorry for the inconvenience :)")
        }

    }


    // createDocumentInstance() {
    // }
    //
    // async changeUserRoleInDocument(documentId: number, userId: number, newRole: Role) {
    // }
    //
    // async registerUserToDocument(documentId: number, userId: number) {
    // }

    async getDocument(documentUUID: string, requester: string) {
        await this.#protect(requester, ROLES.STUDENT, ['role']);
        try {
            return await this.s3Service.getFromBucket(documentUUID);
        } catch (e) {
            throw new InternalServerErrorException("Storage is down. We're sorry for the inconvenience :)")
        }
    }

    async deleteDocument(fileName: string, requester: string) {
        await this.#protect(requester, ROLES.ADMIN)
        try {
            return this.s3Service.deleteFromBucket(fileName);
        } catch (e) {
            throw new InternalServerErrorException("Storage is down. We're sorry for the inconvenience :)")
        }
    }
}
