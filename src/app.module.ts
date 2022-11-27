import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Institution} from './Entities/institution.entity';
import {User} from './Entities/user.entity';
import {GroupModule} from './group/group.module';
import {RandomDataModule} from './random-data/random-data.module';
import {UserModule} from './user/user.module';
import {DocumentModule} from './document/document.module';
import {S3Service} from './s3/s3.service';
import {Document} from './Entities/document.entity';
import {S3Module} from './s3/s3.module';
import {Role} from './Entities/role.entity';
import {UserGroup} from './Entities/user_group.entity';
import {Group} from './Entities/group.entity';
import {County} from './Entities/county.entity';
import {Country} from './Entities/country.entity';
import {State} from './Entities/state.entity';
import {Comment} from './Entities/comment.entity';
import {Session} from './Entities/session.entity';
import {RoleService} from './role/role.service';
import {PermissionService} from './permission/permission.service';
import {Permission} from "./Entities/permission.entity";
import {CoreModule} from './core/core.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        CoreModule,
        AuthModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                host: configService.get<string>('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                type: 'mariadb',
                database: configService.get<string>('DB_NAME'),
                entities: [
                    Role,
                    UserGroup,
                    Group,
                    County,
                    Country,
                    State,
                    Comment,
                    Session,
                    Document,
                    Institution,
                    User,
                    Permission
                ],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        GroupModule,
        RandomDataModule,
        UserModule,
        DocumentModule,
        S3Module,
        CoreModule,
        DatabaseModule,

    ],
    controllers: [AppController],
    providers: [S3Service, RoleService, PermissionService],
})
export class AppModule {
}
