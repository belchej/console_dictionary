export default class InvalidParameters extends Error {
  constructor(message: string) {
    super(`InvalidParameters: ${message}`);
  }
}
