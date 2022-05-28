import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    /* https://github.com/mikenicholson/passport-jwt#configure-strategy */
    super({
      /* https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /* since a 'user' object will be inserted into the request based on the return of this function,
  it is possible to return any data needed */
  async validate(payload: any) {
    return { userId: payload.userId };
  }
}