import { Module } from '@nestjs/common';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';

@Module({
  providers: [CurrentUserProvider],
})
export class CurrentUserModule {}
