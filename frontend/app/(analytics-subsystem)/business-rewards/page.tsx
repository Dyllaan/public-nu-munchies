'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import requireAuth from "../../(user-subsystem)/components/auth/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Page() {
const { user, logout, isOAuth } = useUserSubsystem();
const [rewards, setRewards] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/business-rewards", {
            method: 'GET',
            headers: headers
        })
        .then( response => response.json() )
        .then( json => setRewards(json) )
        .then( json => console.log(json) )
        .catch(error => {
          console.error('Error fetching data:', error); 
    });}

    console.log(rewards)
 
    useEffect( fetchData, [])
    

      if (!rewards || !rewards.data) {
        return <div>No Results Found Yet...</div>;
    }

    return (
      <div>
      <h1 className="text-3xl font-bold mb-2">Your Rewards:</h1>
      <Breadcrumb className="mt-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/impact-stats">Impact Stats</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-black">
          <BreadcrumbLink href={`/business-rewards`}>
            Your Business' Rewards
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
        <div>
          <div class=" lg:w-1/1 mx-auto">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex justify-center items-center">

        <div class="w-1/4 lg:w-1/1 mx-auto shadow-lg">
                <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400">
                    <div class="flex items-left">
                        <div class="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="text-lg">{rewards.data.total_points[0].total_points}</div>
                            <div class="text-sm text-gray-400">Total Points</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
                </div>
            </div>
            </div>
          {rewards.data.total_points.length > 0 ? (
            <div className="pt-4">      
              {/* Additional messages based on total points */}
              <div className="flex justify-center items-center pb-8">
                {parseInt(rewards.data.total_points[0].total_points) <= 1000 && (
                  <div> 
                  <div className="flex justify-center items-center"> 
                  Keep Gaining Points to Earn Your Reward! 
                  </div>
                  <div className="flex justify-center items-center"> 
                  Once you reach 1000 points you will gain local celebrity status
                  </div>
                  <div className=" flex justify-center items-center font-bold"> 
                  So Keep Going! Good Luck!
                  </div>
                </div>
                )}
                {parseInt(rewards.data.total_points[0].total_points) >= 1000 && (
                  <div> 
                  <div className="flex justify-center items-center font-bold"> 
                  Congratulations! 
                  </div>
                  <div className="flex justify-center items-center"> 
                  You've Earned 1000 Points!
                  </div>
                  <div className=" flex justify-center items-center"> 
                  You will now receive an official, recognised certificate that will help boost your business' reputation!
                  </div>
                  <div className=" flex justify-center items-center font-bold"> 
                  Keep working hard and you may receive more rewards in the future!
                  </div>
                </div>
                )}
              </div>

              <div className="pt-4">
      
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order Number:</TableHead>
                    <TableHead>Food Waste Prevented:</TableHead>
                    <TableHead>Points Earned:</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.data.orderData.map((reward) => (
                    <TableRow key={reward.order_number}>
                      <TableCell className="font-medium">{reward.order_number}</TableCell>
                      <TableCell>{reward.food_waste_prevented}</TableCell>
                      <TableCell>{reward.points_earned}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total Points</TableCell>
                    <TableCell className="text-right">{rewards.data.total_points[0].total_points}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
            </div>
          ) : (
            <div>
              You have no points, list some items to gain some!
            </div>
          )}
        </div>
        
      );
      
  }

export default requireAuth(Page)