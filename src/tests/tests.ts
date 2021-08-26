import testDictionary from "./dictionary/testDictionary";
import testShell from "./shell/testShell";

(function runTests() {
  testDictionary();
  testShell();
  console.log("All Tests Ran");
})();
