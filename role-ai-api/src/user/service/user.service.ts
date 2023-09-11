import { Injectable } from '@nestjs/common';
import { LoginDto } from '../controller/dto/login.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  async login(loginDto: LoginDto): Promise<void> {
    console.log('OauthLogin');
  }
}
