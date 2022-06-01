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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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

  @ApiOperation({ summary: 'Returns the profile of the current user' })
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
  @ApiOperation({ summary: 'Returns all projects of the current user' })
  @ApiOkResponse({ type: GetProjectDto, isArray: true })
  @Get('/projects')
  async findAll(@Request() req): Promise<GetProjectDto[]> {
    return this.projectService.findAllForUser(req.user.userId);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Updates the profile of the current user' })
  @ApiOkResponse({ description: 'The user was updated' })
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
  @ApiOperation({ summary: 'Deletes the profile of the current user' })
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
