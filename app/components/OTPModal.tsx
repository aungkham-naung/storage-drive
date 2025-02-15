"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";

import React, { useState } from "react";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({
  email,
  accountId
}: {
  email: string;
  accountId: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Call API to verify otp
    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push("/");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // Call API to resend OTP
  const handleResendOTP = async () => {
    await sendEmailOTP(email);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
          </AlertDialogTitle>
          <Image
            src="/assets/icons/close-dark.svg"
            alt="close"
            width={20}
            height={20}
            onClick={() => {
              setIsOpen(false);
            }}
            className="otp-close-button"
          />

          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We've sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-04">
            <AlertDialogAction
              disabled={isLoading}
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
            >
              {isLoading ? (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              ) : (
                "Submit"
              )}
            </AlertDialogAction>
            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn't get a code?{" "}
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand"
                onClick={handleResendOTP}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
