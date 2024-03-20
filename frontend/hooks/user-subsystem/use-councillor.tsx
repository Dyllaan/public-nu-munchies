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

export const isCouncillorAtom = atom(false);
export const loadingAtom = atom(false);
export const sendingRequestAtom = atom(false);

export const useCouncillor = () => {

    const [councillor, setIsCouncillor] = useAtom(isCouncillorAtom);
    const [loadingStatus, setLoadingStatus] = useAtom(loadingAtom);
    const [sendingRequest, setSendingRequest] = useAtom(sendingRequestAtom);

    const setLoading = (state:boolean) => {
        setLoadingStatus((loadingStatus) => state);
    }

    const setCouncillor = (state:boolean) => {
        setIsCouncillor((councillor) => state);
    }

    const setSending = (state:boolean) => {
      setSendingRequest((sendingRequest) => state);
    }

    async function checkCouncillor() {
        if(localStorage.getItem('token') === null){
          return;
        }
        if(localStorage.getItem('token') !== null && !councillor) {
          console.log("here");
          setLoading(true);
          const response = await api.get("councillor", localStorage.getItem("token"));
          if(response.success) {
            setCouncillor(true);
          } else {
            toast.error("You are not a councillor");
          }
        }
        setLoading(false);
    }

    return {
        councillor,
        loadingStatus,
        checkCouncillor,
        sendingRequest
    };
};

export default useCouncillor;
