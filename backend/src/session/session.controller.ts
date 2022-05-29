import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
