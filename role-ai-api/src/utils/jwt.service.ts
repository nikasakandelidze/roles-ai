import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CryptoService {
  private readonly logger: Logger = new Logger(CryptoService.name);
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: User): Promise<string> {
    const jwtPayload = { sub: user.id, username: user.email };
    const signResult: string = await this.jwtService.signAsync(jwtPayload);
    return signResult;
  }

  async decodeToken(token: string): Promise<any | null> {
    try {
      const result = await this.jwtService.verifyAsync(token['token'], {
        secret: JWT_SECRET,
      });
      return result;
    } catch (e) {
      this.logger.warn(e);
      throw new BadRequestException('TOKEN_IS_OUTDATED');
    }
  }
}
