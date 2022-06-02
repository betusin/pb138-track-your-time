import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let apiFacingResult: HandledError;
    if (exception instanceof PrismaClientKnownRequestError) {
      apiFacingResult = prismaErrorToApi(exception.code);
    } else {
      apiFacingResult = { message: 'An unknown error occurred', code: 500 };
    }
    response.status(apiFacingResult.code).json({
      statusCode: apiFacingResult.code,
      message: apiFacingResult.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

function prismaErrorToApi(code: string): HandledError {
  switch (code) {
    case 'P2002':
      return { message: 'The item already exists', code: 409 };
    case 'P2025':
      return { message: 'The item could not be found', code: 404 };
    default:
      return { message: 'An unknown database error occurred', code: 500 };
  }
}

interface HandledError {
  readonly message: string;
  readonly code: number;
}
