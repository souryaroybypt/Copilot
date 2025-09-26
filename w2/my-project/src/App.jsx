
// Deprecated/obfuscated code below (commented out):
/*
import { useState as $s, useEffect as $e } from "react";
function A() {
  const [α, setα] = $s(0);
  const [β, setβ] = $s([]);
  const [γ, setγ] = $s(false);
  const [ε, setε] = $s("");
  const [ζ, setζ] = $s(true);
  const [η, setη] = $s([]);
  const [θ, setθ] = $s(null);
  const [ι, setι] = $s("idle");
  const [κ, setκ] = $s(0);
  // ...rest of the code (see previous version)
}
*/

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortAZ, setSortAZ] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [status, setStatus] = useState("idle");
  const [fetchTime, setFetchTime] = useState(0);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const filteredUsers = users
    .filter((u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAZ
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );

  return (
    <div className="app-root">
      <h1>Vite + React Demo</h1>

      <div className="card">
        <button onClick={() => setCount((n) => n + 1)}>
          count is {count}
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAZ((v) => !v)}>
          Sort: {sortAZ ? "A → Z" : "Z → A"}
        </button>
        <button onClick={fetchUsers}>
          Refresh
        </button>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      <p>Status: {status}</p>
      {status === "success" && (
        <p className="success">
          Fetched {users.length} users in {fetchTime.toFixed(0)} ms
        </p>
      )}

      {filteredUsers.length === 0 && !loading && !error && <p>No users found.</p>}

      <div className="user-grid">
        {filteredUsers.map((u) => (
          <div key={u.id} className="user-card">
            <img src={u.image} alt={u.firstName} className="user-img" />
            <h3>
              {u.firstName} {u.lastName}
            </h3>
            <p>Email: {u.email}</p>
            <p>Age: {u.age}</p>
            <button
              className={favorites.includes(u.id) ? "favorite active" : "favorite"}
              onClick={() => toggleFavorite(u.id)}
            >
              {favorites.includes(u.id) ? "★ Favorited" : "☆ Favorite"}
            </button>
            <details>
              <summary>More details</summary>
              <pre>{JSON.stringify(u, null, 2)}</pre>
            </details>
          </div>
        ))}
      </div>

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

// export default A; // Deprecated, do not use