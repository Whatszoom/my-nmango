"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [dbStatus, setDbStatus] = useState("Checking...");

  // fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.map((u) => u.name));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // save user
  const saveUser = async () => {
    if (!name) return;

    try {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setName("");
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // fetch DB status + users on load
  useEffect(() => {
    fetch("/api/db-status")
      .then((res) => res.json())
      .then((data) => setDbStatus(data.dbStatus))
      .catch(() => setDbStatus("Error"));

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Name</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name here"
      />

      <button onClick={saveUser} style={{ marginLeft: 10 }}>
        Save
      </button>

      {/* MongoDB Status */}
      <h3 style={{ marginTop: 20 }}>
        MongoDB Status:{" "}
        <span
          style={{
            color:
              dbStatus === "Connected"
                ? "green"
                : dbStatus === "Error"
                  ? "red"
                  : "orange",
          }}
        >
          {dbStatus}
        </span>
      </h3>

      <h2>Saved Names</h2>

      <ul>
        {users.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
