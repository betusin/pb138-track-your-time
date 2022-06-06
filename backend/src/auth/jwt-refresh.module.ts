import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtRefreshService } from './jwt-refresh.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    {
      provide: JwtRefreshService,
      useExisting: JwtService,
    },
  ],
  exports: [JwtRefreshService],
})
export class JwtRefreshModule {}
