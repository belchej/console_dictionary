import { validateKeyValuePair, validateKey } from "./utils/dictionaryUtils";
import DoesNotExistError from "./errors/DoesNotExistError";
import AlreadyExistsError from "./errors/AlreadyExistsError";

export default class Dictionary {
  // this will be an object used to track key value pairs
  dictionary: any;

  constructor(initialDictionary: any = null) {
    // don't let the dictionary get cleared if the constructor is called again
    if (!this.dictionary) {
      // testing hook
      if (initialDictionary) {
        this.dictionary = initialDictionary;
      } else {
        this.dictionary = {};
      }
    }
  }

  keys(): string[] {
    const keys = Object.keys(this.dictionary);

    if (keys.length === 0) {
      console.log("empty");
      return [];
    }

    keys.forEach((key: string, i: number) => {
      console.log(`${i + 1}) ${key}`);
    });

    return keys;
  }

  members(keyParam: string[]): string[] {
    const key = validateKey(keyParam);

    // if the string list exists for this key
    const members = this.dictionary[key];
    if (members) {
      members.forEach((member: string, i: number) => {
        console.log(`${i + 1}) ${member}`);
      });

      return members;
    } else {
      throw new DoesNotExistError("key does not exist");
    }
  }

  add(keyValuePair: string[]): void {
    // extract the key and value
    const { key, value } = validateKeyValuePair(keyValuePair);

    // if there is no key for this, add a new key/list
    if (!this.dictionary[key]) {
      this.dictionary[key] = [value];
    }
    // if the key exists, and the value is not in the list, add it
    else if (!this.dictionary[key].includes(value)) {
      this.dictionary[key].push(value);
    }
    // otherwise it's already there
    else {
      throw new AlreadyExistsError("member already exists for key");
    }
  }

  remove(keyValuePair: string[]): void {
    // extract the key and value
    const { key, value } = validateKeyValuePair(keyValuePair);

    const members = this.dictionary[key];
    if (members) {
      // check if the member exists (and grab the index)
      const valueIndex = members.indexOf(value);

      // if the member exists, remove it
      if (valueIndex >= 0) {
        members.splice(valueIndex, 1);
        console.log(`Removed: ${value}`);

        // if that was the last member, delete the key
        if (members.length === 0) {
          delete this.dictionary[key];
        }
      } else {
        throw new DoesNotExistError("member does not exist");
      }
    } else {
      throw new DoesNotExistError("key does not exist");
    }
  }

  removeall(keyParam: string[]): void {
    const key = validateKey(keyParam);

    if (this.dictionary[key]) {
      delete this.dictionary[key];
      console.log(`Removed: ${key}`);
    } else {
      throw new DoesNotExistError("key does not exist");
    }
  }

  clear(): void {
    this.dictionary = {};
    console.log("Cleared");
  }

  keyexists(keyParam: string[]): boolean {
    const key = validateKey(keyParam);

    const exists = Boolean(this.dictionary[key]);
    console.log(`${exists}`);
    return exists;
  }

  memberexists(keyValuePair: string[]): boolean {
    const { key, value } = validateKeyValuePair(keyValuePair);

    const exists = Boolean(this.dictionary[key]?.includes(value));
    console.log(`${exists}`);
    return exists;
  }

  allmembers(): string[] {
    const keys = Object.keys(this.dictionary);

    // if there are no keys, then there are no members
    if (keys.length === 0) {
      console.log("empty");
      return [];
    }

    const allMembers: string[] = [];
    let counter = 1;

    for (const key of keys) {
      for (const member of this.dictionary[key]) {
        console.log(`${counter++}) ${member}`);
        allMembers.push(member);
      }
    }

    return allMembers;
  }

  items(): string[] {
    const keys = Object.keys(this.dictionary);

    // if there are no keys, then there are no items
    if (keys.length === 0) {
      console.log("empty");
      return [];
    }

    const items: string[] = [];
    let counter = 1;

    for (const key of keys) {
      for (const member of this.dictionary[key]) {
        const item = `${key}: ${member}`;
        console.log(`${counter++}) ${item}`);
        items.push(item);
      }
    }

    return items;
  }
}
