import React from "react";
import { users } from "@/models/server/config";
import EditProfileForm from "@/components/EditProfileForm";

const Page = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const user = await users.get(userId);

  return (
    <div className="container mx-auto px-4 pt-32">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      {/* ✅ THIS WAS MISSING */}
      <EditProfileForm user={user} />
    </div>
  );
};

export default Page;