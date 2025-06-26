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

export async function GET(req: NextRequest) {
  const reqURL = req.url;
  const { searchParams } = new URL(reqURL);
  const uid = searchParams?.get("uid");
  const email = searchParams?.get("email");

  if (uid) {
    const result = await db
      .select()
      .from(wireframesTable)
      .where(eq(wireframesTable.uid, uid));
    return NextResponse.json(result[0]);
  } else if (email) {
    const result = await db
      .select()
      .from(wireframesTable)
      .where(eq(wireframesTable.createdBy, email));
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "No UID provided" });
}

export async function PUT(req: NextRequest) {
  const { uid, code } = await req.json();
  const result = await db
    .update(wireframesTable)
    .set({ code: code })
    .where(eq(wireframesTable.uid, uid))
    .returning({ uid: wireframesTable.uid });
  return NextResponse.json(result);
}
