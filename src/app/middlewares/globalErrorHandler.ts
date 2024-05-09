/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';

import handleValidationError from '../../error/handleValidationError';
import { IGenericErrorMessage } from '../../interfaces/error';
import ApiError from '../../error/ApiError';
import { errorLogger } from '../../shared/logger/logger';
import { ZodError } from 'zod';
import handleZodError from '../../error/handleZodEroor';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'production'
    ? console.log('GlobalErrorHandler', error)
    : errorLogger.error('GlobalErrorHandler', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
