// app/account/route.js
import { NextResponse } from "next/server";

// Handles GET requests sent to /account
export async function GET() {
  return NextResponse.json({ message: "Account data endpoint" });
}
