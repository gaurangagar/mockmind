CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar,
	"jobPosition" varchar,
	"jobDesc" varchar,
	"jobExperience" varchar,
	"jsonMockResp" text,
	"createdBy" varchar,
	"createdAt" varchar
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockIdRef" varchar,
	"question" varchar,
	"correctAns" text,
	"userAns" text,
	"feedback" text,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" varchar
);
