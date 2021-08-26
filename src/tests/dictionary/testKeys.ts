import Dictionary from "../../Dictionary";
import clonedeep from "lodash.clonedeep";
import colors from "colors";

const defaultDict = {
  foo: ["bar"],
  ice: ["ice", "baby", "pick", "cream"],
  bread: ["cheesy", "garlic", "sourdough", "bacon"],
  red: ["light", "rum", "is"],
};

export default function testKeys() {
  console.log("=== KEYS TESTS ===");
  testGetKeys();
  testEmptyKeys();
}

const testGetKeys = () => {
  console.log("Test: Get Keys");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const dictKeys = dictionary.keys();

  // the default dictionary has 4 keys
  if (dictKeys?.length !== 4) {
    console.error(colors.red(`FAIL: expected 4 keys, got ${dictKeys?.length}`));
    return;
  }

  if (
    !dictKeys.includes("foo") ||
    !dictKeys.includes("ice") ||
    !dictKeys.includes("bread") ||
    !dictKeys.includes("red")
  ) {
    console.error(colors.red(`FAIL: missing key in keys, got [${dictKeys}]`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testEmptyKeys = () => {
  console.log("Test: Empty Keys");
  const dictionary = new Dictionary();
  const dictKeys = dictionary.keys();

  if (dictKeys?.length !== 0) {
    console.error(colors.red(`FAIL: expected 0 keys, got ${dictKeys?.length}`));
    return;
  }

  console.log(colors.green("PASSED"));
};
