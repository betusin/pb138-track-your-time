import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { GetProjectDto } from '../project/dto/get-project.dto';
import { ProjectService } from '../project/project.service';
import { GetUserDto } from '../user/dto/get-user-dto.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

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

  @ApiTags('Users')
  @ApiNoContentResponse({ description: 'The user was updated' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The user was not found' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.update(req.user.userId, updateUserDto);
  }

  @ApiTags('Users')
  @ApiOkResponse({ description: 'The user was deleted' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The user was not found' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Request() req): Promise<void> {
    await this.userService.remove(req.user.userId);
  }
}
