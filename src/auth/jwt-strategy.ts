import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository} from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "../Entities/user.entity";
import {UsersRepository} from "../Entities/user.repository";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: UsersRepository,
        @Inject()
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload) {
        const {username} = payload;
        const user: User = await this.userRepository.findByUsername(username);

        if (!user) throw new UnauthorizedException();
        return user;
    }
}