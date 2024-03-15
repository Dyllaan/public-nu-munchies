import { Endpoints } from "@/config/endpoints";
import { useBusinessApi } from "@/hooks/business-subsystem/use-business-api";
import { sendRequest } from "@/lib/send-request";

export default async function BusinessesPage() {
  const getBusinesses = async () => {
    const res = await sendRequest<{}>(Endpoints.business, "GET", {});
    return res;
  };

  const businesses = await getBusinesses();
  const { message } = businesses;
  return (
    <main>
      <h1>Businesses</h1>
      <p>List of businesses</p>

      <div>
        {message.map((business) => (
          <div key={business.id}>
            <h2>{business.name}</h2>
            <p>{business.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
