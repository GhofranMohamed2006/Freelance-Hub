import { createContext, useContext, useState } from "react";
import { registerUser, loginUser } from "../../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("lynk_token"));

  const persistSession = ({ token, user }) => {
    if (token) {
      localStorage.setItem("lynk_token", token);
      setToken(token);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };

  const register = async (formData) => {
    const response = await registerUser(formData);

    const data = response.data || response;

    persistSession(data);

    return data;
  };

  

  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password,
    });

    const data = response.data || response;

    persistSession(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("lynk_token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
