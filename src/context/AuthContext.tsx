import { createContext, useContext, useState, useEffect } from 'react';
import { checkAuthCode } from '../helpers/authHelpers';

type AuthContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthCode());

  useEffect(() => {
    setIsAuthenticated(checkAuthCode());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated: setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
