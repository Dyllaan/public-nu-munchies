import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Items from './(ub-subsystem)/components/Items'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Items />
    </main>
  );
}
