import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { UsersRepository } from '../Entities/user.repository';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ISuccessResponse } from '../Interfaces/Responses.interface';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginCredentialsDto): Promise<{ accessToken: string; }> {
        const { username, password } = loginDto;
        const user = await this.usersRepository.findByUsername(username);
        if (user && (bcrypt.compare(password, user.password.toString()))) {
            const payload: JwtPayload = { username };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        };
        throw new ForbiddenException();
    }

    async register(registerDto: LoginCredentialsDto): Promise<{ accessToken: string; }> {
        const { username, password } = registerDto;
        if (await this.usersRepository.findByUsername(username)) {
            throw new ConflictException();
        }

        const user = new User();
        user.username = username;
        user.password = await bcrypt.hash(password, 10);
        user.sex = true;
        await this.usersRepository.save(user);
        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
