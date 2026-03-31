// @ts-nocheck
type TestOrderValue = {
  getNumber(): number;
};

export const TestOrderEnum = new Proxy({} as Record<string, TestOrderValue>, {
  get: (_target, property) => ({
    getNumber: () => Number.parseInt(String(property).replace(/^_/, ""), 10)
  })
});
