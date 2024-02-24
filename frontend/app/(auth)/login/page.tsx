"use client";

import { useAtom } from "jotai";
import { userAtom } from "@/stores/auth";

// if the parent folder is in brackets ie. (auth) it does not affect the route so it is only /login anyway
// if it was just "auth" it would be /auth/loginx

// it would be good to group it with the subsystem name in brackets so we know where it belongs

export default function Login() {
  // useAtom is a hook from jotai used to use the shared state - something like context but less messy
  const [user, setUser] = useAtom(userAtom);
  const setUserState = ({ name }: { name: string }) => {
    setUser({ name });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome to Login Page {user.name} !
      </h1>
      <button
        onClick={() => {
          setUserState({ name: "John Doe" });
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Change name to John Doe
      </button>
    </main>
  );
}
