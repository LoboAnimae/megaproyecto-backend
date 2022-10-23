import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginCredentialsDto,
  RegistrationParamsDto,
} from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginCredentialsDto);
  }

  @Post('/register')
  register(
    @Body() registrationCredentialsDto: RegistrationParamsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.register(registrationCredentialsDto);
  }
}
