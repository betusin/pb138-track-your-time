import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CurrentUser } from './current-user.interface';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserProvider {
  constructor(@Inject(REQUEST) private readonly req) {}

  get user(): CurrentUser {
    return this.req.user;
  }
}
