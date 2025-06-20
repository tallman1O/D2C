import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { wireframesTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { imageUrl, model, userPrompt, uid, email } = await req.json();
  const wireframe = await db
    .insert(wireframesTable)
    .values({
      imageUrl: imageUrl,
      model: model,
      userPrompt: userPrompt,
      uid: uid,
      createdBy: email,
    })
    .returning({ id: wireframesTable.id });
  return NextResponse.json(wireframe);
}

export async function GET(req: NextResponse) {
  const reqURL = req.url;
  const { searchParams } = new URL(reqURL);
  const uid = searchParams?.get("uid");

  if (uid) {
    const result = await db
      .select()
      .from(wireframesTable)
      .where(eq(wireframesTable.uid, uid));
    return NextResponse.json(result[0]);
  }

  return NextResponse.json({ error: "No UID provided" });
}
