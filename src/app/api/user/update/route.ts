import { users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { name, bio, userId } = await req.json();

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

    // update name
    await users.updateName(user.$id, name);

    // update prefs
    await users.updatePrefs(user.$id, {
      bio,
    });

    return NextResponse.json({
      message: "Profile Updated Successfully",
    });
  } catch (error: any) {
    console.error("Error: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
