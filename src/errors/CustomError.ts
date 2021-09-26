export default class CustomError extends Error {
  readonly type: string;
  constructor(message: string, _type: string) {
    super(message);
    this.type = _type;
  }
}
