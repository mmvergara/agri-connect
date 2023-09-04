import { createContext, useContext, useEffect, useState } from "react";
import { LoginFields, UserData } from "@/types/shared-types/auth-types";
import { useToast } from "@chakra-ui/react";
import { Login, Logout } from "@/services/AuthService";

type Props = { children: JSX.Element | JSX.Element[] };
export type AuthContextType = {
  user: UserData | null;
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
  const [user, setUser] = useState<UserData | null>(null);
  const toast = useToast();

  const login = async (userData: LoginFields) => {
    const { data, error } = await Login(userData);

    if (error) {
      toast({
        title: error,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
      return false;
    }
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
    console.log("Use Effect")
    const user = localStorage.getItem("user");
    if (user == "undefined" || user == null) {
      localStorage.removeItem("user");
      return;
    }
    const userData = JSON.parse(user) as UserData;
    if (new Date(userData.token_expiration).getTime() < new Date().getTime()) {
      localStorage.removeItem("user");
      console.log("Session Expired");
      return;
    }
    if (user) setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
