import testAdd from "./testAdd";
import testKeys from "./testKeys";
import testMembers from "./testMembers";
import testRemove from "./testRemove";
import testRemoveAll from "./testRemoveAll";
import testKeyExists from "./testKeyExists";
import testMemberExists from "./testMemberExists";
import testAllMembers from "./testAllMembers";
import testItems from "./testItems";

export default function testDictionary() {
  // break each part out into its own tests to organize them better
  console.log();
  console.log("=== DICTIONARY TESTS ===");
  console.log();
  testKeys();
  testMembers();
  testAdd();
  testRemove();
  testRemoveAll();
  testKeyExists();
  testMemberExists();
  testAllMembers();
  testItems();
}
