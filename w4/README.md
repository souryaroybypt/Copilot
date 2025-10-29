# JS Utility Module & Unit Tests

## Overview

This module provides three core functions:
- **parseNumbers(str):** Parses a comma-separated string into an array of numbers.
- **mathStats(arr):** Returns sum, product, and average of an array of numbers.
- **fetchUser(id):** Fetches user data from a public API.

## Unit Tests

Comprehensive unit tests are provided in `/tests/utils.test.js`:
- **Table-driven tests** for normal and edge cases.
- **Mocks** for API calls.
- **Edge cases**: invalid input types, empty arrays, invalid user IDs, and API errors.

## How to Run Tests

1. Install dependencies:
   ```
   npm install
   ```
2. Run tests:
   ```
   npm test
   ```
   (If using Jest, ensure `"test": "jest"` is in your package.json scripts.)

## Test Coverage

- **Edge cases covered:**  
  - Non-string input for parsing  
  - Invalid numbers in string  
  - Empty arrays for math  
  - Non-array input for math  
  - Invalid user IDs and API errors for fetchUser

- **Aim:** 80%+ coverage.  
  - See `testReport.html` for a summary.

## Test Report

After running tests, open `testReport.html` for a visual summary of pass/fail rates.

---

## Example Usage

```js
const { parseNumbers, mathStats, fetchUser } = require('./src/utils');

console.log(parseNumbers('1,2,3')); // [1,2,3]
console.log(mathStats([1,2,3])); // {sum:6, product:6, average:2}
fetchUser(1).then(console.log); // {id:1, name:'John Doe'}
```