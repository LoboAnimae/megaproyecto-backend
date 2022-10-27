import { Module } from '@nestjs/common';
import { RandomDataService } from './random-data.service';
// import { RandomDataController } from './random-data.controller';
// import { AuthorRepository } from 'src/Entities/author.repository';
// import { CommentTypeRepository } from 'src/Entities/comment_type.repository';
// import { CommentRepository } from 'src/Entities/comment.repository';
// import { CountryRepository } from 'src/Entities/country.repository';
// import { CountyRepository } from 'src/Entities/county.repository';
// import { DocumentPermissionRepository } from 'src/Entities/document_permission.repository';
// import { DocumentRoleRepository } from 'src/Entities/document_role.repository';
// import { DocumentRepository } from 'src/Entities/document.repository';
// import { DocumentActivityHistoryRepository } from 'src/Entities/documentActivityHistory.repository';
// import { InstitutionTypeRepository } from 'src/Entities/institution_type.repository';
// import { InstitutionRepository } from 'src/Entities/institution.repository';
// import { PortalPermissionRepository } from 'src/Entities/portal_permission.repository';
// import { PortalRoleRepository } from 'src/Entities/portal_role.repository';
// import { StateRepository } from 'src/Entities/state.repository';
// import { UserGroupRepository } from 'src/Entities/user_group.repository';
// import { UserWorkGroupRepository } from 'src/Entities/user_work_group.repository';
import { UsersRepository } from 'src/Entities/user.repository';
// import { WorkGroupRepository } from 'src/Entities/work_group.repository';

@Module({
  providers: [
    RandomDataService,
    // AuthorRepository,
    // CommentTypeRepository,
    // CommentRepository,
    // CountryRepository,
    // CountyRepository,
    // DocumentPermissionRepository,
    // DocumentRoleRepository,
    // DocumentRepository,
    // DocumentActivityHistoryRepository,
    // InstitutionTypeRepository,
    // InstitutionRepository,
    // PortalPermissionRepository,
    // PortalRoleRepository,
    // StateRepository,
    // UserGroupRepository,
    // UserWorkGroupRepository,
    UsersRepository,
    // WorkGroupRepository,
  ],
  controllers: [
    /*RandomDataController*/
  ],
})
export class RandomDataModule {}
