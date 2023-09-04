import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { OauthLoginDto } from './dto/oauth-login.dto';

@Controller()
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('/oauth/login')
  async oauthLogin(@Body() oauthLoginDto: OauthLoginDto) {
    return this.authService.oauthLogin(oauthLoginDto);
  }
}
