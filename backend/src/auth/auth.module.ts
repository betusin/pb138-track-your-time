import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import { JwtAccessModule } from './jwt-access.module';
import { JwtRefreshModule } from './jwt-refresh.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    JwtAccessModule,
    JwtRefreshModule,
  ],
  providers: [AuthService, UserService, LocalStrategy, CurrentUserProvider],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
