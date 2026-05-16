"use client";

import React from "react";
import { useAuthStore } from "@/store/Auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { verifySession, hydrated } = useAuthStore();

  React.useEffect(() => {
    if (hydrated) {
      verifySession();
    }
  }, [hydrated, verifySession]);

  return <>{children}</>;
}