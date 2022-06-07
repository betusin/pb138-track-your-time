import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtRefreshService } from './jwt-refresh.service';
import { JwtRefreshStrategy } from './jwt.refresh-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: '1 week' },
    }),
  ],
  providers: [
    {
      provide: JwtRefreshService,
      useExisting: JwtService,
    },
    JwtRefreshStrategy,
  ],
  exports: [JwtRefreshService],
})
export class JwtRefreshModule {}
