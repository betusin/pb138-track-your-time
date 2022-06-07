import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ForbiddenException,
  NotFoundException,
  ServiceException,
} from './service-exception';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = serviceExceptionToStatus(exception);

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

function serviceExceptionToStatus(exception: ServiceException): HttpStatus {
  switch (exception.constructor) {
    case NotFoundException:
      return HttpStatus.NOT_FOUND;
    case ForbiddenException:
      return HttpStatus.FORBIDDEN;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
