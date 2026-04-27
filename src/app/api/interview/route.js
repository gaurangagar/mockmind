import { db } from "@/index";
import { mockInterview } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const user = await currentUser();

    if (!user) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = user.emailAddresses[0]?.emailAddress;

    const mockId = uuidv4();

    const result = await db
      .insert(mockInterview)
      .values({
        mockId: mockId,
        jobPosition: body.jobRole,
        jobDesc: body.jobDescription,
        jobExperience: body.experience,
        jsonMockResp: JSON.stringify(body.data),
        createdBy: email,
        createdAt: new Date().toISOString(),
      })
      .returning({ mockId: mockInterview.mockId });

    return Response.json({
      success: true,
      mockId: result[0]?.mockId,
    });
  } catch (error) {
    console.error("POST /api/interview error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to create interview",
      },
      { status: 500 }
    );
  }
}