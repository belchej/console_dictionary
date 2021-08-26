import Dictionary from "../../Dictionary";
import clonedeep from "lodash.clonedeep";
import colors from "colors";

const defaultDict = {
  ice: ["cream"],
  bread: ["cheesy", "garlic"],
};

export default function testItems() {
  console.log("=== ITEMS TESTS ===");
  testGetItems();
  testEmptyItems();
}

const testGetItems = () => {
  console.log("Test: Get Items");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const items = dictionary.items();

  // the dictionary has 3 items
  if (items?.length !== 3) {
    console.error(colors.red(`FAIL: expected 3 members, got ${items?.length}`));
    return;
  }

  if (
    !items.includes("ice: cream") ||
    !items.includes("bread: cheesy") ||
    !items.includes("bread: garlic")
  ) {
    console.error(colors.red(`FAIL: missing item in items, got [${items}]`));
    return;
  }

  console.log(colors.green("PASSED"));
};

const testEmptyItems = () => {
  console.log("Test: Get Empty Items");
  const dictionary = new Dictionary();
  const items = dictionary.items();

  if (items?.length !== 0) {
    console.error(colors.red(`FAIL: expected 0 items, got ${items?.length}`));
    return;
  }

  console.log(colors.green("PASSED"));
};
