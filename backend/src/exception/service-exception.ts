export class ServiceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceException';
  }
}

export class ForbiddenException extends ServiceException {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}
