"use client";

import { useUserSubsystem } from "@/hooks/user-subsystem/use-user-subsystem";
import { useState } from "react";

import "../css/user.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, showMessages } = useUserSubsystem();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await register(name, email, password);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Register Page</h1>
      <form onSubmit={(e) => handleLogin(e)} className="">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="border-2 border-gray-300 rounded-md px-4 py-2 mt-4"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="border-2 border-gray-300 rounded-md px-4 py-2 mt-4"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 rounded-md px-4 py-2 mt-4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Register
        </button>
      </form>
    </main>
  );
}
