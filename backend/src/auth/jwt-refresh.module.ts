import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './jwt.refresh-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    {
      provide: JwtRefreshStrategy,
      useExisting: JwtService,
    },
  ],
  exports: [JwtRefreshStrategy],
})
export class JwtRefreshModule {}
