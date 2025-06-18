import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { wireframesTable } from "@/configs/schema";

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
