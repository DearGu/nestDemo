import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserInfo')
  async getUserInfo(@Req() req) {
    return req.user;
  }
}
