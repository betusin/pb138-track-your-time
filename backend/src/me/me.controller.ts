import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAccessAuthGuard } from '../auth/jwt-access-auth.guard';
import { UserService } from '../user/user.service';
import { GetProjectDto } from '../project/dto/get-project.dto';
import { ProjectService } from '../project/project.service';
import { GetUserDto } from '../user/dto/get-user-dto.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import {
  api_desc_auth_invalid,
  api_desc_field_invalid,
} from '../common-api-messages';
import { CurrentUser } from 'src/current-user/current-user.decorator';

@ApiTags('Me')
@ApiBearerAuth('access-token')
@UseGuards(JwtAccessAuthGuard)
@Controller({ path: 'me', version: '1' })
export class MeController {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  @ApiOperation({ summary: 'Returns the profile of the current user' })
  @ApiOkResponse({ type: GetUserDto })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @Get('/profile')
  async profile(@CurrentUser() userId: string): Promise<GetUserDto> {
    const profile = this.userService.findOne(userId);
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
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @Get('/projects')
  async findAll(@CurrentUser() userId: string): Promise<GetProjectDto[]> {
    return this.projectService.findAllForUser(userId);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Updates the profile of the current user' })
  @ApiOkResponse({ description: 'The user was updated' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The user was not found' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @Patch()
  async update(
    @CurrentUser() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.update(userId, updateUserDto);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Deletes the profile of the current user' })
  @ApiOkResponse({ description: 'The user was deleted' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The user was not found' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @Delete()
  async remove(@CurrentUser() userId: string): Promise<void> {
    await this.userService.remove(userId);
  }
}
