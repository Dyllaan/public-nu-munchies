import React from 'react';
import UserImpactStats from '../components/UserImpactStats';
import BusinessImpactStats from '../components/BusinessImpactStats';
import { Button } from "@/components/ui/button";
import useDataFetching from '@/hooks/analytics-subsystem/use-analytics-subsystem';
import requireAuth from "../../(user-subsystem)/components/auth/requireAuth";
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';

function ProfileComponent() {
  const { data: userData, isLoading: userLoading, error: userError } = useDataFetching("http://localhost:8080/analytics/user-stats");
  const { data: businessData, isLoading: businessLoading, error: businessError } = useDataFetching("http://localhost:8080/analytics/business-stats");
  const { user, userTypes } = useUserSubsystem();

  if (userLoading || businessLoading) {
    return <div>Loading...</div>;
  }

  if (userError || businessError) {
    return <div>Error: {userError || businessError.message}</div>;
  }

  if ((!userData || !userData.data) && (!businessData || !businessData.data)) {
    return <div>No data available</div>;
  }

  const isCouncillor = user && user.type === 'councillor';
  const isBusiness = businessData && businessData.data && businessData.data.businessId !== null;
 if (isBusiness) {
    // User's account is also assigned to a business
    return (
      <div className="m-2 flex items-center justify-center">
        <div className="w-1/4 lg:w-1/1 shadow-lg">
          <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-green-400">
            <div className="flex items-center justify-center">
              <div className="icon w-14 p-3.5 bg-green-400 text-white rounded-full mr-3 flex justify-center items-center">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div className="m-2 mt-2 mb-2">
              <Button>
                <a href="/impact-stats">Want to see your impact stats? Click here</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // User is logged in as just a user, not a business
    return (
      <div className="m-2">
        <UserImpactStats
          preventedWaste={userData.data.preventedWaste}
          ordersPlaced={userData.data.ordersPlaced}
          businessesHelped={userData.data.businessesHelped}
          userPoints={userData.data.userPoints}
        />
        <div className="m-2 mt-2 mb-2">
              <Button>
                <a href="/impact-stats">Want to see all your impact stats? Click here</a>
              </Button>
      </div>
      </div>
    );
  }
}

export default requireAuth(ProfileComponent);

