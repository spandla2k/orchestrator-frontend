import { createContext, useContext, useState, useEffect } from "react";
import { getMe, login, signup } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on startup
  useEffect(() => {
    let isMounted = true;

    async function init() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const me = await getMe();
        if (isMounted) setUser(me);
      } catch (err) {
        // Invalid token → clear silently
        localStorage.clear();
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const doLogin = async (email, password) => {
    const res = await login({ email, password });
    localStorage.setItem("accessToken", res.access_token);
    localStorage.setItem("refreshToken", res.refresh_token);
    setUser({ id: res.id, email });
  };

  const doSignup = async (email, password) => {
    const res = await signup({ email, password });
    localStorage.setItem("accessToken", res.access_token);
    localStorage.setItem("refreshToken", res.refresh_token);
    setUser({ id: res.id, email });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return <AuthContext.Provider value={{ user, loading, setUser, doLogin, doSignup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
