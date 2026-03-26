"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#020617", // very dark (almost black)
          color: "#f8fafc", // soft white text
          border: "1px solid #1e293b",
          borderRadius: "10px",
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "#62A29A", // green
            secondary: "#f0fdf4",
          },
        },
        error: {
          iconTheme: {
            primary: "#B32624", // red
            secondary: "#fef2f2",
          },
        },
      }}
    />
  );
}
