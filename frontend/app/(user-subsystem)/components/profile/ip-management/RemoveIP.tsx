import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ManageIPs({ip, handleRemoval} : {ip:any; handleRemoval:any}) {

  const handleClick = async (event: any) => {
    handleRemoval(ip);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Remove</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col items-center gap-2">
        <Label>Are you sure you want to delete this IP?</Label>
        <Button variant="destructive" onClick={handleClick}>
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
