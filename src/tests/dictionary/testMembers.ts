import Dictionary from "../../Dictionary";
import clonedeep from "lodash.clonedeep";
import { tryExpectError } from "../utils/test-utils";
import DoesNotExistError from "../../errors/DoesNotExistError";
import InvalidParameters from "../../errors/InvalidParameters";
import colors from "colors";

const defaultDict = {
  foo: ["bar"],
  ice: ["ice", "baby", "pick", "cream"],
  bread: ["cheesy", "garlic", "sourdough", "bacon"],
  red: ["light", "rum", "is"],
};

export default function testMembers() {
  console.log("=== MEMBERS TESTS ===");
  testGetMembers();
  testInvalidKeys();
  testKeyNotFound();
}

const testGetMembers = () => {
  console.log("Test: Get Members");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const members = dictionary.members(["red"]);

  // red has 3 members
  if (members?.length !== 3) {
    console.error(
      colors.red(`FAIL: expected 3 members, got ${members?.length}`)
    );
    return;
  }

  if (
    !members.includes("light") ||
    !members.includes("rum") ||
    !members.includes("is")
  ) {
    console.error(
      colors.red(`FAIL: missing member in members, got [${members}]`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};

const testInvalidKeys = () => {
  console.log("Test: Invalid Keys");
  const invalidParametersType = typeof InvalidParameters;
  const dictionary = new Dictionary(clonedeep(defaultDict));

  tryExpectError(
    () => {
      const members = dictionary.members([""]);
    },
    invalidParametersType,
    "testInvalidKey 1"
  );

  tryExpectError(
    () => {
      const members = dictionary.members(["bad", "data"]);
    },
    invalidParametersType,
    "testInvalidKey 2"
  );
};

const testKeyNotFound = () => {
  console.log("Test: Key Not Found");
  const doesNotExistType = typeof DoesNotExistError;
  const dictionary = new Dictionary();

  tryExpectError(
    () => {
      const members = dictionary.members(["404"]);
    },
    doesNotExistType,
    "testKeyNotFound"
  );
};
