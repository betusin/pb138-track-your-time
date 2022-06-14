import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import { SessionService } from 'src/session/session.service';
import { PDFModule } from '@t00nday/nestjs-pdf';
import { ProjectReportService } from './project.report.service';
import { ReportController } from './report.controller';
import { ProjectService } from '../project/project.service';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    PrismaModule,
    ProjectModule,
    PDFModule.register({
      view: {
        root: 'template/',
        engine: 'ejs',
      },
    }),
  ],
  controllers: [ReportController],
  providers: [
    ProjectService,
    ProjectReportService,
    SessionService,
    CurrentUserProvider,
  ],
})
export class ReportModule {}
