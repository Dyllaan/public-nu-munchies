// each component that uses "useState" etc. needs to be defined as "use client" but you can do it dirctly in the component so only the component get loaded js
"use client";

import { SharedComponent } from "@/components/ui/shared-component";
import { NestedComponent } from "./components/nested-component";
// import useState hook directly from react
import { useState } from "react";

export default function DemoPage() {
  const [name, setName] = useState("Filip");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Just separator */}
      <hr className="mt-12"></hr>
      <h1 className="text-4xl font-bold mb-6">Welcome to Demo Page</h1>
      {/* Just input */}
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name..."
        className="border-2 border-gray-300 py-2 text-lg px-4 rounded-md mb-6"
      ></input>
      {/* SharedComponent is a component that is shared between different subsystems */}
      <SharedComponent name={name}></SharedComponent>
      {/* Just separator */}
      <hr className="my-6 border-gray-600 border-2 w-[80%] mx-auto"></hr>
      {/* NestedComponent is a component that is only available in the demo subsystem */}
      <NestedComponent name={name}></NestedComponent>
    </main>
  );
}
