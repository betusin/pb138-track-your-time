import {
  Controller,
  Get,
  InternalServerErrorException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { GetProjectDto } from '../project/dto/get-project.dto';
import { ProjectService } from '../project/project.service';
import { GetUserDto } from '../user/dto/get-user-dto.dto';

@ApiTags('Me')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'me', version: '1' })
export class MeController {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  @ApiOkResponse({ type: GetUserDto })
  @Get('/profile')
  async profile(@Request() req): Promise<GetUserDto> {
    const profile = this.userService.findOne(req.user.userId);
    if (!profile) {
      throw new InternalServerErrorException(
        'The profile of the current user was not found',
      );
    }
    return profile;
  }

  @ApiTags('Projects')
  @ApiOkResponse({ type: GetProjectDto, isArray: true })
  @Get('/projects')
  async findAll(): Promise<GetProjectDto[]> {
    return this.projectService.findAll();
  }
}
