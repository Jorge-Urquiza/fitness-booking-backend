import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const { error, message } = this.parseHttpExceptionResponse(
        exceptionResponse,
        exception.message,
        statusCode,
      );

      response.status(statusCode).json({
        success: false,
        statusCode,
        error,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Internal server error',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private parseHttpExceptionResponse(
    exceptionResponse: string | object,
    fallbackMessage: string,
    statusCode: number,
  ): { error: string; message: string | string[] } {
    const defaultError = HttpStatus[statusCode] ?? 'Error';

    if (typeof exceptionResponse === 'string') {
      return {
        error: defaultError,
        message: exceptionResponse,
      };
    }

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObject = exceptionResponse as {
        error?: unknown;
        message?: unknown;
      };

      return {
        error:
          typeof responseObject.error === 'string'
            ? responseObject.error
            : defaultError,
        message:
          typeof responseObject.message === 'string' ||
          Array.isArray(responseObject.message)
            ? (responseObject.message as string | string[])
            : fallbackMessage,
      };
    }

    return {
      error: defaultError,
      message: fallbackMessage,
    };
  }
}
