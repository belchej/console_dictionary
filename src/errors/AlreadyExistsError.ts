import CustomError from "./CustomError";

export default class AlreadyExistsError extends CustomError {
  constructor(message: string) {
    super(`AlreadyExists: ${message}`, "AlreadyExistsError");
  }
}
