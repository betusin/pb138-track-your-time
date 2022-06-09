import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
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
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const refreshToken = req?.cookies['refreshToken'];
          if (!refreshToken) {
            return null;
          }
          return refreshToken;
        },
      ]),
    });
  }

  /* since a 'user' object will be inserted into the request based on the return of this function,
  it is possible to return any data needed */
  async validate(payload: any): Promise<CurrentUser> {
    return { userId: payload.userId };
  }
}
