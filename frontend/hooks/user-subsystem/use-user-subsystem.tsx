import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/auth";
import { statusAtom } from "@/stores/authstatus";
import { useRouter } from "next/navigation";
import * as api from './api'; 
import { toast } from "sonner";

/**
 * @author Louis Figes
 */

export const useUserSubsystem = () => {
  const [user, setUser] = useAtom(userAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const router = useRouter();

  const setUserState = ({ first_name, last_name, email}: { first_name: string; last_name: string; email: string;}) => {
    setUser({ firstName: first_name, lastName: last_name, email });
  };

  const setAuthStatus = (loading: boolean, logged = false) => {
    setStatus({ loading, logged });
  };

  const login = async (email: string, password: string) => {
    setAuthStatus(true);
    try {
      const loginData = new FormData();
      loginData.append("email", email);
      loginData.append("password", password);
      const response = await api.post("user/login", loginData);
      if (response.success) {
        setUserState(response.data.data.user);
        localStorage.setItem("token", response.data.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        setAuthStatus(false, true);
        router.replace("/profile");
      } else {
        toast.error(response.data.message);
        setAuthStatus(false, false);
        return response.data.message;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Login failed:", error);
      setAuthStatus(false, false);
      return error.response.data.message;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setAuthStatus(true);
    try {
      const registerData = new FormData();
      registerData.append("first_name", firstName);
      registerData.append("last_name", lastName);
      registerData.append("email", email);
      registerData.append("password", password);
      
      const response = await api.post("user/register", registerData);
      if (response.success) {
        setUserState(response.data.data.user);
        localStorage.setItem("token", response.data.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        setAuthStatus(false, true);
        router.replace("/profile");
      } else {
        toast.error(response.data.message);
        setAuthStatus(false, false);
        return response.data.message;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Register failed:", error);
      setAuthStatus(false, false);
      return error.response.data.message;
    }
  };
  

  const editUser = async(data: any) => {
    setAuthStatus(true);
    try {
      const response = await api.put("user", data, localStorage.getItem("token"));
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        setUserState(response.data.data.user);
        setAuthStatus(false, true);
        router.replace("/profile");
      } else {
        toast.error(response.data.message);
        setAuthStatus(false, false);
        return response.data.message;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Edit user failed:", error);
      setAuthStatus(false, false);
      return error.response.data.message;
    }
  }

  const oAuthLogin = async (redirectUri:string, data: any) => {
    setAuthStatus(true);
    try {
      const response = await axios.post(redirectUri, data);
      setUserState(response.data.data.user);
      localStorage.setItem("token", response.data.data.jwt);
      setAuthStatus(false, true);
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.response.data.message);
      setAuthStatus(false, false);
      return error.response.data.message;
    }
  }


  function initFromLocalStorage() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setUserState(JSON.parse(user));
      setAuthStatus(false, true);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({ first_name: "", last_name: "", email: "" });
    setAuthStatus(false, false);
    router.replace("/");
  }

  return {
    login,
    register,
    oAuthLogin,
    editUser,
    initFromLocalStorage,
    logout,
    user,
    status,
  };
};

export default useUserSubsystem;
