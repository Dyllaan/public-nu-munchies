"use client";
import { SquareLoader } from 'react-spinners';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import messages from "./messages.json";
import { useEffect, useState } from 'react';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';

export default function LoadingInPage() {
    return (
      <div className="m-2">
        <SquareLoader loading={true} color={'#687387'} />
      </div>
    );
}