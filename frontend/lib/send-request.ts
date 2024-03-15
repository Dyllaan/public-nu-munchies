import { Endpoints } from "@/config/endpoints";
import { mainConfig } from "@/config/main";

export const sendRequest = async <T>(
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
    body: method === "GET" ? undefined : formData,
    headers: getHeaders(),
  });
  return response.json();
};

const getHeaders = () => {
  if (typeof localStorage !== "undefined")
    // unfortunaltely it wont work from server-side as we store user token in local storage which is client side only
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  return undefined;
};
