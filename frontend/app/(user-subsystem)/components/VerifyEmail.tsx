"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import requireAuth from "./requireAuth";
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import OTP from "./OTP";
import LoadingInPage from "./LoadingInPage";
import "../css/user.css";

function VerifyEmail() {
  const { user, requestNewOTP, requestLoading} = useUserSubsystem();
  const [emailSent, setEmailSent] = useState(false);

  const requestEmail = async () => {
    console.log("resending my g");
    await requestNewOTP();
  }

  const showLoadingSpinner = () => {
    if (requestLoading) {
      return <LoadingInPage action="Sending email..." />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user.firstName}! Lets verify your email.
      </h1>
      {!emailSent ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="mb-4">Click the button below to send a verification email to {user.email}.</p>

          <OTP />

          <Button variant="outline" onClick={requestEmail}>
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Re-send Email
          </Button>
          {showLoadingSpinner()}
        </div>
      ) : (
        <div>
          <p>An email has been sent to {user.email}. Please check your inbox and click the verification link.</p>
          <p>If you didnt receive the email, <button className="btn-link">send it again</button>.</p>
        </div>
      )}
    </main>
  );
}

export default VerifyEmail;
