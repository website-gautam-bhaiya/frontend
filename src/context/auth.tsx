import { ReactNode, createContext, useState, useEffect } from "react";
import { User } from "./news";
import axios, { AxiosError } from "axios";

// Define the BASE_URL
const BASE_URL = "https://backend-final-self.vercel.app/api/v1";

// Types
interface ErrorResponse {
  error: {
    statusCode: number;
  };
  message: string;
}

interface Auth {
  user: User;
  isLoggedIn: boolean;
}

interface Error {
  isErr: boolean;
  message: string;
  statusCode?: number;
  type: string;
}

type GlobalAuth = {
  auth: Auth;
  err: Error;
  resetStatus: boolean;
  authCheck: {
    isLoading: boolean;
    isAuthenticated: boolean;
  };
  users: User[];

  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  setErr: React.Dispatch<React.SetStateAction<Error>>;
  setResetStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthCheck: React.Dispatch<React.SetStateAction<{ isLoading: boolean; isAuthenticated: boolean }>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;

  logIn: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, passwordConfirm: string, token: string) => void;
  updatePassword: (currentPassword: string, password: string, passwordConfirm: string) => Promise<boolean>;
  onRefresh: () => void;
  logout: () => void;
  getAllUsers: () => void;
  addNewAuthor: (credentials: { name: string; email: string; password: string; passwordConfirm: string }) => Promise<boolean>;
  updateMyAccount: (updateData: { name?: string; email?: string }) => Promise<boolean>;
  deleteAuthor: (id: string) => Promise<boolean>;
};

// Context initialization
export const AuthContext = createContext<GlobalAuth>({
  auth: { user: { name: "", profilePhoto: "", email: "", role: "", _id: "" }, isLoggedIn: false },
  err: { isErr: false, message: "", statusCode: 200, type: "" },
  resetStatus: false,
  authCheck: { isAuthenticated: false, isLoading: true },
  users: [],
  setAuth: () => {},
  setErr: () => {},
  setResetStatus: () => {},
  setAuthCheck: () => {},
  setUsers: () => {},
  logIn: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
  updatePassword: () => Promise.reject(),
  onRefresh: () => {},
  logout: () => {},
  getAllUsers: () => {},
  addNewAuthor: () => Promise.reject(),
  updateMyAccount: () => Promise.reject(),
  deleteAuthor: () => Promise.reject(),
});

// Helper function for error handling
const handleError = (error: AxiosError<ErrorResponse>, setErr: React.Dispatch<React.SetStateAction<Error>>) => {
  if (error.message === "NetworkError") {
    setErr({ isErr: true, message: "Bad Connection", type: "Bad Connection", statusCode: 500 });
  } else if (error.response?.data.error.statusCode === 400) {
    setErr({ isErr: true, message: error.response.data.message, type: "DuplicateError", statusCode: 400 });
  } else {
    setErr({ isErr: true, message: "Something went wrong!", statusCode: 400, type: "Unknown" });
  }
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({ user: { name: "", profilePhoto: "", email: "", role: "", _id: "" }, isLoggedIn: false });
  const [err, setErr] = useState<Error>({ isErr: false, message: "", statusCode: 200, type: "" });
  const [authCheck, setAuthCheck] = useState<{ isLoading: boolean; isAuthenticated: boolean }>({ isLoading: true, isAuthenticated: false });
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("checkLoginStatus") as string)?.isLoggedIn) {
      onRefresh();
    } else {
      setAuthCheck({ isAuthenticated: false, isLoading: false });
    }
  }, [window.location]);

  // Refresh user authentication
  const onRefresh = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/refresh`, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      setAuth({ user: response.data.currentUser, isLoggedIn: true });
      setAuthCheck({ isAuthenticated: true, isLoading: false });
      setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
      setAuthCheck({ isAuthenticated: false, isLoading: false });
    }
  };

  // Log in a user
  const logIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setAuth({ user: response.data.user, isLoggedIn: true });
        setAuthCheck({ isAuthenticated: true, isLoading: false });
        sessionStorage.setItem("checkLoginStatus", JSON.stringify({ isLoggedIn: true }));
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
    }
  };

  // Forgot password
  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/forgotPassword`, { email }, { headers: { "Content-Type": "application/json" } });
      if (response.status === 200) {
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
    }
  };

  // Reset password
  const resetPassword = async (password: string, passwordConfirm: string, token: string) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/resetPassword/${token}`, { password, passwordConfirm }, { headers: { "Content-Type": "application/json" } });
      if (response.status === 200) {
        setResetStatus(true);
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
    }
  };

  // Log out user
  const logout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/logout`, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      if (response.status === 200) {
        setAuth({ user: { name: "", profilePhoto: "", email: "", role: "", _id: "" }, isLoggedIn: false });
        sessionStorage.clear();
        setAuthCheck({ isAuthenticated: false, isLoading: false });
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
    }
  };

  // Add a new author
  const addNewAuthor = async (credentials: { name: string; email: string; password: string; passwordConfirm: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/addAuthor`, credentials, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      if (response.status === 200) {
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        err,
        setErr,
        users,
        setUsers,
        logIn,
        forgotPassword,
        resetPassword,
        resetStatus,
        setResetStatus,
        logout,
        updatePassword: async () => false,
        onRefresh,
        authCheck,
        setAuthCheck,
        addNewAuthor,
        updateMyAccount: async () => false,
        getAllUsers: async () => {},
        deleteAuthor: async () => false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
