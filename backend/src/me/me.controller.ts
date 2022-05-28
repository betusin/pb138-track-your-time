import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';

@ApiTags('Me')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'me', version: '1' })
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  findAll(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }
}
