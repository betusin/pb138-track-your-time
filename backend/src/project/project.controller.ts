import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetProjectDto } from './dto/get-project.dto';
import { GetSessionDto } from '../session/dto/get-session.dto';
import { SessionService } from '../session/session.service';
import { CreateSessionDto } from '../session/dto/create-session.dto';
import {
  api_desc_auth_invalid,
  api_desc_field_invalid,
} from '../common-api-messages';

@ApiTags('Projects')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'projects', version: '1' })
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'Creates a new project' })
  @ApiCreatedResponse({ description: 'The project was created' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @Post()
  async create(
    @Request() req,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<void> {
    await this.projectService.create(req.user.userId, createProjectDto);
  }

  @ApiOperation({ summary: 'Retrieves a project' })
  @ApiOkResponse({ type: GetProjectDto })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetProjectDto | null> {
    return this.projectService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates a project' })
  @ApiOkResponse({ description: 'The project was updated' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Patch('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    await this.projectService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Deletes a project' })
  @ApiOkResponse({ description: 'The project was deleted' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.projectService.remove(id);
  }

  @ApiOperation({ summary: 'Creates a new session for the provided project' })
  @ApiTags('Sessions')
  @ApiCreatedResponse({ description: 'The session was created' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @Post('/:projectId/sessions')
  async createSession(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<void> {
    await this.sessionService.create(projectId, createSessionDto);
  }

  @ApiOperation({ summary: 'Returns all sessions of a project' })
  @ApiTags('Sessions')
  @ApiOkResponse({ type: GetSessionDto, isArray: true })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Get('/:projectId/sessions')
  async findAllSessions(
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ): Promise<GetSessionDto[]> {
    return this.sessionService.findAll(projectId);
  }
}
