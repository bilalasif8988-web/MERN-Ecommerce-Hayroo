import React, { useState } from "react";
import axios from "axios";
import { api } from "../../urlConfig";

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${api}/auth/admin-signup`, {
      name, email, password, cPassword
    });

    setMessage(res.data.success || res.data.error);
  };

  return (
    <div>
      <h2>Admin Signup</h2>

      <form onSubmit={submit}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirm Password" onChange={(e) => setCPassword(e.target.value)} />

        <button>Create Admin</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
