import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UsersRepository} from 'src/Entities/user.repository';

@Module({
    providers: [UserService, UsersRepository],
    controllers: [UserController],
    imports: [],
})
export class UserModule {
}
