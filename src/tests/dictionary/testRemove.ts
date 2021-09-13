import Dictionary from "../../Dictionary";
import clonedeep from "lodash.clonedeep";
import { tryExpectError } from "../utils/testUtils";
import DoesNotExistError from "../../errors/DoesNotExistError";
import InvalidParameters from "../../errors/InvalidParameters";
import colors from "colors";

const defaultDict = {
  foo: ["bar"],
  ice: ["ice", "baby", "pick", "cream"],
  bread: ["cheesy", "garlic", "sourdough", "bacon"],
  red: ["light", "rum", "is"],
};

export default function testRemove() {
  console.log("=== REMOVE TESTS ===");
  testRemoveMember();
  testRemoveLastMember();
  testMemberNotFound();
  testInvalidKeyValue();
  testKeyNotFound();
}

const testRemoveMember = () => {
  console.log("Test: Remove Member");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  dictionary.remove(["red", "rum"]);

  // peek into the dictionary and make sure it was removed
  if (dictionary.dictionary["red"]?.includes("rum")) {
    console.error(colors.red(`FAIL: expected "rum" to be removed`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testRemoveLastMember = () => {
  console.log("Test: Remove Last Member");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "foo";
  const value = "bar";

  dictionary.remove([key, value]);

  if (dictionary.dictionary[key]) {
    console.error(colors.red(`FAIL: key "${key}" was not deleted`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testMemberNotFound = () => {
  console.log("Test: Member Not Found");
  const doesNotExistType = typeof DoesNotExistError;
  const dictionary = new Dictionary(clonedeep(defaultDict));

  tryExpectError(
    () => {
      dictionary.remove(["bread", "lemon"]);
    },
    doesNotExistType,
    "testMemberNotFound"
  );
};

const testInvalidKeyValue = () => {
  console.log("Test: Invalid Key Value");
  const invalidParametersType = typeof InvalidParameters;
  const dictionary = new Dictionary(clonedeep(defaultDict));

  tryExpectError(
    () => {
      dictionary.remove([]);
    },
    invalidParametersType,
    "testInvalidKeyValue 1"
  );
  tryExpectError(
    () => {
      dictionary.remove([""]);
    },
    invalidParametersType,
    "testInvalidKeyValue 2"
  );
  tryExpectError(
    () => {
      dictionary.remove(["bad", ""]);
    },
    invalidParametersType,
    "testInvalidKeyValue 3"
  );
  tryExpectError(
    () => {
      dictionary.remove(["", "data"]);
    },
    invalidParametersType,
    "testInvalidKeyValue 4"
  );
  tryExpectError(
    () => {
      dictionary.remove(["red", "rum", ""]);
    },
    invalidParametersType,
    "testInvalidKeyValue 5"
  );
};

const testKeyNotFound = () => {
  console.log("Test: Key Not Found");
  const doesNotExistType = typeof DoesNotExistError;
  const dictionary = new Dictionary();

  tryExpectError(
    () => {
      dictionary.remove(["not", "there"]);
    },
    doesNotExistType,
    "testKeyNotFound"
  );
};
