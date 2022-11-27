import {ForbiddenException, Injectable} from '@nestjs/common';
import {UsersRepository} from '../Entities/user.repository';
import {S3Service} from '../s3/s3.service';
import {DocumentCreateDto} from './dto';
import {RoleService} from "../role/role.service";
import {ROLES} from "../Entities/role.entity";
import {RoleRepository} from "../Entities/role.repository";


@Injectable()
export class DocumentService {
    constructor(
        private s3Service: S3Service,
        private userRepository: UsersRepository,
        private roleService: RoleService,
        private roleRepository: RoleRepository,
    ) {
    }

    /**
     * Creates a persistent document in a bucket.
     */
    async createDocument(documentCreateDto: DocumentCreateDto) {
        // Check if the user requesting the document creation is allowed to do so
        const requester = documentCreateDto.requester;
        const user = await this.userRepository.findByUsername(requester, {loadEagerRelations: true});
        if (this.roleRepository.hasRole(user, ROLES.STUDENT)) throw new ForbiddenException();
        const file = documentCreateDto.file;
        if (!user) throw new ForbiddenException();
        return this.s3Service.uploadToBucket(file, user);
    }


    // createDocumentInstance() {
    // }
    //
    // async changeUserRoleInDocument(documentId: number, userId: number, newRole: Role) {
    // }
    //
    // async registerUserToDocument(documentId: number, userId: number) {
    // }

    getDocument(documentId: string) {
        return this.s3Service.getFromBucket(documentId);
    }

    deleteDocument(fileName: string, _requester: string) {
        return this.s3Service.deleteFromBucket(fileName);
    }
}
