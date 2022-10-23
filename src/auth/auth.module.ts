import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/user.entity';
import { UsersRepository } from '../Entities/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InstitutionRepository } from '../Entities/institution.repository';
import { PortalRoleRepository } from '../Entities/portal_role.repository';
import { Institution } from 'src/Entities/institution.entity';
import { PortalRole } from 'src/Entities/portal_role.entity';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get('JWT_EXPIRATION_TIME'),
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Institution, PortalRole]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    InstitutionRepository,
    PortalRoleRepository,
  ],
})
export class AuthModule {}
