import { SquareLoader } from 'react-spinners';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import messages from "./messages.json";
import { useEffect, useState } from 'react';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';

export default function Loading({props, action}: any) {
    const { status } = useUserSubsystem();

    function getRandomMessage() {
        const data = messages.messages;
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    }

    const [message, setMessage] = useState(getRandomMessage());
    useEffect(() => {
        if (status.loading) {
            const interval = setInterval(() => {
                setMessage(getRandomMessage());
            }, 1000); // Change message every second

            // Clean up the interval on component unmount or status change
            return () => clearInterval(interval);
        }
    }, [status.loading]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Component imported via shadcn-ui */}
      <Alert className="max-w-[400px] mx-auto mb-10">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>{action}</AlertTitle>
        <AlertDescription>
          {message}
        </AlertDescription>
      </Alert>
      <SquareLoader loading={true} color={'#687387'} />
    </main>
    );
}