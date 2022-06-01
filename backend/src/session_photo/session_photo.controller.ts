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
import { UpdateSessionPhotoDto } from './dto/update-session.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetSessionPhotoDto } from './dto/get-session_photo.dto';
import { SessionPhotoService } from './session_photo.service';

@ApiTags('Session Photos')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: '/session_photos', version: '1' })
export class SessionPhotoController {
  constructor(private readonly sessionService: SessionPhotoService) {}

  @ApiOperation({ summary: 'Retrieves a session photo' })
  @ApiOkResponse({ type: GetSessionPhotoDto })
  @ApiNotFoundResponse({ description: 'The session photo was not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetSessionPhotoDto | null> {
    return this.sessionService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates a session photo' })
  @ApiOkResponse({ type: UpdateSessionPhotoDto })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The session photo was not found' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSessionDto: UpdateSessionPhotoDto,
  ): Promise<void> {
    await this.sessionService.update(id, updateSessionDto);
  }

  @ApiOperation({ summary: 'Deletes a session photo' })
  @ApiOkResponse({ description: 'The session photo was deleted' })
  @ApiBadRequestResponse({ description: 'Field validation failed' })
  @ApiNotFoundResponse({ description: 'The session photo was not found' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.sessionService.remove(id);
  }
}
