import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { UsersRepository } from '../Entities/user.repository';
import {
  LoginCredentialsDto,
  RegistrationParamsDto,
} from './dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ISuccessResponse } from '../Interfaces/Responses.interface';
// import { InstitutionRepository } from '../Entities/institution.repository';
// import { PortalRoleRepository } from '../Entities/portal_role.repository';
@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    // private institutionRepository: InstitutionRepository,
    // private portalRoleRepository: PortalRoleRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findByUsername(username);
    if (user && bcrypt.compare(password, user.password.toString())) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new ForbiddenException();
  }

  async register(
    registerDto: RegistrationParamsDto,
  ): Promise<{ accessToken: string }> {
    const {password: rawPassword, username} = registerDto
    if (await this.usersRepository.findByUsername(username)) {
        throw new ConflictException();
    }
    
    const newUser = new User();
    newUser.username = username;
    newUser.password = await bcrypt.hash(rawPassword, 10);
    await this.usersRepository.save(newUser);
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };

  }

}
