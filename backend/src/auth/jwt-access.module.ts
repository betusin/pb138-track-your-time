import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAccessService } from './jwt-access.service';
import { JwtAccessStrategy } from './jwt.access-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15 minutes' },
    }),
  ],
  providers: [
    {
      provide: JwtAccessService,
      useExisting: JwtService,
    },
    JwtAccessStrategy,
  ],
  exports: [JwtAccessService],
})
export class JwtAccessModule {}
