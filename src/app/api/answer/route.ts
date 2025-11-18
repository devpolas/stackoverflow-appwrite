import { answerCollection, db } from "@/models/name";
import { database, user } from "@/models/server/config";
import { UserPrefs } from "@/store/auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    const { answer, questionId, authorId } = await request.json();

    const response = await database.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId,
        questionId,
      }
    );

    // increase author reputation
    const prefs = await user.getPrefs<UserPrefs>(authorId);
    await user.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });
    return NextResponse.json({ response }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error?.message || "Error creating answer" },
        {
          status: 500,
        }
      );
    }
  }
}
