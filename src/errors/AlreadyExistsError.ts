export default class AlreadyExistsError extends Error {
  readonly type = typeof AlreadyExistsError;
  constructor(message: string) {
    super(`AlreadyExists: ${message}`);
  }
}
