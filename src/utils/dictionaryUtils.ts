import InvalidParameters from "../errors/InvalidParameters";

interface KeyValuePair {
  key: string;
  value: string;
}

export const validateKeyValuePair = (keyValuePair: string[]): KeyValuePair => {
  // make sure we have the correct parameters
  if (!keyValuePair || keyValuePair.length !== 2) {
    throw new InvalidParameters("2 parameters required: key value");
  }

  // extract the key and value
  const key = keyValuePair[0];
  const value = keyValuePair[1];

  if (!key || !value) {
    throw new InvalidParameters("invalid parameters provided");
  }

  return { key, value };
};

export const validateKey = (keyParam: string[]): string => {
  if (!keyParam || keyParam.length !== 1) {
    throw new InvalidParameters("1 parameter required: key");
  }

  const key = keyParam[0];

  if (!key) {
    throw new InvalidParameters("invalid key provided");
  }

  return key;
};
