import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Moderator from "./Moderator"
import UserProfile from "../profile/UserProfile"

export default function TabbedProfile() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="moderator">Moderator</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <UserProfile />
      </TabsContent>
      <TabsContent value="moderator">
        <Moderator />
      </TabsContent>
    </Tabs>
  )
}
