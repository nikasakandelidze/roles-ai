import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { LoginDto as LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('/api/login')
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Post('/api/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
