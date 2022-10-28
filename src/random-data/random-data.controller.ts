// import { Controller, Get } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Author } from 'src/Entities/author.entity';
// import { AuthorRepository } from 'src/Entities/author.repository';
// import { CommentTypeRepository } from 'src/Entities/comment_type.repository';
// import { Country } from 'src/Entities/country.entity';
// import { CountryRepository } from 'src/Entities/country.repository';
// import { CountyRepository } from 'src/Entities/county.repository';
// import { Document } from 'src/Entities/document.entity';
// import { DocumentRepository } from 'src/Entities/document.repository';
// import { DocumentPermissionRepository } from 'src/Entities/document_permission.repository';
// import { Institution } from 'src/Entities/institution.entity';
// import { PortalRole } from 'src/Entities/portal_role.entity';
// import { State } from 'src/Entities/state.entity';
// import { StateRepository } from 'src/Entities/state.repository';
// import { User } from 'src/Entities/user.entity';
// import { UsersRepository } from 'src/Entities/user.repository';
// import {
//   aggregate,
//   generateDocument,
//   generateDocumentPermissions,
//   generateRandomEmail,
//   generateRandomName,
//   generateRandomTime,
//   generateUser,
//   getAllCommentTypes,
//   getAllCounties,

import { Controller, Get, Param } from "@nestjs/common";
import { RandomDataService } from "./random-data.service";

//   getAllStates,
// } from '../Misc/FakerFunctions';

@Controller('random-data')
export class RandomDataController {
    constructor(
        private randomDataService: RandomDataService
    ) { }

    @Get('/:amount')
    generateData(@Param('amount') amount: number) {
        return this.randomDataService.generateData(amount);
    }
}
//   constructor(
//     private authorRepository: AuthorRepository,
//     private countryRepository: CountryRepository,
//     private commentTypeRepository: CommentTypeRepository,
//     private stateRepository: StateRepository,
//     private countyRepository: CountyRepository,
//     private userRepository: UsersRepository,
//     private documentRepository: DocumentRepository,
//     private documentPermissionsRepository: DocumentPermissionRepository,
//   ) {}

//   async setTerminals(amountOfEach: number, aggregateInto: any = {}) {
//     const authors = aggregate(amountOfEach, generateRandomName);
//     const allCommentTypes = getAllCommentTypes();
//     const allCountries = getAllCountries();
//     const documentPermissions = generateDocumentPermissions();

//     const authorModels = await this.authorRepository.save(authors);
//     const commentTypeModels = await this.commentTypeRepository.save(
//       allCommentTypes,
//     );
//     const countryModels = await this.countryRepository.save(allCountries);
//     const documentPermissionModels =
//       await this.documentPermissionsRepository.save(documentPermissions);

//     aggregateInto.authors = authorModels;
//     aggregateInto.commentTypes = commentTypeModels;
//     aggregateInto.countries = countryModels;
//     aggregateInto.documentPermissions = documentPermissionModels;
//   }

//   async generateDocuments(
//     amountOfEach: number,
//     authors: Author[],
//     aggregateInto: any,
//   ) {
//     const documents = aggregate(amountOfEach, generateDocument, authors);
//     const documentModels = await this.documentRepository.save(documents);
//     aggregateInto.documents = documentModels;
//   }

//   async setState(countries: Country[], aggregateInto: any) {
//     const guatemala = countries.find((country) => country.name === 'Guatemala');
//     const states = getAllStates(guatemala);
//     const stateModels = await this.stateRepository.save(states);
//     aggregateInto.states = stateModels;
//   }

//   async setCounty(states: State[], aggregateInto: any) {
//     const guatemala = states.find((state) => state.name === 'Guatemala');
//     const counties = getAllCounties(guatemala);
//     const countyModels = await this.countyRepository.save(counties);
//     aggregateInto.counties = countyModels;
//   }

//   async createComments(fromUsers: User[]) {}

//   async createUsers(
//     amount: number,
//     withRole: PortalRole,
//     withInstitutions: Institution[],
//   ) {
//     const generatedUsers = aggregate(
//       amount,
//       generateUser,
//       withRole,
//       withInstitutions[0],
//     );

//     // const users = await this.userRepository.save(generatedUsers);
//   }
//   async createWorkGroup() {}
//   async createUserWorkGroup() {}

//   async save(models: any) {
//     await this.authorRepository.save(models.authors);
//     await this.commentTypeRepository.save(models.commentTypes);
//     await this.countryRepository.save(models.countries);
//     await this.documentPermissionsRepository.save(models.documentPermissions);
//     await this.documentRepository.save(models.documents);
//     await this.stateRepository.save(models.states);
//     await this.countyRepository.save(models.counties);
//   }

//   @Get()
//   async generateData() {
//     /*
//     comment
//     document_activity_history
//     document_role
//     institution
//     institution_type
//     portal_permission
//     portal_role
//     user
//     user_group
//     user_work_group
//     work_group
//     */

//     //#region Terminals
//     const terminalAmount = 10_000;
//     const models: any = {};
//     await this.setTerminals(terminalAmount, models);
//     await this.generateDocuments(terminalAmount, models.authors, models);
//     await this.setState(models.countries, models);
//     await this.setCounty(models.states, models);
//     return true;

//     // Promise.all([
//     //   this.authorRepository.save(newAuthorNames),
//     //   this.commentTypeRepository.save(newCommentTypes),
//     //   this.countryRepository.save(newCountries),
//     // ]).then(([newAuthorModels, newCommentTypeModels, newCountries]) => {
//     //   // State
//     //   this.countryRepository
//     //     .findOne({ where: { name: 'Guatemala' } })
//     //     .then((guatemala) => {});
//     // });

//     // aggregate(terminalAmount, generateRandomName);

//     // // Authors
//     // aggregate(terminalAmount, generateRandomName).then((authors) => {
//     //   this.authorRepository.save(authors);
//     // });

//     // // Countries
//     // getAllCountries().then((countries) => {
//     //   this.countryRepository.save(countries).then(() => {
//     //     this.countryRepository
//     //       .findOne({ where: { name: 'Guatemala' } })
//     //       .then((guatemala) => {
//     //         getAllStates(guatemala).then((state) => {
//     //           this.stateRepository.save(state).then(() => {
//     //             this.stateRepository
//     //               .findOne({ where: { name: 'Guatemala' } })
//     //               .then((guatemala) => {
//     //                 getAllCounties(guatemala).then((counties) => {
//     //                   this.countyRepository.save(counties);
//     //                 });
//     //               });
//     //           });
//     //         });
//     //       });
//     //   });
//     // });

//     // Promise.all([
//     //   aggregate(terminalAmount, generateUser),
//     //   aggregate(terminalAmount, generateDocument),
//     // ]).then(([newUsers, newDocuments]) => {
//     //   Promise.all([
//     //     this.userRepository.save(newUsers),
//     //     this.documentRepository.save(newDocuments),
//     //   ]).then(([newUserModels, newDocumentModels]) => {});
//     // });

//     return true;
//     //#endregion
//   }
// }
