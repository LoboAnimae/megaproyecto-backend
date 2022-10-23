import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/Entities/user.repository';
import { ColorChangeDto } from 'src/user/dto/change-color.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async getUserData(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'portalRole',
        'institution',
        'userWorkGroups.workGroup.document',
      ],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });
    if (!user) throw new NotFoundException();
    const returnObj = {
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      sex: user.sex,
      dateOfBirth: user.dateOfBirth,
      color: user.color,
      portalRole: user.portalRole.name,
      institution: user.institution.name,
      groups: user.userWorkGroups,
    };
    return returnObj;
  }

  async changeColor(token: string, body: ColorChangeDto) {
    const { username } = this.jwtService.decode(token) as {
      [key: string]: string;
    };
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) throw new NotFoundException();
    user.color = body.color.replace('#', '');
    await this.userRepository.save(user);
    return { color: user.color };
  }
}
