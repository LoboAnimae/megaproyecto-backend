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
import {IAuthenticationResponse} from "./Responses/Responses";

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {
    }

    async login(loginDto: LoginCredentialsDto): Promise<IAuthenticationResponse> {
        const {username, password} = loginDto;
        const user = await this.usersRepository.findByUsername(username, {
            relations: ['role', 'documents'],
            relationLoadStrategy: 'join'
        });
        const passwordsMatch = await bcrypt.compare(password, user.password.toString())
        if (user && passwordsMatch) {
            const payload: JwtPayload = {username};
            const token = this.jwtService.sign(payload);
            const metadata = user.metadata;
            const role = user.role?.name;
            const documents = user.documents || []
            return {token, userInformation: {username, ...metadata, role, documents}};
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

        const newUser = new User();
        newUser.username = username;
        newUser.password = await bcrypt.hash(rawPassword, 10);
        newUser.metadata = metadata;
        await this.usersRepository.save(newUser);
        const payload: JwtPayload = {username};
        const token = this.jwtService.sign(payload);
        return {token, userInformation: {username, ...metadata}};

    }


}
