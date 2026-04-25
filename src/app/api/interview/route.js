// /app/api/interview/route.js

import { db } from "@/index";
import { mockInterview } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const body = await req.json();

  const mockId = uuidv4(); 

  const result = await db
    .insert(mockInterview)
    .values({
      mockId: mockId,
      jobPosition: body.jobRole,
      jobDesc: body.jobDescription,
      jobExperience: body.experience,
      jsonMockResp: JSON.stringify(body.data),
      createdBy: "user@example.com",
      createdAt: new Date().toISOString(),
    })
    .returning({ mockId: mockInterview.mockId });

  return Response.json({
    success: true,
    mockId: result[0]?.mockId,
  });
}