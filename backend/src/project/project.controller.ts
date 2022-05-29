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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetProjectDto } from './dto/get-project.dto';
import { GetSessionDto } from '../session/dto/get-session.dto';
import { SessionService } from '../session/session.service';

@ApiTags('Projects')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'projects', version: '1' })
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiCreatedResponse({ description: 'The project was created' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @Post()
  async create(
    @Request() req,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<void> {
    await this.projectService.create(req.user.userId, createProjectDto);
  }

  @ApiOkResponse({ type: GetProjectDto })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetProjectDto | null> {
    return this.projectService.findOne(id);
  }

  @ApiNoContentResponse({ description: 'The project was updated' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Patch('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    await this.projectService.update(id, updateProjectDto);
  }

  @ApiOkResponse({ description: 'The project was deleted' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.projectService.remove(id);
  }

  @ApiTags('Sessions')
  @ApiOkResponse({ type: GetSessionDto, isArray: true })
  @ApiNotFoundResponse({ description: 'The project was not found' })
  @Get('/:projectId/sessions')
  async findAllSessions(
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ): Promise<GetSessionDto[]> {
    return this.sessionService.findAll(projectId);
  }
}
