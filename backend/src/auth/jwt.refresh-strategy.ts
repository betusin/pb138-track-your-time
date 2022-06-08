import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CurrentUser } from 'src/current-user/current-user.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    /* https://github.com/mikenicholson/passport-jwt#configure-strategy */
    super({
      /* https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  /* since a 'user' object will be inserted into the request based on the return of this function,
  it is possible to return any data needed */
  async validate(payload: any): Promise<CurrentUser> {
    return { userId: payload.userId };
  }
}