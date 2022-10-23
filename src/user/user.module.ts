import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/Entities/user.repository';

@Module({
  providers: [UserService, UsersRepository],
  controllers: [UserController],
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
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule {}
