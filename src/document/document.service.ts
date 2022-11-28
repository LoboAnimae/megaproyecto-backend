import {ForbiddenException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {UsersRepository} from '../Entities/user.repository';
import {S3Service} from '../s3/s3.service';
import {DocumentCreateDto} from './dto';
import {RoleService} from '../role/role.service';
import {ROLES} from '../Entities/role.entity';
import {RoleRepository} from '../Entities/role.repository';
import {DataSource} from 'typeorm';
import {Document} from '../Entities/document.entity';
import {v4 as uuid} from 'uuid';
import {DocumentRepository} from '../Entities/document.repository';
import {Group} from '../Entities/group.entity';
import {UserGroup} from '../Entities/user_group.entity';
import {DocumentInstanceCreateDto} from './dto/document-instance-create.dto';
import {DocumentOperationDto} from './dto/document-operation.dto';
import {UserGroupRepository} from '../Entities/user_group.repository';
import {AddCommentDto} from './dto/add-comment.dto';
import {GroupRepository} from '../Entities/group.repository';
import {Comment} from '../Entities/comment.entity';
import {CommentRepository} from '../Entities/comment.repository';

@Injectable()
export class DocumentService {
    constructor(
        private s3Service: S3Service,
        private userRepository: UsersRepository,
        private roleService: RoleService,
        private roleRepository: RoleRepository,
        private dataSource: DataSource,
        private documentRepository: DocumentRepository,
        private userGroupRepository: UserGroupRepository,
        private groupRepository: GroupRepository,
        private commentRepository: CommentRepository,
    ) {
    }

    async #protect(requester: string, forbiddenRole: ROLES, options?: { allowPassThrough?: boolean, relations?: string[] }) {
        const user = await this.userRepository.findByUsername(requester, {relations: [...options?.relations, 'role']});
        if (!user || this.roleRepository.hasRole(user, forbiddenRole)) {
            if (!options.allowPassThrough) throw new ForbiddenException();
            return null;
        }
        return user;
    }

    /**
     * Creates a persistent document in a bucket.
     */
    async createDocument(documentCreateDto: DocumentCreateDto) {
        // Check if the user requesting the document creation is allowed to do so
        const requester = documentCreateDto.requester;
        const user = await this.#protect(requester, ROLES.STUDENT, {relations: ['role']});
        const file = documentCreateDto.file;
        file.filename = uuid().replaceAll('-', '');
        let result = undefined;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            // result = await this.s3Service.uploadToBucket(file, user);
            result = {
                path: '/some/example/bucket/path/' + file.filename,
                identifier: file.filename,
                name: documentCreateDto.documentName,
            };
            const newDocument = new Document();
            newDocument.name = documentCreateDto.documentName;
            newDocument.user = user;
            newDocument.path = result.path;
            newDocument.data = '';
            newDocument.uuid = file.filename;
            await queryRunner.manager.save(newDocument);
            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new InternalServerErrorException('There seems to be a problem with our storage system. Sorry for the inconvenience :)');
        }
        return {uuid: result.identifier, name: result.name};

    }


    // createDocumentInstance() {
    // }
    //
    // async changeUserRoleInDocument(documentId: number, userId: number, newRole: Role) {
    // }
    //
    // async registerUserToDocument(documentId: number, userId: number) {
    // }

    async getDocument(documentOperationDto: DocumentOperationDto) {
        await this.#protect(documentOperationDto.requester, ROLES.STUDENT, {relations: ['role']});
        const foundDocument = await this.documentRepository.findOneByUUID(documentOperationDto.documentUUID);
        if (!foundDocument) throw new NotFoundException();
        try {
            return await this.s3Service.getFromBucket(foundDocument.path);
        } catch (e) {
            throw new InternalServerErrorException('Storage is down. We\'re sorry for the inconvenience :)');
        }
    }

    async deleteDocument(documentOperationDto: DocumentOperationDto) {
        const user = await this.#protect(documentOperationDto.requester, ROLES.ADMIN, {
            allowPassThrough: true,
            relations: ['documents'],
        });
        if ((user.documents).findIndex(document => document.uuid === documentOperationDto.documentUUID) === -1) throw new ForbiddenException();
        try {
            await this.documentRepository.deleteModel({uuid: documentOperationDto.documentUUID});
            // await this.s3Service.deleteFromBucket(documentUUID);
        } catch (e) {
            new InternalServerErrorException('Storage is down. We\'re sorry for the inconvenience :)');
        }

        return true;
    }

    async createDocumentInstance(documentOperationDto: DocumentOperationDto, documentInstanceCreateDto: DocumentInstanceCreateDto) {
        const user = await this.#protect(documentOperationDto.requester, ROLES.STUDENT, {
            allowPassThrough: true,
            relations: ['documents'],
        });
        const document = user?.documents?.find(document => document.uuid === documentOperationDto.documentUUID);
        if (!user || !document) throw new ForbiddenException();

        return await this.dataSource.transaction(async (manager) => {
                const newGroupInstance = new Group();
                newGroupInstance.name = documentInstanceCreateDto.instanceName;
                newGroupInstance.groupColor = documentInstanceCreateDto.color;
                newGroupInstance.associatedDocument = document;
                newGroupInstance.owner = user;
                newGroupInstance.uuid = uuid();
                const newGroupModel = await manager.save(newGroupInstance);

                const newUserGroup = new UserGroup();
                newUserGroup.associatedUser = user;
                newUserGroup.studentColor = documentInstanceCreateDto.color;
                newUserGroup.associatedGroup = newGroupModel;
                newUserGroup.role = await this.roleRepository.findOne({where: {name: ROLES.SUPERUSER}});
                newUserGroup.uuid = uuid();
                await manager.save(newUserGroup);
                return {instanceId: newGroupModel.uuid, userGroupId: newUserGroup.uuid};
            },
        );
    }

    async addComment(addCommentDto: AddCommentDto) {
        const user = await this.userRepository.findByUsername(addCommentDto.requester, {relations: ['partOf', 'userGroups']});
        // const document = await this.documentRepository.findOneByUUID(addCommentDto.documentUUID);
        // const group = user.userGroups.find(group => group.uuid === addCommentDto.groupUUID);
        const group = await this.userGroupRepository.findByUUID(addCommentDto.groupUUID, {relations: ['associatedGroup']});

        const newComment = new Comment();
        newComment.contents = addCommentDto.contents;
        newComment.commentCreator = user;
        newComment.forDocumentInstance = group.associatedGroup;
        newComment.fromCharacter = addCommentDto.fromCharacter;
        newComment.toCharacter = addCommentDto.toCharacter;
        await this.commentRepository.save(newComment);
        return true;


        // if (
        //     !user ||
        //     !document ||
        //
        // ) throw new ForbiddenException();

    }
}
