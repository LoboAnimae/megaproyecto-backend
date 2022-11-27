import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginCredentialsDto, RegistrationParamsDto} from './dto';
import {IAuthenticationResponse} from "./Responses/Responses";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    login(
        @Body() loginCredentialsDto: LoginCredentialsDto,
    ): Promise<IAuthenticationResponse> {
        return this.authService.login(loginCredentialsDto);
    }

    @Post('/register')
    register(
        @Body() registrationCredentialsDto: RegistrationParamsDto,
    ): Promise<IAuthenticationResponse> {
        return this.authService.register(registrationCredentialsDto);
    }
}
