import { CryptoService } from '../../utils/crypto.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from '../controller/dto/login.dto';
import { RegisterDto } from '../controller/dto/register.dto';
import { User } from '../entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly cryptoService: CryptoService,
    private dataSource: DataSource,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOne(User, {
        where: { email: loginDto.email },
      });
      if (!user) {
        throw new NotFoundException('User with specified username not found');
      }
      const passwordCorrect = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!passwordCorrect) {
        throw new BadRequestException('Password incorrect');
      }
      const jwtToken: string = await this.cryptoService.generateJwt(user);
      await entityManager.update(
        User,
        { id: user.id },
        { accessToken: jwtToken },
      );
      return { accessToken: jwtToken };
    });
  }

  async register(registerDto: RegisterDto): Promise<any> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user: User = await entityManager.findOneBy(User, {
        email: registerDto.email,
      });
      if (user) {
        throw new BadRequestException(
          'User with specified Email already present',
        );
      }
      if (registerDto.confirmPassword !== registerDto.password) {
        throw new BadRequestException(
          "Password and ConfirmPassword attributes for registration don't match",
        );
      }
      registerDto.password = await bcrypt.hash(registerDto.password, 10);
      const savedUser: User = await entityManager.save(
        entityManager.create(User, { ...registerDto }),
      );
      const { password, ...restUser } = savedUser;
      return restUser;
    });
  }
}
