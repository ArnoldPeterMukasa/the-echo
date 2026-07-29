import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/models/Article";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const body = await request.json();

  const article = await Article.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(article);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  await Article.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}