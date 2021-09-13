import Dictionary from "../../Dictionary";
import { tryExpectError } from "../utils/testUtils";
import InvalidParameters from "../../errors/InvalidParameters";
import clonedeep from "lodash.clonedeep";
import colors from "colors";

const defaultDict = {
  foo: ["bar"],
  ice: ["ice", "baby", "pick", "cream"],
  bread: ["cheesy", "garlic", "sourdough", "bacon"],
  red: ["light", "rum", "is"],
};

export default function testKeyExists() {
  console.log("=== KEY EXISTS TESTS ===");
  testExists();
  testDoesNotExist();
  testInvalidKey();
}

const testExists = () => {
  console.log("Test: Exists");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "bread";

  const exists = dictionary.keyexists([key]);

  if (!exists) {
    console.error(colors.red(`FAIL: expected key "${key}" to exist`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testDoesNotExist = () => {
  console.log("Test: Does Not Exist");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "bacon";

  const exists = dictionary.keyexists([key]);

  if (exists) {
    console.error(colors.red(`FAIL: expected key "${key}" to NOT exist`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testInvalidKey = () => {
  console.log("Test: Invalid Key");
  const invalidParametersType = typeof InvalidParameters;
  const dictionary = new Dictionary(clonedeep(defaultDict));

  tryExpectError(
    () => {
      dictionary.keyexists([]);
    },
    invalidParametersType,
    "testInvalidKey 1"
  );
  tryExpectError(
    () => {
      dictionary.keyexists([""]);
    },
    invalidParametersType,
    "testInvalidKey 2"
  );
  tryExpectError(
    () => {
      dictionary.keyexists(["bad", ""]);
    },
    invalidParametersType,
    "testInvalidKey 3"
  );
};
