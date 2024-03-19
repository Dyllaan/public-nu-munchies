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
        return <div>Loading...</div>;
    }

    return (
        <div>
          {rewards.data.total_points.length > 0 ? (
            <div>
              <div>
                Total Points: {rewards.data.total_points[0].total_points}
              </div>
      
              {/* Additional messages based on total points */}
              <div>
                {parseInt(rewards.data.total_points[0].total_points) <= 50 && (
                  <div>You have between 0-50 total points message</div>
                )}
                {parseInt(rewards.data.total_points[0].total_points) >= 100 &&
                  parseInt(rewards.data.total_points[0].total_points) <= 500 && (
                    <div>You have between 100-500 total points message</div>
                  )}
                {parseInt(rewards.data.total_points[0].total_points) > 500 &&
                  parseInt(rewards.data.total_points[0].total_points) <= 1000 && (
                    <div>You have between 500-1000 total points message</div>
                  )}
                {parseInt(rewards.data.total_points[0].total_points) > 1000 && (
                  <div>You have over 1000 total points message</div>
                )}
              </div>
      
              <Table>
                <TableCaption>A list highlighting where your points have been earned</TableCaption>
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
          ) : (
            <div>
              You have no points, order now!
            </div>
          )}
        </div>
      );
      
  }

export default requireAuth(Page)