import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ColorChangeDto } from 'src/user/dto/change-color.dto';
import { JWT } from 'src/user/get-jwt.decorator';
import { UserService } from 'src/user/user.service';

@Controller('user')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:userid')
  async getUserData(@Param('userid') userId) {
    return this.userService.getUserData(userId);
  }

  // @Post('/change-color')
  // async changeColor(@Body() body: ColorChangeDto, @JWT() token) {
  //   return this.userService.changeColor(token, body);
  // }
}
