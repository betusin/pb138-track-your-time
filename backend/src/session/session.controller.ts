import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetSessionDto } from './dto/get-session.dto';
import { SessionPhotoService } from '../session_photo/session_photo.service';
import { CreateSessionPhotoDto } from '../session_photo/dto/create-session_photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { pngFileFilter } from './image_file_filter';
import {
  api_desc_auth_invalid,
  api_desc_field_invalid,
} from '../common-api-messages';

@ApiTags('Sessions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: '/sessions', version: '1' })
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly sessionPhotoService: SessionPhotoService,
  ) {}

  @ApiOperation({ summary: 'Retrieves a session' })
  @ApiOkResponse({ type: GetSessionDto })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The session was not found' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetSessionDto | null> {
    return this.sessionService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates a session' })
  @ApiOkResponse({ type: UpdateSessionDto })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
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
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @ApiNotFoundResponse({ description: 'The session was not found' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.sessionService.remove(id);
  }

  @ApiOperation({
    summary: 'Creates a new session photo for the provided project',
  })
  @ApiTags('Session Photos')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'The session was created' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fieldSize: 8 * 1024 * 1024 },
      fileFilter: pngFileFilter,
    }),
  )
  @Post('/:sessionId/photos')
  async createSession(
    @Param('sessionId', ParseUUIDPipe) sessionId: string,
    @Body() createSessionDto: CreateSessionPhotoDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('The provided file is invalid');
    }
    const base64 = file.buffer.toString('base64');
    const prefixedBase64 = 'data:' + file.mimetype + ';base64,' + base64;
    await this.sessionPhotoService.create(
      sessionId,
      createSessionDto,
      prefixedBase64,
    );
  }
}
