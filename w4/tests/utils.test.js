const { parseNumbers, mathStats, fetchUser } = require("../src/utils");

// Table-driven tests for parseNumbers
describe("parseNumbers", () => {
  const cases = [
    { input: "1,2,3", expected: [1, 2, 3] },
    { input: " 4 , 5 , 6 ", expected: [4, 5, 6] },
    { input: "", expected: [] },
    { input: "0", expected: [0] },
  ];
  cases.forEach(({ input, expected }) => {
    test(`parses "${input}"`, () => {
      expect(parseNumbers(input)).toEqual(expected);
    });
  });

  test("throws on non-string input", () => {
    expect(() => parseNumbers(123)).toThrow();
  });

  test("throws on invalid number", () => {
    expect(() => parseNumbers("1,foo,3")).toThrow();
  });
});

// Table-driven tests for mathStats
describe("mathStats", () => {
  const cases = [
    { input: [1, 2, 3], expected: { sum: 6, product: 6, average: 2 } },
    { input: [0, 0, 0], expected: { sum: 0, product: 0, average: 0 } },
    { input: [], expected: { sum: 0, product: 0, average: 0 } },
    { input: [-1, 1], expected: { sum: 0, product: -1, average: 0 } },
  ];
  cases.forEach(({ input, expected }) => {
    test(`stats for ${JSON.stringify(input)}`, () => {
      expect(mathStats(input)).toEqual(expected);
    });
  });

  test("throws on non-array input", () => {
    expect(() => mathStats("foo")).toThrow();
  });

  test("throws on array with non-number", () => {
    expect(() => mathStats([1, "a"])).toThrow();
  });
});

// Mock fetch for fetchUser
global.fetch = jest.fn((url) => {
  if (url.endsWith("/1")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: "John Doe" }),
    });
  }
  return Promise.resolve({ ok: false });
});

describe("fetchUser", () => {
  test("fetches user successfully", async () => {
    const user = await fetchUser(1);
    expect(user).toHaveProperty("id", 1);
  });

  test("throws on invalid user ID", async () => {
    await expect(fetchUser(-1)).rejects.toThrow();
  });

  test("throws on user not found", async () => {
    await expect(fetchUser(999)).rejects.toThrow();
  });
});
