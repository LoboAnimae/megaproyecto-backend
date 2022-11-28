import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from 'src/Entities/user.repository';
import {JwtPayload} from '../auth/jwt-payload.interface';
import {ChangeRoleDto} from './dto/change-role.dto';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UsersRepository,
    ) {
    }

    async getUserData(userId: number) {
        const user = await this.userRepository.findOne({
            where: {id: userId},
            relations: [
                'portalRole',
                'institution',
                'userWorkGroups.workGroup.document',
            ],
            loadEagerRelations: true,
            relationLoadStrategy: 'join',
        });
        if (!user) throw new NotFoundException();
        return {username: user.username};
    }

    // async changeColor(token: string, body: ColorChangeDto) {
    //   const { username } = this.jwtService.decode(token) as {
    //     [key: string]: string;
    //   };
    //   const user = await this.userRepository.findOne({
    //     where: { username },
    //   });

    //   if (!user) throw new NotFoundException();
    //   user.color = body.color.replace('#', '');
    //   await this.userRepository.save(user);
    //   return { color: user.color };
    // }

    async changeRole(
        changeRoleDto: ChangeRoleDto, _jwt: JwtPayload
    ) {
        // const {newRole, username} = changeRoleDto;


        return true;
    }
}
