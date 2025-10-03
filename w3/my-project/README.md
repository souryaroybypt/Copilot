# Vite + React User Directory Demo

## Overview

This module is a React app that demonstrates fetching, displaying, searching, sorting, and favoriting users from a remote API. It provides a responsive UI for interacting with user data, including search, sort, and favorite toggling, and displays the raw API response for debugging or learning purposes.

**Problem Solved:**  
It serves as a template or learning resource for developers who want to quickly scaffold a React app that interacts with an external API, manages multiple UI states, and demonstrates best practices for hooks, state management, and user interaction.

---

## Setup & Requirements

- **Node.js** (v16 or higher recommended)
- **npm** (v8 or higher recommended)
- This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [React](https://react.dev/).

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd my-project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage Example

The main component is `App.jsx`. It is rendered by default.  
You can use the UI to:

- Increment a counter.
- Search users by name.
- Sort users A→Z or Z→A.
- Mark users as favorites.
- Refresh the user list.
- Expand user details and view the raw API response.

**Example:**
```jsx
import React from "react";
import App from "./App";

function Root() {
  return <App />;
}
```

---

## Key Functions & Components

### `App` (Main Component)
- **Purpose:** Fetches and displays a list of users with search, sort, and favorite features.
- **Hooks Used:**
  - `useState` for managing UI and data state.
  - `useEffect` for fetching users on mount.
- **Key Functions:**
  - `fetchUsers`: Fetches user data from the API, handles loading/error states, and measures fetch time.
  - `toggleFavorite`: Adds/removes a user from the favorites list.
  - `filteredUsers`: Derived array of users filtered by search and sorted by name.
- **JSX Structure:**
  - Counter button
  - Search input, sort toggle, refresh button
  - User grid with favorite toggle and expandable details
  - Raw API response viewer

---

## Notes for New Developers

- **API Used:** [https://dummyjson.com/users](https://dummyjson.com/users)
- **Styling:** Basic styles are in `App.css`. You can customize as needed.
- **Error Handling:** All API errors are caught and displayed to the user.
- **Performance:** Fetch time is measured and displayed for learning purposes.
- **Extensibility:** You can add more user actions, fields, or connect to a different API easily.
- **Testing:** No automated tests are included, but the code is modular and easy to test.

---

## Contributing

Feel free to fork, open issues, or submit pull requests to improve this demo!

---
