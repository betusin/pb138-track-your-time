import {
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { api_desc_auth_invalid } from '../common-api-messages';
import { ProjectReportService } from './project.report.service';
import { JwtAccessAuthGuard } from '../auth/jwt-access-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth('access-token')
@UseGuards(JwtAccessAuthGuard)
@Controller({ path: 'reports', version: '1' })
export class ReportController {
  constructor(private readonly reportService: ProjectReportService) {}

  @ApiOperation({ summary: 'Generates a report from the project' })
  @ApiOkResponse({ type: StreamableFile })
  @ApiUnauthorizedResponse({ description: api_desc_auth_invalid })
  @Header('Content-type', 'application/pdf')
  @Header('Content-disposition', 'attachment')
  @Get('/project/:id')
  async generateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ): Promise<StreamableFile> {
    const array = await this.reportService.generatePDFToBuffer(
      id,
      'report.ejs',
      from,
      to,
    );
    return new StreamableFile(array);
  }
}
