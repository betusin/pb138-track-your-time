import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      /* The strategy takes a parameter called "username" by default.
      If I want to pass a differently named parameter, I have to specify it in the options */
      usernameField: 'email',
    });
  }

  /* Passport creates a user object based on the return of this validate function
  (it will always be called 'user') */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
