import Shell from "../../Shell";
import colors from "colors";

export default function testShell() {
  // not breaking out since it only contains one method to test
  console.log();
  console.log("=== SHELL TESTS ===");
  console.log();

  testExecuteValidCalls();
  testTryExecuteInvalidCalls();
}

const testExecuteValidCalls = () => {
  console.log("Test: Execute Valid Calls");

  const shell = new Shell();
  const key = "foo";
  const value = "bar";

  shell.tryExecute(`add ${key} ${value}`);

  const keys = shell.tryExecute("keys");

  if (keys?.length !== 1 || keys[0] !== key) {
    console.error(colors.red(`FAIL: missing key in keys, got [${keys}]`));
    return;
  }

  const members = shell.tryExecute(`members ${key}`);

  if (members?.length !== 1 || members[0] !== value) {
    console.error(
      colors.red(`FAIL: missing member in members, got [${members}]`)
    );
    return;
  }

  console.log(colors.green("PASSED"));
};

const testTryExecuteInvalidCalls = () => {
  console.log("Test: Try Execute Invalid Calls");

  const shell = new Shell();
  try {
    shell.tryExecute("foo bar");
    shell.tryExecute("");
    shell.tryExecute("  test   data");
    shell.tryExecute("add    x     y");
  } catch {
    console.error(colors.red("FAIL: exception while executing"));
    return;
  }
  console.log(colors.green("PASSED"));
};
