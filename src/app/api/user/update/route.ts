import { users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { name, bio, userId } = await req.json();

    console.log("BODY:", { name, bio, userId });
    // validate first
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json(
        { message: "Name is Required" },
        { status: 400 },
      );
    }

    //  get user
    const user = await users.get(userId);
    console.log("USER FOUND:", user.$id);

    // update name
    await users.updateName(user.$id, name);
    console.log("NAME UPDATED");

    // update prefs
    await users.updatePrefs(user.$id, {
      bio,
    });
    console.log("PREFS UPDATED");

    return NextResponse.json({
      message: "Profile Updated Successfully",
    });
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
