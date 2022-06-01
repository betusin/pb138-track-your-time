import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CurrentUser } from './auth/entity/req-user.entity';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserProvider {
  get user(): CurrentUser {
    return this.req.user;
  }

  constructor(@Inject(REQUEST) private readonly req) {}
}
