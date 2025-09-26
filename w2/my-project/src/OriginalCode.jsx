import { useState as $s, useEffect as $e } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function OriginalCode() {
  const [α, setα] = $s(0);
  const [β, setβ] = $s([]);
  const [γ, setγ] = $s(false);
  const [ε, setε] = $s("");
  const [ζ, setζ] = $s(true);
  const [η, setη] = $s([]);
  const [θ, setθ] = $s(null);
  const [ι, setι] = $s("idle");
  const [κ, setκ] = $s(0);

  const _0x1 = () => {
    setγ(true);
    setι("loading");
    const _s = performance.now();
    var _$ = new XMLHttpRequest();
    _$.open("GET", "https://dummyjson.com/users", true);
    _$.onload = function () {
      setκ(performance.now() - _s);
      const __ = JSON.parse(_$.responseText);
      setβ(__.users);
      setθ(__);
      setι("success");
      setγ(false);
    };
    _$.send();
  };

  $e(() => {
    _0x1();
  }, []);

  const _0xF = (id) => {
    setη((p) => (p.includes(id) ? p.filter((q) => q !== id) : [...p, id]));
  };

  const _f = β
    .filter((u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(ε.toLowerCase())
    )
    .sort((a, b) =>
      ζ
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        color: "#f0f0f0",
        padding: "0rem",
        margin: "0",
      }}
    >
      <h1 style={{ color: "#f0f0f0" }}>Vite + React Demo</h1>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setα((n) => n + 1)}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          count is {α}
        </button>
      </div>

      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Search users..."
          value={ε}
          onChange={(e) => setε(e.target.value)}
          style={{
            marginRight: "0.5rem",
            background: "#1e1e1e",
            border: "1px solid #444",
            color: "#f0f0f0",
            padding: "0.5rem",
            borderRadius: "6px",
          }}
        />
        <button
          onClick={() => setζ(!ζ)}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "0.5rem",
          }}
        >
          Sort: {ζ ? "A → Z" : "Z → A"}
        </button>
        <button
          onClick={_0x1}
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {γ && <p>Loading users...</p>}
      <p>Status: {ι}</p>
      {ι === "success" && (
        <p style={{ color: "#22c55e" }}>
          Fetched {β.length} users in {κ.toFixed(0)} ms
        </p>
      )}

      {_f.length === 0 && !γ && <p>No users found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {_f.map((u) => (
          <div
            key={u.id}
            className="user-card"
            style={{
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "1rem",
              background: "#1e1e1e",
              color: "#f0f0f0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            <img
              src={u.image}
              alt={u.firstName}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3 style={{ color: "#f9fafb", margin: "0.5rem 0" }}>
              {u.firstName} {u.lastName}
            </h3>
            <p style={{ margin: "0.25rem 0", color: "#d1d5db" }}>
              Email: {u.email}
            </p>
            <p style={{ margin: "0.25rem 0", color: "#d1d5db" }}>
              Age: {u.age}
            </p>
            <button
              onClick={() => _0xF(u.id)}
              style={{
                background: η.includes(u.id) ? "#eab308" : "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "0.5rem",
              }}
            >
              {η.includes(u.id) ? "★ Favorited" : "☆ Favorite"}
            </button>
            <details style={{ marginTop: "0.5rem" }}>
              <summary style={{ cursor: "pointer", color: "#60a5fa" }}>
                More details
              </summary>
              <pre
                style={{
                  fontSize: "0.75rem",
                  background: "#2a2a2a",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  color: "#f0f0f0",
                }}
              >
                {JSON.stringify(u, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>

      <details style={{ marginTop: "1rem" }}>
        <summary style={{ color: "#60a5fa" }}>Raw API Response</summary>
        <pre
          style={{
            fontSize: "0.8rem",
            background: "#2a2a2a",
            color: "#f0f0f0",
            padding: "0.5rem",
            borderRadius: "6px",
          }}
        >
          {θ ? JSON.stringify(θ, null, 2) : "No data yet"}
        </pre>
      </details>
    </div>
  );
}

export default OriginalCode;