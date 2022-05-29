import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetSessionDto } from './dto/get-session.dto';

@ApiTags('Sessions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: '/sessions', version: '1' })
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({ summary: 'Creates a new session for the provided project' })
  @ApiCreatedResponse({ description: 'The session was created' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @Post()
  async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<void> {
    await this.sessionService.create(projectId, createSessionDto);
  }

  @ApiOperation({ summary: 'Retrieves a session' })
  @ApiOkResponse({ type: GetSessionDto })
  @ApiNotFoundResponse({ description: 'The session was not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetSessionDto | null> {
    return this.sessionService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates a session' })
  @ApiOkResponse({ type: UpdateSessionDto })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The session was not found' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<void> {
    await this.sessionService.update(id, updateSessionDto);
  }

  @ApiOperation({ summary: 'Deletes a session' })
  @ApiOkResponse({ description: 'The session was deleted' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The session was not found' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.sessionService.remove(id);
  }
}
