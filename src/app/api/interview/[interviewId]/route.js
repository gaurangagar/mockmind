import { NextResponse } from "next/server";
import { db } from "@/index";
import { mockInterview } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";


export async function GET(req, context) {
  try {
    const params = await context.params;
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    if (!result.length) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}