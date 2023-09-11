import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { LoginDto as LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('/login')
  async oauthLogin(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }
}
