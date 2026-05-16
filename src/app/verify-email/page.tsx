"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/models/client/config";
import toast from "react-hot-toast";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: {
    userId?: string;
    secret?: string;
  };
}) {
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        const userId = searchParams.userId;
        const secret = searchParams.secret;

        if (!userId || !secret) {
          toast.error("Invalid verification link");
          router.push("/login");
          return;
        }

        await account.updateVerification(userId, secret);

        toast.success("Email verified successfully 🎉");
        router.push("/login");
      } catch (error) {
        console.error(error);
        toast.error("Verification failed");
        router.push("/login");
      }
    }

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Verifying your email...
    </div>
  );
}