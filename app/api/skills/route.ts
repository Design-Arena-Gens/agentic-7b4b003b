import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Get skills error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    await connectDB();
    const skill = await Skill.create(body);

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error("Create skill error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
