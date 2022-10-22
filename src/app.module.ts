import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { County } from './Entities/county.entity';
import { Author } from './Entities/author.entity';
import { Document } from './Entities/document.entity';
import { State } from './Entities/state.entity';
import { Country } from './Entities/country.entity';
import { CommentType } from './Entities/comment_type.entity';
import { Comment } from './Entities/comment.entity';
import { DocumentPermission } from './Entities/document_permission.entity';
import { DocumentRole } from './Entities/document_role.entity';
import { InstitutionType } from './Entities/institution_type.entity';
import { Institution } from './Entities/institution.entity';
import { PortalPermission } from './Entities/portal_permission.entity';
import { PortalRole } from './Entities/portal_role.entity';
import { UserGroup } from './Entities/user_group.entity';
import { User } from './Entities/user.entity';
import { WorkGroup } from './Entities/work_group.entity';
import { GroupModule } from './group/group.module';
import { DocumentActivityHistory } from './Entities/documentActivityHistory.entity';
import { RandomDataModule } from './random-data/random-data.module';
import { UserWorkGroup } from './Entities/user_work_group';


@Module({
  imports: [AuthModule, ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        type: "mariadb",
        database: configService.get<string>('DB_NAME'),
        entities: [
          Author,
          Comment,
          CommentType,
          Country,
          County,
          Document,
          DocumentActivityHistory,
          DocumentPermission,
          DocumentRole,
          Institution,
          InstitutionType,
          PortalPermission,
          PortalRole,
          State,
          UserGroup,
          UserWorkGroup,
          User,
          WorkGroup
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GroupModule,
    RandomDataModule],
  // TypeOrmModule.forRoot({
  //   type: 'mariadb',
  //   host: 'localhost',
  //   port: 49158,
  //   username: 'root',
  //   password: 'mariadbpw',
  //   database: 'main',
  //   synchronize: true,
  // }),],
  controllers: [AppController],
  providers: [Auth],
})
export class AppModule { }
