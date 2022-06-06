import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { checkPassword } from './password-hashing';
import { LoginResponseDto } from './dto/login.dto';
import { JwtAccessService } from './jwt-access.service';
import { JwtRefreshService } from './jwt-refresh.service';

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

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtAccessService.sign(payload),
      refresh_token: this.jwtRefreshService.sign(payload),
    };
  }
}
