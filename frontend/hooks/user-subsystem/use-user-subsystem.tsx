import axios from "axios";
import { useAtom } from "jotai";
import { UserState, userAtom } from "@/stores/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserAlert from "@/app/(user-subsystem)/components/UserAlert";

/**
 * @author Louis Figes
 */

export const useUserSubsystem = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setUserState = ({ first_name, last_name, email, token }: { first_name: string; last_name: string; email: string; token: string }) => {
    setUser({ firstName: first_name, lastName: last_name, email, token });
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      });
      setUserState(response.data.data.user);
      localStorage.setItem("token", response.data.data.jwt);
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoading(false);
      return error.response.data.message;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
      setUserState(response.data.data.user);
      localStorage.setItem("token", response.data.data.jwt);
      router.push("/profile");
    } catch (error: any) {
      console.error("Register failed:", error);
      setLoading(false);
      return error.response.data.message;
    }
  };

  const editUser = async(data: any) => {
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:8080/user/edit", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
      if(response.data.success) {
        setUserState(response.data.data.user);
        setLoading(false);
        return response.data.message;
      } else {
        console.error("Profile update failed:", response.data.message);
        setLoading(false);
        return 
      }
    } catch (error: any) {
      console.error("Profile update failed:", error);
      setLoading(false);
      return error.response.data.message;
    }
  }

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserState(response.data.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Get current user failed:", error);
      setLoading(false);
    }
  };

  const oAuthLogin = async (redirectUri:string, data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(redirectUri, data);
      setUserState(response.data.data.user);
      localStorage.setItem("token", response.data.data.jwt);
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoading(false);
      return error.response.data.message;
    }
  }

  return {
    login,
    getCurrentUser,
    register,
    oAuthLogin,
    editUser,
    user,
    loading,
  };
};
