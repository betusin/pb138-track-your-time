import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { checkPassword } from './password-hashing';
import { JwtAccessService } from './jwt-access.service';
import { JwtRefreshService } from './jwt-refresh.service';
import { TokensDto } from './dto/tokens.dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtAccessService: JwtAccessService,
    private jwtRefreshService: JwtRefreshService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await checkPassword(password, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<TokensDto> {
    const payload = { userId: user.id };
    return {
      accessToken: this.jwtAccessService.sign(payload),
      refreshToken: this.jwtRefreshService.sign(payload),
    };
  }

  async refresh(userId: string): Promise<AccessTokenDto> {
    const payload = { userId: userId };
    return {
      accessToken: this.jwtAccessService.sign(payload),
    };
  }
}
