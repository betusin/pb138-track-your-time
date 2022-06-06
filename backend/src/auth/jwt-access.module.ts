import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAccessService } from './jwt-access.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    {
      provide: JwtAccessService,
      useExisting: JwtService,
    },
  ],
  exports: [JwtAccessService],
})
export class JwtAccessModule {}
