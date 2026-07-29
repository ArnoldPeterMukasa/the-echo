import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Advertisement from "@/src/models/Advertisement";

export async function GET() {
  await connectDB();

  const ads = await Advertisement.find({
    active: true,
  }).sort({
    createdAt: -1,
  });

  return NextResponse.json(ads);
}