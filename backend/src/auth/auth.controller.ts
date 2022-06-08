import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { LoginResponseDto } from './dto/login.dto';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { RefreshResponseDto } from './dto/refresh.dto';
import { CurrentUser } from 'src/current-user/current-user.decorator';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Generates an access and refresh token for the provided user',
  })
  @ApiImplicitQuery({ name: 'email', type: String })
  @ApiImplicitQuery({ name: 'password', type: String })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Login information is incorrect or missing',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Generates a new access token based on refresh token',
  })
  @ApiOkResponse({ type: RefreshResponseDto })
  @ApiBearerAuth('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refresh(@CurrentUser() userId: string): Promise<RefreshResponseDto> {
    return this.authService.refresh(userId);
  }
}
