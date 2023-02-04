import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super('400 Bad Request', HttpStatus.BAD_REQUEST);
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('403 Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super('404 Not Found', HttpStatus.NOT_FOUND);
  }
}
