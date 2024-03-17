import { Endpoints } from "@/config/endpoints";

interface CreateBusinessRequest {
  name: string;
  description: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  email?: string;
  website?: string;
  category?: string;
}
export const useBusinessApi = () => {
  const createBusiness = async (data: CreateBusinessRequest) => {
    const response = await fetch(Endpoints.business, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  return {
    createBusiness,
  };
};
