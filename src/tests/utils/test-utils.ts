import colors from "colors";

// Expect an error and make sure it is the correct type
export const tryExpectError = (
  func: Function,
  errorType: string,
  testName: string
) => {
  try {
    func();
  } catch (error) {
    // if its the wrong error type, log error
    if (error.type !== errorType) {
      console.error(
        colors.red(`FAIL: incorrect error thrown from test: ${testName}`)
      );
    }
    // if the error is the correct type, the test passed
    else {
      console.log(colors.green("PASSED"));
    }
    return;
  }

  // return from catch guarentees no error was thrown
  console.error(colors.red(`FAIL: no error thrown from test: ${testName}`));
};
