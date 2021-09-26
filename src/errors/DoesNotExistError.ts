import CustomError from "./CustomError";

export default class DoesNotExistError extends CustomError {
  constructor(message: string) {
    super(`DoesNotExist: ${message}`, "DoesNotExistError");
  }
}
