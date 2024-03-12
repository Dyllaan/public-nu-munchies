import { registerFormSchema } from "@/app/(business-subsytem)/business/utils/register-formschema";
import { Endpoints } from "@/config/endpoints";
import { mainConfig } from "@/config/main";
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

export const useBusinessApi = () => {
  type UserInput = z.infer<typeof registerFormSchema>;

  const createBusiness = async (data: UserInput) => {
    console.log(data);
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

  // internal function to send request
  const sendRequest = async <T>(
    endpoint: Endpoints,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data: T
  ) => {
    // convert data to form data
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      if (typeof value === "string" || value instanceof Blob) {
        formData.append(key, value);
      }
    }
    // send request
    const response = await fetch(mainConfig.origin + "/" + endpoint, {
      method,
      body: formData,
    });
    return response.json();
  };

  return {
    createBusiness,
  };
};
