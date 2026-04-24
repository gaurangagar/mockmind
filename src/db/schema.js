import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const mockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  mockId: varchar("mockId"),
  jobPosition: varchar("jobPosition"),
  jobDesc: varchar("jobDesc"),
  jobExperience: varchar("jobExperience"),
  jsonMockResp: text("jsonMockResp"),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
});

export const userAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockIdRef"),
  question: varchar("question"),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});