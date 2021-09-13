import Dictionary from "./Dictionary";
import InvalidParameters from "./errors/InvalidParameters";
import DoesNotExistError from "./errors/DoesNotExistError";
import AlreadyExistsError from "./errors/AlreadyExistsError";

const prompt = require("prompt-sync")();

export default class Shell {
  readonly EXIT_PROMPTS = ["exit", "stop", "close"];
  // to use the dynamic function calls, without sanitizing all input, this needs to be any
  dictionary: any;

  constructor() {
    this.dictionary = new Dictionary();
  }

  run(): void {
    let input = "";
    let exit = false;
    do {
      input = prompt(">");

      // killing the script in the console results in a null input, check for that to exit gracefully
      exit = input === null || this.EXIT_PROMPTS.includes(input.toLowerCase());

      if (!exit) {
        this.tryExecute(input);
      }
    } while (!exit);
  }

  // returns the return value of the dictionary command
  tryExecute(command: string): any {
    if (!command) {
      return;
    }

    const params = command.trim().split(" ");

    if (params?.length > 0) {
      const commandName = params[0].toLowerCase();
      params.splice(0, 1);
      try {
        return this.dictionary[commandName](params);
      } catch (error) {
        // if it's something the dictionary threw, just log it out
        if (
          error.type === typeof DoesNotExistError ||
          error.type === typeof InvalidParameters ||
          error.type === typeof AlreadyExistsError
        ) {
          console.error(`ERROR: ${error.message}`);
        }
        // otherwise it is an invalid command
        else {
          console.error(`invalid command: ${commandName}`);
        }
      }
    }
  }
}
