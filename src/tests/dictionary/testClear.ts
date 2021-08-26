import Dictionary from "../../Dictionary";
import clonedeep from "lodash.clonedeep";
import colors from "colors";

const defaultDict = {
  foo: ["bar"],
  ice: ["ice", "baby", "pick", "cream"],
  bread: ["cheesy", "garlic", "sourdough", "bacon"],
  red: ["light", "rum", "is"],
};

export default function testClear() {
  console.log("=== CLEAR TESTS ===");
  testClearExisting();
  testClearEmpty();
}

const testClearExisting = () => {
  console.log("Test: Clear Existing");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  dictionary.clear();

  const dictKeys = Object.keys(dictionary.dictionary);
  // peek into the dictionary and make sure the keys were removed
  if (dictKeys.length > 0) {
    console.error(colors.red(`FAIL: expected no keys, got [${dictKeys}]`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testClearEmpty = () => {
  console.log("Test: Clear Existing");
  const dictionary = new Dictionary();
  dictionary.clear();

  const dictKeys = Object.keys(dictionary.dictionary);
  // peek into the dictionary and make sure the keys were removed
  if (dictKeys.length > 0) {
    console.error(colors.red(`FAIL: expected no keys, got [${dictKeys}]`));
    return;
  }

  console.log(colors.green("PASSED"));
};
