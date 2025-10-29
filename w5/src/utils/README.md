# src/utils

This small utility folder adds a single shared API helper used across components.

Files added
- api.js — centralized fetch helper (exported functions: fetchJSON, getUsers, getProducts, getQuotes)
- README.md — this file

Why
- Removes duplicated fetch/error-handling logic from components (Users, Products, Quotes).
- Allows switching base URL (change DEFAULT_BASE) in one place.
- Easier to mock fetchJSON in tests.

How components were changed (summary)
- User.jsx: replaced inline fetch(...) + res.json() with `fetchJSON('users')` and setUsers(data.users)
- Products.jsx: replaced inline fetch(...) with `fetchJSON('products')`
- Quotes.jsx: replaced inline fetch(...) with `fetchJSON('quotes')`

Notes
- fetchJSON accepts either a relative endpoint (appended to https://dummyjson.com) or a full URL.
- Components expect the same JSON shape they had before (e.g. data.users, data.products).
- Keep changes minimal — components still map to same data properties.

Example usage
```js
import { fetchJSON } from '../utils/api'

const data = await fetchJSON('users')
console.log(data.users)