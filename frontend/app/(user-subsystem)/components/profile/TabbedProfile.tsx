import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Moderator from "../moderator/Moderator";
import UserProfile from "./UserProfile";
import ShowIPs from "./ip-management/ShowIPs";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

export default function TabbedProfile() {

  const { user, logout, isOAuth, userTypes } = useUserSubsystem();

  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="ip">Access Management</TabsTrigger>
        {userTypes.moderator && <TabsTrigger value="moderator">Moderator</TabsTrigger>}
      </TabsList>
      <TabsContent value="user">
        <UserProfile />
      </TabsContent>
      <TabsContent value="ip">
        <ShowIPs />
      </TabsContent>
      {userTypes.moderator && (
        <TabsContent value="moderator">
          <Moderator />
        </TabsContent>
      )}
    </Tabs>
  )
}
