export default class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(`AlreadyExists: ${message}`);
  }
}
