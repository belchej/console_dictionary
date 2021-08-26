import Dictionary from "../../Dictionary";
import { tryExpectError } from "../utils/test-utils";
import InvalidParameters from "../../errors/InvalidParameters";
import clonedeep from "lodash.clonedeep";
import colors from "colors";

const defaultDict = {
  foo: ["bar"],
  ice: ["ice", "baby", "pick", "cream"],
  bread: ["cheesy", "garlic", "sourdough", "bacon"],
  red: ["light", "rum", "is"],
};

export default function testMemberExists() {
  console.log("=== MEMBER EXISTS TESTS ===");
  testExists();
  testDoesNotExist();
  testKeyDoesNotExist();
  testInvalidKeyValue();
}

const testExists = () => {
  console.log("Test: Exists");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "bread";
  const value = "cheesy";

  const exists = dictionary.memberexists([key, value]);

  if (!exists) {
    console.error(
      colors.red(`FAIL: expected key "${key}" member "${value}" to exist`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};

const testDoesNotExist = () => {
  console.log("Test: Does Not Exist");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "bee";
  const value = "flower";

  const exists = dictionary.memberexists([key, value]);

  if (exists) {
    console.error(
      colors.red(`FAIL: expected key "${key}" member "${value}" to NOT exist`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};

const testKeyDoesNotExist = () => {
  console.log("Test: Key Does Not Exist");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "bread";
  const value = "moldy";

  const exists = dictionary.memberexists([key, value]);

  if (exists) {
    console.error(
      colors.red(`FAIL: expected key "${key}" member "${value}" to NOT exist`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};

const testInvalidKeyValue = () => {
  console.log("Test: Invalid Key Value");
  const invalidParametersType = typeof InvalidParameters;
  const dictionary = new Dictionary(clonedeep(defaultDict));

  tryExpectError(
    () => {
      dictionary.memberexists([]);
    },
    invalidParametersType,
    "testInvalidKeyValue 1"
  );
  tryExpectError(
    () => {
      dictionary.memberexists([""]);
    },
    invalidParametersType,
    "testInvalidKeyValue 2"
  );
  tryExpectError(
    () => {
      dictionary.memberexists(["bad", ""]);
    },
    invalidParametersType,
    "testInvalidKeyValue 3"
  );
  tryExpectError(
    () => {
      dictionary.memberexists(["", "data"]);
    },
    invalidParametersType,
    "testInvalidKeyValue 4"
  );
  tryExpectError(
    () => {
      dictionary.memberexists(["bread", "bacon", "bar"]);
    },
    invalidParametersType,
    "testInvalidKeyValue 5"
  );
};
