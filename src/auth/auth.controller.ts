import { Body, Controller, ForbiddenException, Get, Post } from '@nestjs/common';
import { User } from '../Entities/user.entity';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    login(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string; }> {
        return this.authService.login(loginCredentialsDto);
    }

    @Post('/register')
    register(@Body() LoginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.register(LoginCredentialsDto);
    }
}
