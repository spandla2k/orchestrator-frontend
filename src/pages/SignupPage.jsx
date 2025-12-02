import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { doSignup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await doSignup(email, password);
      window.location.href = "/jobs";
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Signup</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <br />
      <button>Signup</button>
      <p>
        <a href="/login">Login</a>
      </p>
    </form>
  );
}
