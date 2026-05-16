"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/models/client/config";
import toast from "react-hot-toast";

interface Props {
  userId?: string;
  secret?: string;
}

export default function VerifyEmailClient({
  userId,
  secret,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        if (!userId || !secret) {
          toast.error("Invalid verification link");
          router.push("/");
          return;
        }

        await account.updateVerification(userId, secret);

        toast.success("Email verified successfully 🎉");
        router.push("/login");
      } catch (error) {
        console.error(error);
        toast.error("Verification failed");
        router.push("/");
      }
    }

    verify();
  }, [userId, secret, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Verifying your email...
    </div>
  );
}