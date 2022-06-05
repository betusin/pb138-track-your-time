import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAccessStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    {
      provide: JwtAccessStrategy,
      useExisting: JwtService,
    },
  ],
  exports: [JwtAccessStrategy],
})
export class JwtAccessModule {}
