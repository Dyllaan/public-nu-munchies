import axios from "axios";
import { useAtom } from "jotai";
import { UserState, userAtom } from "@/stores/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessAlert from "@/app/(user-subsystem)/components/SuccessAlert";
import ErrorAlert from "@/app/(user-subsystem)/components/ErrorAlert";

/**
 * @author Louis Figes
 */

export const useUserSubsystem = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [successMessages, setSuccessMessages] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  const setUserState = ({ name, email, token }: UserState) => {
    setUser({ name, email, token });
  };

  const showMessages = () => {
    if (successMessages.length > 0) {
      successMessages.map((message) => {
        <SuccessAlert message={message} />;
      });
    }
    if (errorMessages.length > 0) {
      errorMessages.map((message) => {
        <ErrorAlert message={message} />;
      });
    }
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
      setErrorMessages(error.response.data.message);
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        name: name,
        email: email,
        password: password,
      });
      setUserState(response.data.data.user);
      localStorage.setItem("token", response.data.data.jwt);
      router.push("/profile");
    } catch (error: any) {
      console.error("Register failed:", error);
      setErrorMessages(error.response.data.message);
      setLoading(false);
    }
  };

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

  return {
    login,
    getCurrentUser,
    register,
    user,
    loading,
    showMessages,
  };
};
