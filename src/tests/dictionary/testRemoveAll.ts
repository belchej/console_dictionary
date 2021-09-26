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

export default function testRemoveAll() {
  console.log("=== REMOVE ALL TESTS ===");
  testRemoveKey();
  testInvalidKey();
  testKeyNotFound();
}

const testRemoveKey = () => {
  console.log("Test: Remove Key");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const key = "ice";

  dictionary.removeall([key]);

  // peek into the dictionary and make sure the key was removed
  if (dictionary.dictionary[key]) {
    console.error(colors.red(`FAIL: expected key "${key}" to be removed`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testInvalidKey = () => {
  console.log("Test: Invalid Key");
  const invalidParametersType = "InvalidParameters";
  const dictionary = new Dictionary(clonedeep(defaultDict));

  tryExpectError(
    () => {
      dictionary.removeall([]);
    },
    invalidParametersType,
    "testInvalidKey 1"
  );
  tryExpectError(
    () => {
      dictionary.removeall([""]);
    },
    invalidParametersType,
    "testInvalidKey 2"
  );
  tryExpectError(
    () => {
      dictionary.removeall(["bad", ""]);
    },
    invalidParametersType,
    "testInvalidKey 3"
  );
};

const testKeyNotFound = () => {
  console.log("Test: Key Not Found");
  const doesNotExistType = "DoesNotExistError";
  const dictionary = new Dictionary();

  tryExpectError(
    () => {
      dictionary.removeall(["key"]);
    },
    doesNotExistType,
    "testKeyNotFound"
  );
};
