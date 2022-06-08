import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { AccessTokenDto } from './dto/access-token.dto';
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
  @ApiOkResponse({ type: AccessTokenDto })
  @ApiUnauthorizedResponse({
    description: 'Login information is incorrect or missing',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Response({ passthrough: true }) res: any,
  ): Promise<AccessTokenDto> {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return { accessToken: accessToken };
  }

  @ApiOperation({
    summary: 'Generates a new access token based on refresh token',
  })
  @ApiOkResponse({ type: AccessTokenDto })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refresh(@CurrentUser() userId: string): Promise<AccessTokenDto> {
    return this.authService.refresh(userId);
  }
}
