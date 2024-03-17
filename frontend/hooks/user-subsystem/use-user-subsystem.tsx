import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/auth";
import { atom } from "jotai";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import * as api from './api'; 
import { toast } from "sonner";
import { set } from "react-hook-form";
import RedirectTo from "@/app/(user-subsystem)/components/RedirectTo";
import { json } from "stream/consumers";

/**
 * @author Louis Figes
 */
export const loadingAtom = atom(false);
export const loggedAtom = atom(false);
export const oAuthAtom = atom(false);

export const useUserSubsystem = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoadingState] = useAtom(loadingAtom);
  const [logged, setLoggedState] = useAtom(loggedAtom);
  const [requestLoading, setRequestLoading ] = useState(false);
  const [isOAuth, setIsOAuth] = useAtom(oAuthAtom);
  const router = useRouter();
  

  const setUserState = ({ first_name, last_name, email, verified, created_at, allowed}: { first_name: string; last_name: string; email: string; verified: boolean; created_at: string, allowed: boolean}) => {
    setUser({ firstName: first_name, lastName: last_name, email, verified, created_at, allowed});
  };

  const setLoading = (state:boolean) => {
    setLoadingState((loading) => state);
  }
  const setLogged = (state:boolean) => {
    setLoggedState((logged) => state);
  }

  const setOAuth = (state:boolean) => {
    setIsOAuth((isOAuth) => state);
  }

  function checkForOAuth(response:any) {
    if(response.data.data.user.oauth) {
      setOAuth(true);
    }
  }

  async function checkToken() {
    if (loading || logged) return;
    if(localStorage.getItem('token') === null){
      return;
    }
    if(localStorage.getItem('token') !== null && !logged) {
      setLoading(true);
      const response = await api.get("user", localStorage.getItem("token"));
      if(response.success) {
        setUserState(response.data.data.user);
        setLoading(false);
        setLogged(true);
        checkForOAuth(response);
      } else {
        console.error("Failed to get user:", response.data.message);
        toast.error(`Please relogin: ${response.data.message}`);
        localStorage.removeItem('token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loginData = new FormData();
      loginData.append("email", email);
      loginData.append("password", password);
      const response = await api.post("user/login", loginData);
      if (response.success) {
        localStorage.setItem("token", response.data.data.jwt);
        setUserState(response.data.data.user);
        setLogged(true);
        router.replace("/profile");
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
        return response.data.message;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
      return error.response.data.message;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setLoading(true);
    try {
      const registerData = new FormData();
      registerData.append("first_name", firstName);
      registerData.append("last_name", lastName);
      registerData.append("email", email);
      registerData.append("password", password);
      
      const response = await api.post("user/register", registerData);
      if (response.success) {
        localStorage.setItem("token", response.data.data.jwt);
        setUserState(response.data.data.user);
        setLogged(true);
        router.replace("/profile");
        setLoading(false);
        return response.data.message;
      } else {
        toast.error(response.data.message);
        setLoading(false);
        return response.data.message;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Register failed:", error);
      setLoading(false);
      return error.response.data.message;
    }
  };
  

  const editUser = async(data:any) => {
    try {
      const response = await api.put("user/edit", data, localStorage.getItem("token"));
      if (response.success) {
        setUserState(response.data.data.user);
        setLoading(false);
        localStorage.setItem("token", response.data.data.jwt);
        router.replace("/profile");
      } else {
        toast.error(response.data.message);
        setLoading(false);
        return response.data.message;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Edit user failed:", error);
      setLoading(false);
      return error.response.data.message;
    }
  }

  const checkOTP = async (otp: string, type:string) => {
    setRequestLoading(true);
    const otpData = new FormData();
    otpData.append("token", otp);
    otpData.append("type", type);
    try {
      const response = await api.post("user/verify-email-token", otpData, localStorage.getItem("token"));
      if (response.success) {
        setUserState(response.data.data.user);
        toast.success("Email verified!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
    setRequestLoading(false);
  }

  const requestNewOTP = async (type: string) => {
    setRequestLoading(true);
    try {
      let endpoint = "user/resend-otp?type=" + type;
      const response = await api.get("user/resend-otp", localStorage.getItem("token"));
      if (response.success) {
        toast.success("Email sent!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
    setRequestLoading(false);
  }

  const requestPasswordReset = async (email:string) => {
    setRequestLoading(true);
    const data = new FormData();
    data.append("email", email);
    try {
      const response = await api.post("forgot-password", data);
      if (response.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
    setRequestLoading(false);
  }

  const changePassword = async (password: string, token: string) => {
    setRequestLoading(true);
    const data = new FormData();
    data.append("new_password", password);
    data.append("token", token)
    try {
      const response = await api.post("reset-password", data);
      if (response.success) {
        toast.success(response.data.message);
        return <RedirectTo to={"/login"} message={"Password Changed"} />
      } else {
        toast.error(response.data.message);
        return <RedirectTo to={"/login"} message={response.data.message} />
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      return <RedirectTo to={"/login"} message={error.response.data.message} />
    }
    setRequestLoading(false);
  }

  const oAuthLogin = async (redirectUri:string, data: any) => {
    try {
      const response = await axios.post(redirectUri, data);
      setUserState(response.data.data.user);
      localStorage.setItem("token", response.data.data.jwt);
      setLoading(false);
      setOAuth(true);
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.response.data.message);
      setLoading(false);
      return error.response.data.message;
    }
  }
 
  function logout() {
    localStorage.removeItem("token");
    setUserState({ first_name: "", last_name: "", email: "", verified: false, created_at: ""});
    setLogged(false);
    setLoading(false);
    setOAuth(false);
    router.replace("/");
  }

  return {
    login,
    register,
    oAuthLogin,
    editUser,
    logout,
    checkOTP,
    requestNewOTP,
    requestPasswordReset,
    changePassword,
    checkToken,
    requestLoading,
    logged,
    loading,
    user,
    isOAuth,
  };
};

export default useUserSubsystem;
