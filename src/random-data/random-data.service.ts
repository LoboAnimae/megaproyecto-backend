import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { DataSource } from 'typeorm';
import { Comment } from '../Entities/comment.entity';
import { Country } from '../Entities/country.entity';
import { CountryRepository } from '../Entities/country.repository';
import { County } from '../Entities/county.entity';
import { Document } from '../Entities/document.entity';
import { Group } from '../Entities/group.entity';
import { Institution } from '../Entities/institution.entity';
import { Role } from '../Entities/role.entity';
import { Session } from '../Entities/session.entity';
import { State } from '../Entities/state.entity';
import { User } from '../Entities/user.entity';
import { UserGroup } from '../Entities/user_group.enity';
import { Countries } from '../metadata';

@Injectable()
export class RandomDataService {
    constructor(
        private countryRepository: CountryRepository,
        private dataSource: DataSource
    ) { }

    deleteFactory(entity: any) {
        return this.dataSource
            .createQueryBuilder()
            .delete()
            .from(entity);
    }


    async cleanup() {
        console.time('Cleanup');
        const countyDeleter = this.deleteFactory(County);
        const stateDeleter = this.deleteFactory(State);
        const countryDeleter = this.deleteFactory(Country);
        const institutionDeleter = this.deleteFactory(Institution);
        const userDeleter = this.deleteFactory(User);
        const roleDeleter = this.deleteFactory(Role);
        const documentDeleter = this.deleteFactory(Document);
        const groupDeleter = this.deleteFactory(Group);
        const userGroupDeleter = this.deleteFactory(UserGroup);
        const sessionDeleter = this.deleteFactory(Session);


        const deleters = [[sessionDeleter], [userGroupDeleter], [groupDeleter], [documentDeleter], [userDeleter], [institutionDeleter, roleDeleter], [countyDeleter], [stateDeleter], [countryDeleter],];
        for (const deleter of deleters) {
            await Promise.all(deleter.map(d => d.execute()));
        }
        console.timeEnd('Cleanup');
        return true;
    }

    async generateCountries(): Promise<Country[]> {
        console.time('Countries');
        const countries = Countries.map(name => {
            const country = new Country();
            country.name = name;
            country.states = [];
            return this.countryRepository.create(country);
        });
        console.timeEnd('Countries');
        return this.countryRepository.save(countries);
    }

    async generateStates(countries: Country[]): Promise<State[]> {
        console.time('States');
        const states = ['Guatemala']
            .map(name => {
                const guatemala = countries.find(c => c.name === 'Guatemala');
                const state = new State();
                state.name = name;
                state.country = guatemala;
                state.counties = [];
                return state;
            });
        console.timeEnd('States');

        return this.dataSource.getRepository(State).save(states);
    }

    async generateCounties(states: State[]): Promise<County[]> {
        console.time('Counties');
        const counties = ['Ciudad de Guatemala']
            .map(name => {
                const county = new County();
                county.name = name;
                county.state = states.find(s => s.name === 'Guatemala');
                return county;
            });
        console.timeEnd('Counties');
        return this.dataSource.getRepository(County).save(counties);
    }

    async generateInstitutions(amount: number, counties: County[]): Promise<Institution[]> {
        console.time('Institutions');
        const institutions: Institution[] = [];
        for (let i = 0; i < amount; i++) {
            const institution = new Institution();
            institution.name = faker.company.name();
            institution.county = counties[Math.floor(Math.random() * counties.length)];
            institutions.push(institution);
        }
        console.timeEnd('Institutions');
        return this.dataSource.getRepository(Institution).save(institutions);
    }

    randomEmail() {
        const randomLetters = faker.random.alpha({ count: 3, casing: 'lower' });
        const randomNumbers = faker.datatype.number({ min: 16_000, max: 23_000 });
        return `${randomLetters}${randomNumbers}@uvg.edu.gt`;
    }

    async generateRoles() {
        console.time('Roles');
        const roles = ['Default', 'Teacher', 'Institution Admin', 'Institution Owner', 'Super User']
            .map(name => {
                const role = new Role();
                role.name = name;
                return role;
            });

        console.timeEnd('Roles');
        return this.dataSource.getRepository(Role).save(roles);
    }

    async generateUsersConcurrent(amount: number, institutions: Institution[], role: Role[]) {
        console.time('Users');
        const usersPromises: Promise<User>[] = [];
        const newUser = async () => {
            const user = new User();
            user.username = this.randomEmail();
            user.institution = institutions[Math.floor(Math.random() * institutions.length)];
            user.password = await bcrypt.hash('123456', 1);
            user.role = role[Math.floor(Math.random() * role.length)];
            return user;
        };
        for (let i = 0; i < amount; i++) {
            usersPromises.push(newUser());
        }
        const users = await Promise.all(usersPromises);
        console.timeEnd('Users');
        return this.dataSource.getRepository(User).save(users);
    }


    async generateDocuments(amount: number, users: User[]) {
        console.time('Documents');
        const documents: Document[] = [];
        const teachers = users.filter(u => u.role.name === 'Teacher');

        const generateDocumentData = () => {
            const data: any = {};
            data.pages = faker.datatype.number({ min: 1, max: 10 });
            data.edition = faker.datatype.number({ min: 1, max: 10 });
            data.year = faker.datatype.number({ min: 1965, max: 2020 });
            data.isbn = faker.datatype.number({ min: 1000000000000, max: 9999999999999 });
            data.publisher = faker.company.name();
            return data;
        };
        for (let i = 0; i < amount; i++) {
            const document = new Document();
            document.data = generateDocumentData();
            document.name = faker.commerce.productName();
            document.path = faker.system.filePath();
            document.user = teachers[Math.floor(Math.random() * teachers.length)];
            document.uuid = faker.datatype.uuid();
            documents.push(document);
        }

        console.timeEnd('Documents');
        return this.dataSource.getRepository(Document).save(documents);
    }

    async generateGroups(amount: number, users: User[], documents: Document[]): Promise<[Group[], UserGroup[]]> {
        console.time('Groups');
        const groupsRaw: Group[] = [];
        for (let i = 0; i < amount; i++) {
            const group = new Group();
            group.name = faker.commerce.productName();
            group.associatedDocument = documents[Math.floor(Math.random() * documents.length)];
            group.groupColor = faker.internet.color().replace('#', '');
            groupsRaw.push(group);
        }


        console.timeEnd('Groups');
        const groups = await this.dataSource.getRepository(Group).save(groupsRaw);
        console.time('UserGroups');
        const UserGroups: UserGroup[] = [];
        for (let i = 0; i < amount; i++) {
            const userGroup = new UserGroup();
            userGroup.associatedGroup = groups[Math.floor(Math.random() * groups.length)];
            userGroup.associatedUser = users[Math.floor(Math.random() * users.length)];
            userGroup.studentColor = faker.internet.color().replace('#', '');
            UserGroups.push(userGroup);
        }
        console.timeEnd('UserGroups');
        return [groups, await this.dataSource.getRepository(UserGroup).save(UserGroups)];
    }

    async generateSessions(amount: number, users: User[], groups: Group[]) {
        console.time('Sessions');
        const sessions: Session[] = [];
        for (let i = 0; i < amount; i++) {
            const session = new Session();
            session.commentsLeft = faker.datatype.number({ min: 0, max: 100 });
            session.startTime = faker.date.recent();
            const date = moment(session.startTime);
            const extraMinutes = faker.datatype.number({ min: 5, max: 256 });
            const unit = 'minutes';
            const afterTime = date.add(extraMinutes, unit).toDate();
            session.endTime = afterTime;
            // session.endTime = faker.date.recent();

            const startingWord = faker.datatype.number({ min: 0, max: 100000 });
            const endingWord = faker.datatype.number({ min: startingWord, max: startingWord + 100000 });
            session.startWord = startingWord;
            session.endWord = endingWord;
            session.fromGroup = groups[Math.floor(Math.random() * groups.length)];
            session.user = users[Math.floor(Math.random() * users.length)];
            sessions.push(session);
        }
        console.timeEnd('Sessions');
        return this.dataSource.getRepository(Session).save(sessions);
    }

    async generateComments(amount: number, users: User[], sessions: Session[]) {
        const comments: Comment[] = [];
        for (let i = 0; i < amount; i++) { 
            const comment = new Comment();
        }

        return this.dataSource.getRepository(Comment).save(comments);
    }



    async generateData(amount: number) {
        // Generate the users first
        await this.cleanup();
        const countries = await this.generateCountries();
        const states = await this.generateStates(countries);
        const counties = await this.generateCounties(states);
        const institutions = await this.generateInstitutions(amount, counties);
        // await this.generateInstitutionsConcurrent(amount, counties);
        const roles = await this.generateRoles();
        // const users = await this.generateUsers(amount, institutions, roles);
        const users = await this.generateUsersConcurrent(amount, institutions, roles);
        const documents = await this.generateDocuments(amount, users);
        const [groups, userGroups] = await this.generateGroups(amount, users, documents);
        const sessions = await this.generateSessions(amount, users, groups);

        return true;
    }
}
