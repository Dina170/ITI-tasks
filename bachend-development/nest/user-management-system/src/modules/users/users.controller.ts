import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto, SignUpDto } from './dto/dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/decorators/get-user';
import { JWTPayload } from 'src/lib/interfaces';
import { Role } from 'src/decorators/get-role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }
  @Post('sign-in')
  signIn(@Body() signUpDto: SignInDto) {
    return this.usersService.signIn(signUpDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@User() user: JWTPayload) {
    return this.usersService.getProfile(user.email);
  }

  @ApiBearerAuth()
  @Get('all')
  getAllUsers(@User() user: JWTPayload, @Role('admin') isAdmin: boolean) {
    return this.usersService.getAllUsers(user.email, isAdmin);
  }
}
