import Dictionary from "../../Dictionary";
import AlreadyExistsError from "../../errors/AlreadyExistsError";
import InvalidParameters from "../../errors/InvalidParameters";
import { tryExpectError } from "../utils/testUtils";
import colors from "colors";

export default function testAdd() {
  console.log("=== ADD TESTS ===");
  testBadInput();
  testValidAdd();
  testDoubleAdd();
}

const testValidAdd = () => {
  console.log("Test: Valid Add");
  const dictionary: Dictionary = new Dictionary();
  const key = "foo";

  dictionary.add([key, "bar"]);
  dictionary.add([key, "baz"]);

  // peek into the dictionary to make sure it was added
  if (!dictionary.dictionary[key]) {
    console.error(colors.red(`FAIL: key "${key}" was not added`));
    return;
  }

  // make sure both members were added
  if (
    dictionary.dictionary[key].length !== 2 ||
    !dictionary.dictionary[key].includes("bar") ||
    !dictionary.dictionary[key].includes("baz")
  ) {
    console.error(colors.red("FAIL: members were not added"));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testDoubleAdd = () => {
  console.log("Test: Double Add");
  const dictionary: Dictionary = new Dictionary();
  const alreadyExistsType = "AlreadyExistsError";
  const key = "foo";

  dictionary.add([key, "baz"]);

  // try to add again
  tryExpectError(
    () => {
      dictionary.add([key, "baz"]);
    },
    alreadyExistsType,
    "duplicate member"
  );

  if (dictionary.dictionary[key].length !== 1) {
    console.error(colors.red("FAIL: member was double added"));
  } else {
    console.log(colors.green("PASSED"));
  }
};

const testBadInput = () => {
  console.log("Test: Expect InvalidParameters");
  const dictionary: Dictionary = new Dictionary();

  const invalidParametersType = "InvalidParameters";

  // test bad input
  tryExpectError(
    () => {
      dictionary.add(["foo", ""]);
    },
    invalidParametersType,
    "testBadInput 1"
  );
  tryExpectError(
    () => {
      dictionary.add(["", "bar"]);
    },
    invalidParametersType,
    "testBadInput 2"
  );
  tryExpectError(
    () => {
      dictionary.add(["foo", "fi", "fee"]);
    },
    invalidParametersType,
    "testBadInput 3"
  );
  tryExpectError(
    () => {
      dictionary.add(["foo"]);
    },
    invalidParametersType,
    "testBadInput 4"
  );
  tryExpectError(
    () => {
      dictionary.add([]);
    },
    invalidParametersType,
    "testBadInput 5"
  );

  if (Object.keys(dictionary.dictionary).length !== 0) {
    console.error(colors.red("FAIL: invalid data added to dictionary"));
  }
};
