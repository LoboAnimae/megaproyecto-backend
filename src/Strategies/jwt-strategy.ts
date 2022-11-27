import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "../Entities/user.entity";
import {UsersRepository} from "../Entities/user.repository";
import {JwtPayload} from "../auth/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UsersRepository,
        private readonly configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        });
    }

    async validate(payload: JwtPayload) {
        const {username} = payload;
        const user: User = await this.userRepository.findByUsername(username);

        if (!user) throw new UnauthorizedException();
        return user;
    }
}