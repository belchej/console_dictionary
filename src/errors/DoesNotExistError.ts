export default class DoesNotExistError extends Error {
  readonly type = typeof DoesNotExistError;
  constructor(message: string) {
    super(`DoesNotExist: ${message}`);
  }
}
