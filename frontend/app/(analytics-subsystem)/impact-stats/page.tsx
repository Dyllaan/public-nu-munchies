'use client';
import React, { useState, useEffect } from 'react';
import requireAuth from "../../(user-subsystem)/components/auth/requireAuth";
import requireType from '@/app/(user-subsystem)/components/auth/requireType';
import UserImpactStats from '../components/UserImpactStats';
import BusinessImpactStats from '../components/BusinessImpactStats';
import { Separator } from "@/components/ui/separator";
import useDataFetching from '@/hooks/analytics-subsystem/use-analytics-subsystem';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader, TableRow, TableCell } from "@/components/ui/table";

function Page() {
  const { data: userData, isLoading: userLoading, error: userError } = useDataFetching("http://localhost:8080/analytics/user-stats");
  const { data: businessData, isLoading: businessLoading, error: businessError } = useDataFetching("http://localhost:8080/analytics/business-stats");
  const [showUserStats, setShowUserStats] = useState(true);

  useEffect(() => {
      const storedShowUserStats = localStorage.getItem('showUserStats');
      setShowUserStats(storedShowUserStats ? JSON.parse(storedShowUserStats) : true);
  }, []);

  const toggleStats = () => {
      const newValue = !showUserStats;
      setShowUserStats(newValue);
      localStorage.setItem('showUserStats', JSON.stringify(newValue));
  };

  if (userLoading || businessLoading) {
      return <div>Loading...</div>;
  }

  if (userError || businessError) {
      return <div>Error: {userError || businessError.message}</div>;
  }

  if ((!userData || !userData.data) && (!businessData || !businessData.data)) {
      return <div>No data available</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-2">Welcome, {showUserStats ? userData.data.userFirstName : businessData.data.usersName[0].business_name}!</h2>
      <div className="flex justify-center">
          <Button onClick={toggleStats}>
              {showUserStats ? "Show Business Stats" : "Show User Stats"}
          </Button>
      </div>
      <Separator className="my-6" />
      {showUserStats ? (
          <div>
          <UserImpactStats
              preventedWaste={userData.data.preventedWaste}
              ordersPlaced={userData.data.ordersPlaced}
              businessesHelped={userData.data.businessesHelped}
              userPoints={userData.data.userPoints}
          />
          
          <div>
        <div className="pt-8 pb-8"> 
          <h3 className="pb-2">Top User Ranks:</h3>
        <Table>
    <TableHeader>
      <TableRow>
        <TableCell className="w-[100px]">Rank:</TableCell>
        <TableCell>Name:</TableCell>
        <TableCell>Total Points:</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
{userData.data.topRanks.map((user, index) => (
  <TableRow key={index}>
    <TableCell className={user.rank === userData.data.userRank.rank ? "font-bold" : "font-medium"}>{user.rank}</TableCell>
    <TableCell className={user.rank === userData.data.userRank.rank ? "font-bold" : ""}>{user.first_name} {user.last_name}</TableCell>
    <TableCell className={user.rank === userData.data.userRank.rank ? "font-bold" : ""}>{user.total_points}</TableCell>
  </TableRow>
))}
</TableBody>

      </Table>
      </div>
      <div>
      <h3 className="pb-2">Your Rank:</h3>
      <Table>
      <TableHeader>
          <TableRow>
            <TableCell className="w-[100px]">Rank:</TableCell>
            <TableCell>Total Points:</TableCell>
          </TableRow>
        </TableHeader>
      <TableBody>
          <TableRow>
            <TableCell className="font-bold">{userData.data.userRank.rank}</TableCell>
            <TableCell className="font-bold">{userData.data.userRank.total_points}</TableCell>
          </TableRow>
          </TableBody>
      </Table>
      </div>
      </div>
              </div>
              
          ) : (
            businessData && (
                  <div>
                  <BusinessImpactStats
                      preventedWaste={businessData.data.preventedWaste}
                      ordersReceived={businessData.data.ordersReceived}
                      totalMoneyMade={businessData.data.totalMoneyMade}
                      businessPoints={businessData.data.businessPoints}
                  />
                  <div>
                  <div className="pt-8 pb-8"> 
                    <h3 className="pb-2">Top Business Ranks:</h3>
                  <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="w-[100px]">Rank:</TableCell>
                  <TableCell>Name:</TableCell>
                  <TableCell>Total Points:</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
{businessData.data.topRanks.map((user, index) => (
  <TableRow key={index}>
    <TableCell className={user.rank === businessData.data.yourRank.rank ? "font-bold" : "font-medium"}>{user.rank}</TableCell>
    <TableCell className={user.rank === businessData.data.yourRank.rank ? "font-bold" : ""}>{user.business_name}</TableCell>
    <TableCell className={user.rank === businessData.data.yourRank.rank ? "font-bold" : ""}>{user.total_points}</TableCell>
  </TableRow>
))}
</TableBody>
            </Table>
            </div>
            <div>
            <h3 className="pb-2">Your Rank:</h3>
            <Table>
            <TableHeader>
                <TableRow>
                  <TableCell className="w-[100px]">Rank:</TableCell>
                  <TableCell>Total Points:</TableCell>
                </TableRow>
              </TableHeader>
            <TableBody>
                <TableRow>
                  <TableCell className="font-bold">{businessData.data.yourRank.rank}</TableCell>

                    <TableCell className="font-bold">{businessData.data.yourRank.total_points}</TableCell>
                  </TableRow>
                  </TableBody>
              </Table>
              </div>
      
      
      
      
              </div>
                    </div>
                )
            )}
            
        </>
    );
}

export default requireAuth(Page);
