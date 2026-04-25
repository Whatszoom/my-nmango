import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  const state = mongoose.connection.readyState;

  let dbStatus = "Disconnected";

  if (state === 1) dbStatus = "Connected";
  else if (state === 2) dbStatus = "Connecting";

  return NextResponse.json({ dbStatus });
}
