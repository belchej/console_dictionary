export default class DoesNotExistError extends Error {
  constructor(message: string) {
    super(`DoesNotExist: ${message}`);
  }
}
