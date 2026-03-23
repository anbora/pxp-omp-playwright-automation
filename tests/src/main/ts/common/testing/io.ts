export const IOUtils = {
  toString(value: unknown) {
    if (typeof value === "string") {
      return value;
    }
    if (value == null) {
      return "";
    }
    return String(value);
  },
  closeQuietly() {}
};
