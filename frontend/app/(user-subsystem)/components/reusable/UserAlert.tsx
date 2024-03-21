import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PersonIcon } from "@radix-ui/react-icons";

interface UserAlertProps {
  message: string;
  type: 'success' | 'error';
}

export default function UserAlert({ message, type }: UserAlertProps) {

  const backgroundColorClass = type === 'error' ? 'bg-red-300' : 'bg-green-300';

  return (
    <Alert className={`mx-auto ${backgroundColorClass} m-2`}>
      <PersonIcon className="h-4 w-4" />
      <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
    );
}
