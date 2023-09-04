import { Injectable } from '@nestjs/common';
import { OauthLoginDto } from '../controller/dto/oauth-login.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  async oauthLogin(oauthDto: OauthLoginDto): Promise<void> {
    console.log('OauthLogin');
  }
}
