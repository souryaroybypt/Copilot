import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Main App component for the Vite + React Demo.
 * Fetches and displays a list of users, supports searching, sorting, favoriting, and shows API response.
 */
function App() {
  /**
   * State: count - Tracks the number of button clicks.
   * @type {[number, Function]}
   */
  const [count, setCount] = useState(0);

  /**
   * State: users - Stores the fetched user list.
   * @type {[Array, Function]}
   */
  const [users, setUsers] = useState([]);

  /**
   * State: loading - Indicates if user data is being loaded.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State: search - Stores the current search query for filtering users.
   * @type {[string, Function]}
   */
  const [search, setSearch] = useState("");

  /**
   * State: sortAZ - Determines sort order (true: A→Z, false: Z→A).
   * @type {[boolean, Function]}
   */
  const [sortAZ, setSortAZ] = useState(true);

  /**
   * State: favorites - Stores IDs of favorited users.
   * @type {[Array<number>, Function]}
   */
  const [favorites, setFavorites] = useState([]);

  /**
   * State: apiResponse - Stores the raw API response for display.
   * @type {[Object|null, Function]}
   */
  const [apiResponse, setApiResponse] = useState(null);

  /**
   * State: status - Tracks fetch status: 'idle', 'loading', 'success', 'error'.
   * @type {[string, Function]}
   */
  const [status, setStatus] = useState("idle");

  /**
   * State: fetchTime - Time taken to fetch users (ms).
   * @type {[number, Function]}
   */
  const [fetchTime, setFetchTime] = useState(0);

  /**
   * State: error - Stores error messages for display.
   * @type {[string, Function]}
   */
  const [error, setError] = useState("");

  /**
   * Fetches users from the API and updates state accordingly.
   * Handles loading, error, and fetch timing.
   * @async
   * @returns {Promise<void>}
   */
  const fetchUsers = async () => {
    setLoading(true);
    setStatus("loading");
    setError("");
    const start = performance.now();
    try {
      const res = await fetch("https://dummyjson.com/users");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setUsers(data.users);
      setApiResponse(data);
      setStatus("success");
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      setStatus("error");
      setUsers([]);
      setApiResponse(null);
    } finally {
      setFetchTime(performance.now() - start);
      setLoading(false);
    }
  };

  /**
   * useEffect Hook: Fetches users on initial component mount.
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Toggles a user's favorite status by ID.
   * @param {number} id - User ID to toggle favorite.
   */
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  /**
   * Filters and sorts users based on search query and sort order.
   * @type {Array}
   */
  const filteredUsers = users
    .filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAZ
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );

  // --- JSX Rendering ---
  return (
    <div className="app-root">
      {/* App Title */}
      <h1>Vite + React Demo</h1>

      {/* Counter Card */}
      <div className="card">
        {/* Button to increment count */}
        <button onClick={() => setCount((n) => n + 1)}>count is {count}</button>
      </div>

      {/* Controls: Search, Sort, Refresh */}
      <div className="controls">
        {/* Search input for filtering users */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Sort order toggle */}
        <button onClick={() => setSortAZ((v) => !v)}>
          Sort: {sortAZ ? "A → Z" : "Z → A"}
        </button>
        {/* Refresh user list */}
        <button onClick={fetchUsers}>Refresh</button>
      </div>

      {/* Loading, Error, and Status Messages */}
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      <p>Status: {status}</p>
      {status === "success" && (
        <p className="success">
          Fetched {users.length} users in {fetchTime.toFixed(0)} ms
        </p>
      )}

      {/* No users found message */}
      {filteredUsers.length === 0 && !loading && !error && (
        <p>No users found.</p>
      )}

      {/* User Grid: Displays filtered and sorted users */}
      <div className="user-grid">
        {filteredUsers.map((u) => (
          <div key={u.id} className="user-card">
            {/* User image */}
            <img src={u.image} alt={u.firstName} className="user-img" />
            {/* User name */}
            <h3>
              {u.firstName} {u.lastName}
            </h3>
            {/* User email and age */}
            <p>Email: {u.email}</p>
            <p>Age: {u.age}</p>
            {/* Favorite toggle button */}
            <button
              className={
                favorites.includes(u.id) ? "favorite active" : "favorite"
              }
              onClick={() => toggleFavorite(u.id)}
            >
              {favorites.includes(u.id) ? "★ Favorited" : "☆ Favorite"}
            </button>
            {/* Expandable details for user object */}
            <details>
              <summary>More details</summary>
              <pre>{JSON.stringify(u, null, 2)}</pre>
            </details>
          </div>
        ))}
      </div>

      {/* Raw API Response (collapsible) */}
      <details className="raw-response">
        <summary>Raw API Response</summary>
        <pre>
          {apiResponse ? JSON.stringify(apiResponse, null, 2) : "No data yet"}
        </pre>
      </details>
    </div>
  );
}

export default App;
