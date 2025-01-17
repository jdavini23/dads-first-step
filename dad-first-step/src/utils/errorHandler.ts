import { Routes } from '@/types/routes';

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(message: string, code: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Error handling utility with logging and optional navigation
 */
export class ErrorHandler {
  /**
   * Log error to console and optionally to a monitoring service
   * @param error - The error to log
   */
  static log(error: unknown): void {
    if (error instanceof AppError) {
      console.error(`App Error (${error.code}):`, error.message, error.details);
    } else if (error instanceof Error) {
      console.error('Unexpected Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }

  /**
   * Handle error with optional navigation to error page
   * @param error - The error to handle
   * @param navigation - Optional navigation function
   */
  static handle(error: unknown, navigation?: (route: string) => void): void {
    this.log(error);

    // Optional navigation to error page
    if (navigation) {
      navigation(Routes.HOME);
    }
  }

  /**
   * Create a new AppError
   * @param message - Error message
   * @param code - Error code
   * @param details - Additional error details
   */
  static createError(message: string, code: string, details?: Record<string, unknown>): AppError {
    return new AppError(message, code, details);
  }
}
