import { createContext, useContext, useState } from "react";
import { LoginFields, UserData } from "@/types/shared-types/auth-types";
import { useToast } from "@chakra-ui/react";
import { Login } from "@/services/AuthService";

type Props = { children: JSX.Element | JSX.Element[] };
export type AuthContextType = {
  user: UserData | null;
  login: (userData: LoginFields) => Promise<boolean>;
  logout: () => void;
};

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
    return true;
  };

  const logout = () => {
    console.log("logout ");
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
