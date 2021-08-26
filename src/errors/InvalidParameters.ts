export default class InvalidParameters extends Error {
  readonly type = typeof InvalidParameters;
  constructor(message: string) {
    super(`InvalidParameters: ${message}`);
  }
}
