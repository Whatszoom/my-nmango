import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET → fetch all users
export async function GET() {
  await connectDB();

  const users = await User.find();
  return NextResponse.json(users);
}

// POST → save new user
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const user = await User.create({ name: body.name });

  return NextResponse.json(user);
}
