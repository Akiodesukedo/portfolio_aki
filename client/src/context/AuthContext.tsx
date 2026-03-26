import { ReactNode, createContext, useContext, useState } from "react"

type User = {
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isAdmin: boolean
  loading: boolean
  loginWithGoogle: (token: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const fetchURL = import.meta.env.VITE_BACKEND_URL

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async (googleToken: string) => {
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

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);
      setToken(googleToken);
      setIsAdmin(data.isAdmin);  

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
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