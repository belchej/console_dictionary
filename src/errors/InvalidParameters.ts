import CustomError from "./CustomError";

export default class InvalidParameters extends CustomError {
  constructor(message: string) {
    super(`InvalidParameters: ${message}`, "InvalidParameters");
  }
}
