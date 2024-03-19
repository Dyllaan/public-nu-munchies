import axios from "axios";
import * as api from './api'; 
import { toast } from "sonner";
import useUserSubsystem from "./use-user-subsystem";
import { atom } from "jotai";
import { useAtom } from "jotai";
import { Form } from "react-hook-form";

/**
 * @author Louis Figes
 */

export const isModeratorAtom = atom(false);
export const loadingAtom = atom(false);
export const sendingRequestAtom = atom(false);

export const useModerator = () => {

    const [moderator, setIsModerator] = useAtom(isModeratorAtom);
    const [loadingStatus, setLoadingStatus] = useAtom(loadingAtom);
    const [sendingRequest, setSendingRequest] = useAtom(sendingRequestAtom);

    const setLoading = (state:boolean) => {
        setLoadingStatus((loadingStatus) => state);
    }

    const setMod = (state:boolean) => {
        setIsModerator((moderator) => state);
    }

    const setSending = (state:boolean) => {
      setSendingRequest((sendingRequest) => state);
    }

    async function checkModerator() {
        if(localStorage.getItem('token') === null){
          return;
        }
        if(localStorage.getItem('token') !== null && !moderator) {
          console.log("here");
          setLoading(true);
          const response = await api.get("moderator", localStorage.getItem("token"));
          if(response.success) {
            setMod(true);
          } else {
            toast.error("You are not a moderator");
          }
        }
        setLoading(false);
    }

    async function removeBusiness(businessId: string) {
        setSending(true);
        const data = new FormData();
        data.append("business_id", businessId);
        const response = await api.post("moderator/remove-business", data, localStorage.getItem("token")
        );
        if(response.success) {
          toast.success("Business removed");
        } else {
          toast.error("Failed to remove business");
        }
        setSending(false);
    }

    async function banUser(userId: string, ban:any) {
      setSending(true);
      const data = new FormData();
      data.append("user_id", userId);
      data.append("banned", ban);
      const response = await api.post("moderator/ban", data, localStorage.getItem("token")
      );
      if(response.success) {
        toast.success("User " + (ban ? "banned" : "unbanned") + " successfully");
      } else {
        toast.error("Failed to remove user");
      }
      setSending(false);
  }

    return {
        moderator,
        loadingStatus,
        checkModerator,
        removeBusiness,
        banUser,
        sendingRequest
    };
};

export default useModerator;
