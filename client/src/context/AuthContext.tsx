import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type User = {
  email: string
  name: string
}

type LoginResult = {
  user: User
  isAdmin: boolean
} | null

type AuthContextType = {
  user: User | null
  token: string | null
  isAdmin: boolean
  loading: boolean
  loginWithGoogle: (token: string) => Promise<LoginResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AUTH_STORAGE_KEY = "portfolio_auth";
const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const fetchURL = import.meta.env.VITE_BACKEND_URL

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // So this runs everytime a page roads within the provider. And this restores the auth status
  useEffect(() => {
    const rawAuthData = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawAuthData) {
      setLoading(false);
      return;
    }

    try {
      const parsedAuthData = JSON.parse(rawAuthData);

      if (!parsedAuthData.expiresAt || Date.now() > parsedAuthData.expiresAt) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setLoading(false);
        return;
      }

      setUser(parsedAuthData.user ?? null);
      setToken(parsedAuthData.token ?? null);
      setIsAdmin(Boolean(parsedAuthData.isAdmin));
    } catch (err) {
      console.error("Failed to restore auth:", err);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async (googleToken: string): Promise<LoginResult> => {
    try {
      setLoading(true);

      const res = await fetch(`${fetchURL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: googleToken })
      })

      const data = await res.json();
      console.log("auth response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const authData = {
        user: data.user,
        token: googleToken,
        isAdmin: data.isAdmin,
        expiresAt: Date.now() + TWO_DAYS_IN_MS
      };

      setUser(authData.user);
      setToken(googleToken);
      setIsAdmin(authData.isAdmin);  

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

      return {
        user: data.user,
        isAdmin: data.isAdmin
      };

    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAdmin, loading, loginWithGoogle, logout }}
    >
      { children }
    </AuthContext.Provider>
  )
} 

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}