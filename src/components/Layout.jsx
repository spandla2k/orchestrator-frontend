import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div>
      <header style={{ padding: 15, borderBottom: "1px solid #ccc" }}>
        <strong>Resume Job Console</strong>
        {user && (
          <span style={{ float: "right" }}>
            {user.email} &nbsp;
            <button onClick={logout}>Logout</button>
          </span>
        )}
      </header>
      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}
