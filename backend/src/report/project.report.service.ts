import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { PDFService } from '@t00nday/nestjs-pdf';
import { PDFOptions } from '@t00nday/nestjs-pdf/dist/pdf.interfaces';
import { SessionService } from '../session/session.service';
import { ServiceException } from '../exception/service-exception';
import {
  calculateCashForSessions,
  calculateHoursForSessions,
  getHoursForSession,
  getUninvoicedSessionsBetween,
} from './session-analysis';

@Injectable()
export class ProjectReportService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly sessionService: SessionService,
    private readonly pdfService: PDFService,
  ) {}

  async generatePDFToBuffer(
    projectId: string,
    template: string,
    from: Date,
    to: Date,
  ): Promise<Buffer> {
    if (from > to) {
      throw new ServiceException('From date cannot be after to date!');
    }
    const project = await this.projectService.findOne(projectId);
    const allSessions = await this.sessionService.findAll(projectId);
    const sessions = getUninvoicedSessionsBetween(allSessions, from, to);
    const items = sessions;
    const hours = calculateHoursForSessions(items);
    const cash = calculateCashForSessions(items, project);
    const currency = '$';
    const options: PDFOptions = {
      locals: {
        project: project,
        sessions: sessions,
        from: from,
        to: to,
        hours: hours,
        total: cash,
        currency: currency,
        formatter: ProjectReportService.formatDate,
        hourFormatter: ProjectReportService.formatDuration,
        hourCalc: getHoursForSession,
      },
    };
    return this.pdfService.toBuffer(template, options).toPromise();
  }

  private static formatDate(date: Date): string {
    return date.toLocaleString('sk', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  private static formatDuration(durationHours: number): string {
    const hours = Math.floor(durationHours);
    const minutes = ((durationHours - hours) * 60).toFixed(0);
    const minutesFormat = ('0' + minutes).slice(-2);
    // I am feeling so dirty right now.
    return `${hours}:${minutesFormat}`;
  }
}
