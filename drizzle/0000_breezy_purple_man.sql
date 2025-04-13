CREATE TYPE "public"."userSystemENum" AS ENUM('user', 'system');--> statement-breakpoint
CREATE TABLE "Chats" (
	"chat_id" serial PRIMARY KEY NOT NULL,
	"pdf_name" text NOT NULL,
	"pdf_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"file_key" text NOT NULL
);
