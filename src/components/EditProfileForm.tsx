"use client";

import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditProfileForm({
  user,
}: {
  user: any;
}) {
  const router = useRouter();

  const [name, setName] = React.useState(user.name || "");
  const [bio, setBio] = React.useState(user.prefs?.bio || "");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Updating profile...");

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        body: JSON.stringify({ name, bio, userId: user.$id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Profile updated ✅", { id: toastId });

      router.refresh(); // refresh server data
    } catch (err: any) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        className="w-full p-2 rounded bg-black border"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <textarea
        className="w-full p-2 rounded bg-black border"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 px-4 py-2 rounded text-white"
      >
        Save Changes
      </button>
    </form>
  );
}