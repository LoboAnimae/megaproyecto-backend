import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {DocumentRepository} from '../Entities/document.repository';
import {UsersRepository} from '../Entities/user.repository';
import {S3Module} from '../s3/s3.module';
import {DocumentController} from './document.controller';
import {DocumentService} from './document.service';
import {RoleService} from "../role/role.service";
import {RoleRepository} from "../Entities/role.repository";

@Module({
    providers: [DocumentService, DocumentRepository, UsersRepository, RoleService, RoleRepository],
    imports: [S3Module, JwtModule, ],
    exports: [DocumentRepository],
    controllers: [DocumentController,]
})
export class DocumentModule {
}
