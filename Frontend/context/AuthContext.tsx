import { createContext, useContext, useEffect, useState } from "react";
import { LoggedInUserData, LoginFields, UserData } from "@/types/shared-types";
import { Login, Logout } from "@/services/AuthService";

type Props = { children: JSX.Element | JSX.Element[] };
export type AuthContextType = {
  user: LoggedInUserData | null;
  login: (userData: LoginFields) => Promise<boolean>;
  logout: () => void;
};

// Intialize AuthContext
const initialAuthContextValue: AuthContextType = {
  user: null,
  login: async () => false,
  logout: () => {},
};
const AuthContext = createContext<AuthContextType>(initialAuthContextValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<LoggedInUserData | null>(null);
  const login = async (userData: LoginFields) => {
    const { data, error } = await Login(userData);
    if (error) return false;
    if (data) setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    Logout();
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user == "undefined" || user == null) {
      localStorage.removeItem("user");
      setLoading(false);
      return;
    }
    const userData = JSON.parse(user) as LoggedInUserData;
    if (!userData) {
      setLoading(false);
      return;
    }
    // Check if token is expired
    if (new Date(userData.token_expiration).getTime() < new Date().getTime()) {
      localStorage.removeItem("user");
      console.log("Session Expired");
      setLoading(false);
      return;
    }
    if (user) setUser(userData);
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
