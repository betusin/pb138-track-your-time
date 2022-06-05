import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    /* https://github.com/nestjs/jwt/blob/master/README.md */
    JwtModule.register({
      /* https://github.com/auth0/node-jsonwebtoken#usage */
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, CurrentUserProvider],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
