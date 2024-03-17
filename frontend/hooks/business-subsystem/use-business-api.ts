import { registerFormSchema } from "@/app/(business-subsytem)/utils/register-formschema";
import { Endpoints } from "@/config/endpoints";
import { sendRequest } from "@/lib/send-request";
import { z } from "zod";

interface CreateBusinessRequest {
  name: string;
  description: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone?: string;
  email?: string;
}

type UserInput = z.infer<typeof registerFormSchema>;

export const useBusinessApi = () => {
  const createBusiness = async (data: UserInput) => {
    const requestBody: CreateBusinessRequest = {
      name: data.businessName,
      description: data.businessDescription,
      address: data.businessAddress,
      city: data.businessCity,
      postcode: data.businessPostcode,
      country: "United Kingdom",
      phone: data.businessPhoneNumber,
      email: data.businessEmail,
    };

    const res = await sendRequest<CreateBusinessRequest>(
      Endpoints.businessCreate,
      "POST",
      requestBody
    );

    return res;
  };

  const getMyBusinesses = async () => {
    const res = await sendRequest<{}>(Endpoints.myBusinesses, "GET", {});
    return res;
  };

  const getBusinesses = async () => {
    const res = await sendRequest<{}>(Endpoints.business, "GET", {});
    return res;
  };

  const getBusiness = async (id: string) => {
    const res = await sendRequest<{}>(Endpoints.business, "GET", {
      id,
    });
    return res;
  };

  const getItems = async (id: string) => {
    const res = await sendRequest<{}>(Endpoints.items, "GET", {
      id,
    });
    return res;
  };

  return {
    createBusiness,
    getBusinesses,
    getBusiness,
    getMyBusinesses,
    getItems,
  };
};
