import Dictionary from "../../Dictionary";
import clonedeep from "lodash.clonedeep";
import colors from "colors";

const defaultDict = {
  ice: ["cream"],
  bread: ["cheesy", "garlic"],
  red: ["rum"],
};

export default function testAllMembers() {
  console.log("=== ALL MEMBERS TESTS ===");
  testGetMembers();
  testEmptyMembers();
}

const testGetMembers = () => {
  console.log("Test: Get Members");
  const dictionary = new Dictionary(clonedeep(defaultDict));
  const allMembers = dictionary.allmembers();

  // the dictionary has 4 members
  if (allMembers?.length !== 4) {
    console.error(
      colors.red(`FAIL: expected 4 members, got ${allMembers?.length}`)
    );
    return;
  }

  if (
    !allMembers.includes("cream") ||
    !allMembers.includes("rum") ||
    !allMembers.includes("cheesy") ||
    !allMembers.includes("garlic")
  ) {
    console.error(
      colors.red(`FAIL: missing member in members, got [${allMembers}]`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};

const testEmptyMembers = () => {
  console.log("Test: Get Empty Members");
  const dictionary = new Dictionary();
  const allMembers = dictionary.allmembers();

  if (allMembers?.length !== 0) {
    console.error(
      colors.red(`FAIL: expected 0 members, got ${allMembers?.length}`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};
