import {
    ConflictException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import {User} from '../Entities/user.entity';
import {UsersRepository} from '../Entities/user.repository';
import {
    LoginCredentialsDto,
    RegistrationParamsDto,
} from './dto';
import * as bcrypt from 'bcrypt';
import {JwtPayload} from './jwt-payload.interface';
import {JwtService} from '@nestjs/jwt';
import {IAuthenticationResponse} from './Responses/Responses';
import {RoleRepository} from '../Entities/role.repository';
import {InstitutionRepository} from '../Entities/institution.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private roleRepository: RoleRepository,
        private institutionRepository: InstitutionRepository,
    ) {
    }

    async login(loginDto: LoginCredentialsDto): Promise<IAuthenticationResponse> {
        const {username, password} = loginDto;
        const user = await this.usersRepository.findByUsername(username, {
            relations: ['role', 'documents', 'institution'],
            relationLoadStrategy: 'join',
        });
        if (user && await bcrypt.compare(password, user.password.toString())) {
            const payload: JwtPayload = {username};
            const token = this.jwtService.sign(payload);
            const metadata = user.metadata;
            const role = (await this.usersRepository.getUserRole(user)).name;
            const institution = (await this.usersRepository.getUserInstitution(user)).name;
            const documents = (await this.usersRepository.getUserDocuments(user) || []).map(doc => ({
                name: doc.name,
                uuid: doc.uuid,
            }));
            return {token, userInformation: {username, ...metadata, role, documents, institution}};
        }
        throw new ForbiddenException();
    }

    async register(
        registerDto: RegistrationParamsDto,
    ): Promise<IAuthenticationResponse> {
        const {password: rawPassword, username, ...metadata} = registerDto;
        if (await this.usersRepository.findByUsername(username)) {
            throw new ConflictException();
        }
        const [studentRole, institution] = await Promise.all([
            this.roleRepository.findOne({where: {name: 'student'}}),
            this.institutionRepository.findOne({where: {name: 'Universidad del Valle de Guatemala'}}),
        ]);
        const newUser = new User();
        newUser.username = username;
        newUser.password = await bcrypt.hash(rawPassword, 10);
        newUser.metadata = metadata;
        newUser.role = studentRole;
        newUser.institution = institution;
        await this.usersRepository.save(newUser);
        const payload: JwtPayload = {username};
        const token = this.jwtService.sign(payload);
        return {
            token,
            userInformation: {
                username, ...metadata,
                role: studentRole.name,
                institution: institution.name,
                documents: [],
            },
        };
    }


}
