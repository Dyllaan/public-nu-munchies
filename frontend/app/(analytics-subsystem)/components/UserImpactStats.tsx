'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";


function UserImpactStats({ preventedWaste, ordersPlaced, businessesHelped, userPoints }) {
    return (
        <div>
            <h3 className="font-bold">Your Personal Food Waste Contributions:</h3>

<div class="min-w-screen flex items-center justify-center">
<div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
<div class="flex flex-col gap-10 lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4  ">

<div class="w-full lg:w-1/4 shadow-lg">
  <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-yellow-400">
      <div class="flex items-center">
          <div class="icon w-14 p-3.5 bg-yellow-400 text-white rounded-full mr-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
          </div>
          <div class="flex flex-col justify-center">
              <div class="text-lg ">{preventedWaste} kg</div>
              <div class="text-sm text-gray-400">Food Waste Prevented</div>
              <Button className= "mt-2" asChild>
                <Link href="/user-orders">See More ></Link>
              </Button>
          </div>
      </div>
  </div>
</div>

<div class="w-full lg:w-1/4 shadow-lg">
  <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-red-400">
      <div class="flex items-center">
          <div class="icon w-14 p-3.5 bg-red-400 text-white rounded-full mr-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
          </div>
          <div class="flex flex-col justify-center">
              <div class="text-lg">{ordersPlaced}</div>
              <div class="text-sm text-gray-400">Orders Placed</div>
              <Button className= "mt-2" asChild>
                <Link href="/user-orders">See More ></Link>
              </Button>
          </div>
      </div>
  </div>
</div>

<div class="w-full lg:w-1/4 shadow-lg">
  <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-blue-400">
      <div class="flex items-center">
          <div class="icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
          </div>
          <div class="flex flex-col justify-center">
              <div class="text-lg">{businessesHelped}</div>
              <div class="text-sm text-gray-400">Businesses Helped</div>
              <Button className= "mt-2" asChild>
                <Link href="/businesses-helped">See More ></Link>
              </Button>
          </div>
      </div>
  </div>
  </div>
  

  <div class="w-full lg:w-1/4 shadow-lg">
  <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400">
      <div class="flex items-center">
          <div class="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
          </div>
          <div class="flex flex-col justify-center">
              <div class="text-lg">{userPoints}</div>
              <div class="text-sm text-gray-400">Total Points</div>
              <Button className= "mt-2" asChild>
                <Link href="/user-rewards">See Your Rewards -></Link>
              </Button>
          </div>
      </div>
  </div>
  </div>
  </div>
  </div>
</div>
        </div>
    );
}

export default UserImpactStats;
