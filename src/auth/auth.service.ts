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
} from './dto/login-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ISuccessResponse } from '../Interfaces/Responses.interface';
import { InstitutionRepository } from '../Entities/institution.repository';
import { PortalRoleRepository } from '../Entities/portal_role.repository';
@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private institutionRepository: InstitutionRepository,
    private portalRoleRepository: PortalRoleRepository,
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
    const {
      username,
      password,
      dateOfBirth,
      institutionId,
      portalRoleId,
      sex,
    } = registerDto;
    if (await this.usersRepository.findByUsername(username)) {
      throw new ConflictException();
    }

    const existingUserPromise = this.usersRepository.findByUsername(username);
    const institutionPromise =
      this.institutionRepository.findById(institutionId);
    const rolePromise = this.portalRoleRepository.findById(portalRoleId);

    const [
      userExists,
      institution,
      role = await this.portalRoleRepository.findByName('student'),
    ] = await Promise.all([
      existingUserPromise,
      institutionPromise,
      rolePromise,
    ]);

    if (userExists) {
      throw new ConflictException();
    } else if (!institution) {
      throw new NotFoundException('Institution not found');
    } else if (!role) {
      throw new NotFoundException('Role not found');
    }

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.sex = sex;
    user.institution = institution;
    user.portalRole = role;
    user.dateOfBirth = dateOfBirth;
    await this.usersRepository.save(user);
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
