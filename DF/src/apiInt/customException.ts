import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(errorMessage: string, errorCode: number) { 
    super({ errorMessage, errorCode }, errorCode);
  }
}

// Specific custom exceptions
export class BadRequestException extends CustomException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenException extends CustomException {
  constructor(message: string) {
    super(message, 403);
  }
}

export class ConflictException extends CustomException {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotAcceptableException extends CustomException {
  constructor(message: string) {
    super(message, 406);
  }
}