import React, { createContext, useContext, useReducer } from "react";

type FakeAuthType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type AuthContextType = {
  user: FakeAuthType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthStateType = {
  user: FakeAuthType | null;
  isAuthenticated: boolean;
};

type AuthActionType =
  | { type: "login"; payload: FakeAuthType }
  | { type: "logout" };

const initialState: AuthStateType = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: AuthStateType, action: AuthActionType): AuthStateType {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  // user and isAuthenticated comes from the 'state' object
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
