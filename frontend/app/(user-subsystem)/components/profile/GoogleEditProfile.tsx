// Adjust the import paths as necessary
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
import { z } from "zod";
import useUserSubsystem from "../../../../hooks/user-subsystem/use-user-subsystem";
import React, { useState, useEffect } from 'react';

export default function GoogleEditProfile() {
    const { user } = useUserSubsystem();

    return (
        <Card className="hover-scale w-full lg:w-[45vw]">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Sadly, you cannot edit your OAuth profile currently.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>
              <span>First Name</span>
              <Input placeholder={user.firstName} disabled/>
            </Label>
            <Label>
              <span>Last Name</span>
              <Input placeholder={user.lastName} disabled/>
            </Label>
            <Label>
              <span>Email</span>
              <Input placeholder={user.email} disabled/>
            </Label>
          </CardContent>
        </Card>
      )
}
