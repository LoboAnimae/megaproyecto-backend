// import { faker } from '@faker-js/faker';
// import { User } from 'src/Entities/user.entity';
// // import { Document } from 'src/Entities/document.entity';
// // import { WorkGroup } from 'src/Entities/work_group.entity';
// // import { CommentType } from 'src/Entities/comment_type.entity';
// // import { Country } from 'src/Entities/country.entity';
// // import { County } from 'src/Entities/county.entity';
// // import { State } from 'src/Entities/state.entity';
// import * as bcrypt from 'bcrypt';
// // import { PortalRole } from 'src/Entities/portal_role.entity';
// // import { Institution } from 'src/Entities/institution.entity';
// // import { InstitutionType } from 'src/Entities/institution_type.entity';
// // import { Author } from 'src/Entities/author.entity';
// // import { Comment } from 'src/Entities/comment.entity';
// // import { DocumentActivityHistory } from 'src/Entities/documentActivityHistory.entity';
// // import { DocumentPermission } from 'src/Entities/document_permission.entity';
// // import { DocumentRole } from 'src/Entities/document_role.entity';
// // import { PortalPermission } from 'src/Entities/portal_permission.entity';
// // import { UserGroup } from 'src/Entities/user_group.entity';
// // import { UserWorkGroup } from 'src/Entities/user_work_group.entity';

// export function generateRandomEmail() {
//   const lastName = faker.random.alpha(3);
//   const randomNumber = '' + faker.random.numeric(5);
//   return lastName + randomNumber + '@uvg.edu.gt';
// }

// export function aggregate<T>(
//   repeat: number,
//   fn: (...args: any[]) => T,
//   ...args: any[]
// ): T[] {
//   const result: T[] = [];
//   for (let i = 0; i < repeat; i++) {
//     result.push(fn(...args));
//   }
//   return result;
// }

// export function generateRandomTime(maxId: number) {
//   const startTime = faker.date.recent();
//   const endTime = faker.date.soon();
//   const startedOnPage = parseInt(faker.random.numeric());
//   const endedOnPage = parseInt(faker.random.numeric());
//   const randomUnderMax = Math.floor(Math.random() * maxId);
//   if (startedOnPage < endedOnPage) {
//     return {
//       startTime,
//       endTime,
//       startedOnPage,
//       endedOnPage,
//       documentId: randomUnderMax,
//     };
//   }
//   return {
//     startTime,
//     endTime,
//     documentId: randomUnderMax,
//     startedOnPage: endedOnPage,
//     endedOnPage: startedOnPage,
//   };
// }

// export function randomWord() {
//   const {
//     adjective,
//     adverb,
//     conjunction,
//     interjection,
//     noun,
//     preposition,
//     verb,
//   } = faker.word;
//   const possibilities = [
//     adjective,
//     adverb,
//     conjunction,
//     interjection,
//     noun,
//     preposition,
//     verb,
//   ];
//   const randomIndex = Math.floor(Math.random() * possibilities.length);
//   return possibilities[randomIndex]();
// }

// export function generateParagraph(paragraphLength: number) {
//   let paragraph = '';
//   for (let i = 0; i < paragraphLength; i++) {
//     paragraph += randomWord() + ' ';
//   }
//   return paragraph;
// }

// export function getAllStates(forCountry: Country) {
//   return ['Guatemala'].map((state, i) => ({
//     id: i + 1,
//     name: state,
//     country: forCountry,
//   }));
// }

// export function getAllCounties(forState: State) {
//   return ['Ciudad de Guatemala'].map((state, i) => ({
//     id: i + 1,
//     name: state,
//     state: forState,
//   }));
// }

// // __________________________________________________________________________________________________________________________________________________________________________________________________________________

// export function generateAuthor(): Author {
//   const author = new Author();
//   author.name = faker.name.firstName();
//   author.lastName = faker.name.lastName();
//   return author;
// }

// export function generateComment(
//   withGroupDocument: WorkGroup,
//   asCommentType: CommentType,
//   fromUser: User,
// ): Comment {
//   const comment = new Comment();
//   const metadata = JSON.stringify({
//     text: generateParagraph(Math.random() * 32),
//     chapter: faker.random.numeric(2),
//   });

//   comment.commentType = asCommentType;
//   comment.groupDocument = withGroupDocument;
//   comment.metadata = metadata;
//   comment.user = fromUser;
//   return comment;
// }
// export function generateCommentType(): CommentType[] {
//   return ['comment', 'highlight'].map((name, i) => {
//     const commentType = new CommentType();
//     commentType.name = name;
//     return commentType;
//   });
// }
// export function generateCountries(): Country[] {
//   return [
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'Andorra',
//     'Angola',
//     'Antigua and Barbuda',
//     'Argentina',
//     'Armenia',
//     'Australia',
//     'Austria',
//     'Azerbaijan',
//     'Bahamas',
//     'Bahrain',
//     'Bangladesh',
//     'Barbados',
//     'Belarus',
//     'Belgium',
//     'Belize',
//     'Benin',
//     'Bhutan',
//     'Bolivia',
//     'Bosnia and Herzegovina',
//     'Botswana',
//     'Brazil',
//     'Brunei',
//     'Bulgaria',
//     'Burkina Faso',
//     'Burundi',
//     "Côte d'Ivoire",
//     'Cabo Verde',
//     'Cambodia',
//     'Cameroon',
//     'Canada',
//     'Central African Republic',
//     'Chad',
//     'Chile',
//     'China',
//     'Colombia',
//     'Comoros',
//     'Congo (Congo-Brazzaville)',
//     'Costa Rica',
//     'Croatia',
//     'Cuba',
//     'Cyprus',
//     'Czechia (Czech Republic)',
//     'Democratic Republic of the Congo',
//     'Denmark',
//     'Djibouti',
//     'Dominica',
//     'Dominican Republic',
//     'Ecuador',
//     'Egypt',
//     'El Salvador',
//     'Equatorial Guinea',
//     'Eritrea',
//     'Estonia',
//     'Eswatini (fmr. "Swaziland")',
//     'Ethiopia',
//     'Fiji',
//     'Finland',
//     'France',
//     'Gabon',
//     'Gambia',
//     'Georgia',
//     'Germany',
//     'Ghana',
//     'Greece',
//     'Grenada',
//     'Guatemala',
//     'Guinea',
//     'Guinea-Bissau',
//     'Guyana',
//     'Haiti',
//     'Holy See',
//     'Honduras',
//     'Hungary',
//     'Iceland',
//     'India',
//     'Indonesia',
//     'Iran',
//     'Iraq',
//     'Ireland',
//     'Israel',
//     'Italy',
//     'Jamaica',
//     'Japan',
//     'Jordan',
//     'Kazakhstan',
//     'Kenya',
//     'Kiribati',
//     'Kuwait',
//     'Kyrgyzstan',
//     'Laos',
//     'Latvia',
//     'Lebanon',
//     'Lesotho',
//     'Liberia',
//     'Libya',
//     'Liechtenstein',
//     'Lithuania',
//     'Luxembourg',
//     'Madagascar',
//     'Malawi',
//     'Malaysia',
//     'Maldives',
//     'Mali',
//     'Malta',
//     'Marshall Islands',
//     'Mauritania',
//     'Mauritius',
//     'Mexico',
//     'Micronesia',
//     'Moldova',
//     'Monaco',
//     'Mongolia',
//     'Montenegro',
//     'Morocco',
//     'Mozambique',
//     'Myanmar (formerly Burma)',
//     'Namibia',
//     'Nauru',
//     'Nepal',
//     'Netherlands',
//     'New Zealand',
//     'Nicaragua',
//     'Niger',
//     'Nigeria',
//     'North Korea',
//     'North Macedonia',
//     'Norway',
//     'Oman',
//     'Pakistan',
//     'Palau',
//     'Palestine State',
//     'Panama',
//     'Papua New Guinea',
//     'Paraguay',
//     'Peru',
//     'Philippines',
//     'Poland',
//     'Portugal',
//     'Qatar',
//     'Romania',
//     'Russia',
//     'Rwanda',
//     'Saint Kitts and Nevis',
//     'Saint Lucia',
//     'Saint Vincent and the Grenadines',
//     'Samoa',
//     'San Marino',
//     'Sao Tome and Principe',
//     'Saudi Arabia',
//     'Senegal',
//     'Serbia',
//     'Seychelles',
//     'Sierra Leone',
//     'Singapore',
//     'Slovakia',
//     'Slovenia',
//     'Solomon Islands',
//     'Somalia',
//     'South Africa',
//     'South Korea',
//     'South Sudan',
//     'Spain',
//     'Sri Lanka',
//     'Sudan',
//     'Suriname',
//     'Sweden',
//     'Switzerland',
//     'Syria',
//     'Tajikistan',
//     'Tanzania',
//     'Thailand',
//     'Timor-Leste',
//     'Togo',
//     'Tonga',
//     'Trinidad and Tobago',
//     'Tunisia',
//     'Turkey',
//     'Turkmenistan',
//     'Tuvalu',
//     'Uganda',
//     'Ukraine',
//     'United Arab Emirates',
//     'United Kingdom',
//     'United States of America',
//     'Uruguay',
//     'Uzbekistan',
//     'Vanuatu',
//     'Venezuela',
//     'Vietnam',
//     'Yemen',
//     'Zambia',
//     'Zimbabwe',
//   ].map((name) => {
//     const country = new Country();
//     country.name = name;
//     return country;
//   });
// }
// export function generateCounty(guatemala: State): County[] {
//   return ['Ciudad de Guatemala'].map((name) => {
//     const county = new County();
//     county.name = name;
//     county.state = guatemala;
//     return county;
//   });
// }
// export function generateDocument(fromAuthors: Author[]): Document {
//   const document = new Document();
//   const authors = [];
//   do {
//     const randomNumber = Math.floor(Math.random() * fromAuthors.length);
//     const author = fromAuthors[randomNumber];
//     if (authors.findIndex((a) => a.id === author.id) === -1) {
//       authors.push(author);
//     }
//   } while (Math.random() > 0.7);
//   const metadata = JSON.stringify({
//     publicationDate: faker.date.past(),
//     publisher: faker.company.name(),
//     isbn: faker.datatype.number(4),
//     edition: faker.datatype.number({ min: 1, max: 20 }),
//     pages: faker.datatype.number({ min: 15, max: 1500 }),
//     description: faker.lorem.paragraph(),
//   });
//   const uuid = faker.datatype.uuid();
//   const name = faker.company.bs();

//   document.metadata = metadata;
//   document.name = name;
//   document.uuid = uuid;
//   return document;
// }
// export function generateDocumentActivityHistory(
//   fromDocuments: Document[],
// ): DocumentActivityHistory {
//   const documentActivityHistory = new DocumentActivityHistory();
//   documentActivityHistory.document =
//     fromDocuments[Math.floor(Math.random() * fromDocuments.length)];
//   documentActivityHistory.startTime = faker.date.past();
//   documentActivityHistory.endTime = faker.date.recent();
//   return documentActivityHistory;
// }
// export function generateDocumentPermission(): DocumentPermission[] {
//   return ['read', 'write', 'delete'].map((name, i) => {
//     const documentPermission = new DocumentPermission();
//     documentPermission.name = name;
//     return documentPermission;
//   });
// }
// export function generateDocumentRole(): DocumentRole[] {
//   return ['default', 'admin', 'owner'].map((name) => {
//     const documentRole = new DocumentRole();
//     documentRole.name = name;
//     return documentRole;
//   });
// }
// export function generateInstitution(
//   inCounty: County[],
//   asType: InstitutionType[],
// ): Institution {
//   const institution = new Institution();
//   const randomCounty = inCounty[Math.floor(Math.random() * inCounty.length)];
//   institution.name = faker.company.companyName();
//   institution.county = randomCounty;
//   institution.institutionType =
//     asType[Math.floor(Math.random() * asType.length)];
//   return institution;
// }
// export function generateInstitutionType(): InstitutionType[] {
//   return ['University'].map((name) => {
//     const newInstitution = new InstitutionType();
//     newInstitution.name = name;
//     return newInstitution;
//   });
// }
// export function generatePortalPermission(): PortalPermission[] {
//   return [
//     'CHANGE ROLES',
//     'MANAGE DOCUMENTS',
//     'MANAGE USERS',
//     'MANAGE INSTITUTIONS',
//     'MANAGE DOCUMENT ROLES',
//   ].map((name) => {
//     const portalPermission = new PortalPermission();
//     portalPermission.name = name;
//     return portalPermission;
//   });
// }
// export function generatePortalRole(): PortalRole[] {
//   return ['default', 'teacher', 'superuser'].map((name) => {
//     const portalRole = new PortalRole();
//     portalRole.name = name;
//     return portalRole;
//   });
// }
// export function generateState(guatemala: Country): State[] {
//   return ['Guatemala'].map((name) => {
//     const state = new State();
//     state.country = guatemala;
//     state.name = name;
//     return state;
//   });
// }
// export async function generateUser(
//   withPortalRole: PortalRole,
//   withInsitution: Institution,
// ): Promise<User> {
//   const user = new User();
//   user.username = faker.internet.userName();
//   const password = faker.internet.password();
//   user.password = await bcrypt.hash(password, 1);
//   user.createdAt = faker.date.past();
//   user.updatedAt = faker.date.recent();
//   user.lastLogin = faker.date.recent();
//   user.sex = Math.random() > 0.5;
//   user.dateOfBirth = faker.date.birthdate({ min: 18, max: 30 }).toString();
//   user.portalRole = withPortalRole;
//   user.institution = withInsitution;
//   return user;
// }
// export function generateUserGroup(
//   outOfDocumentRoles: DocumentRole[],
//   fromUsers: User[],
//   fromGroup: WorkGroup[],
// ): UserGroup {
//   const randomDocumentRole =
//     outOfDocumentRoles[Math.floor(Math.random() * outOfDocumentRoles.length)];
//   const randomUser = fromUsers[Math.floor(Math.random() * fromUsers.length)];
//   const randomGroup = fromGroup[Math.floor(Math.random() * fromGroup.length)];

//   const userGroup = new UserGroup();

//   userGroup.documentRole = randomDocumentRole;
//   // userGroup.group = randomGroup;
//   // userGroup.users = randomUser;
//   return userGroup;
// }
// // export function generateUserWorkGroup(): UserWorkGroup {}
// // export function generateWorkGroup(): WorkGroup {}
