'use client'
/*
Items

@author Jake McCarthy (w20043974) 
*/

import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import {Table,TableBody,TableCaption, TableCell,TableFooter,TableHead,TableHeader,TableRow, } from "@/components/ui/table"
import { useState, useEffect } from 'react'

function Page() {
const { user, logout, isOAuth } = useUserSubsystem();
const [rewards, setRewards] = useState([]);
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

    const fetchData = () => { 
        fetch("http://localhost:8080/analytics/user-rewards", {
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
        return <div>Loading...</div>;
    }

    return (
      <div>
      <h1 className="text-3xl font-bold mb-2">Your Rewards:</h1>
        <div>
          <div class="min-w-screen flex items-center justify-center">
    <div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex justify-center items-center">

        <div class="w-1/4 lg:w-1/1 shadow-lg">
    <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400">
      <div class="flex items-center">
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
            <div className="pt-4">
          {rewards.data.total_points.length > 0 ? (
            <div>  
              {/* Additional messages based on total points */}
              <div className=" flex justify-center items-center pb-8">
                {parseInt(rewards.data.total_points[0].total_points) <= 50 && (
                  <div> 
                    <div className="flex justify-center items-center font-bold"> 
                  Congratulations! 
                  </div>
                    <div className="flex justify-center items-center"> 
                    You have earned over 50 points which means a £5 voucher should be waiting for you in your inbox!
                    </div>
                    <div className="flex justify-center items-center font-bold"> 
                    Next Milestone:
                    </div>
                    <div> 
                    100 Points
                    </div>
                  </div>
                )}
                {parseInt(rewards.data.total_points[0].total_points) >= 100 &&
                  parseInt(rewards.data.total_points[0].total_points) <= 500 && (
                    <div> 
                    <div className="flex justify-center items-center font-bold"> 
                  Congratulations! 
                  </div>
                    <div className="flex justify-center items-center"> 
                    You have earned over 100 points which means a £10 voucher should be waiting for you in your inbox!
                    </div>
                    <div className="flex justify-center items-center font-bold"> 
                    Next Milestone:
                    </div>
                    <div className="flex justify-center items-center"> 
                    500 Points
                    </div>
                  </div>
                  )}
                {parseInt(rewards.data.total_points[0].total_points) > 500 &&
                  parseInt(rewards.data.total_points[0].total_points) <= 1000 && (
                    <div> 
                      <div className="flex justify-center items-center font-bold"> 
                  Congratulations! 
                  </div>
                    <div> 
                    You have earned over 500 points which means a £20 voucher should be waiting for you in your inbox!
                    </div>
                    <div className="flex justify-center items-center font-bold"> 
                    Next Milestone:
                    </div>
                    <div className="flex justify-center items-center"> 
                    1000 Points
                    </div>
                  </div>
                  )}
                {parseInt(rewards.data.total_points[0].total_points) >= 1000 && (
                  <div> 
                    <div className="flex justify-center items-center font-bold"> 
                  Congratulations! 
                  </div>
                  <div> 
                  You have earned over 1000 points which means a £50 voucher should be waiting for you in your inbox! Congratulations! 
                  </div>
                  <div className="flex justify-center items-center font-bold"> 
                  Next Milestone:
                  </div>
                  <div className="flex justify-center items-center"> 
                  More Rewards Coming Soon!
                  </div>
                </div>
                )}
              </div>
      
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number:</TableHead>
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
          ) : (
            <div>
              You have no points, order now!
            </div>
          )}
        </div>
        </div>
      );
      
  }

export default requireAuth(Page)