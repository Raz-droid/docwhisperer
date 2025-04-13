CREATE TABLE "messages" (
	"messages_id" serial PRIMARY KEY NOT NULL,
	"chat_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"role" "userSystemENum" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_Chats_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."Chats"("chat_id") ON DELETE no action ON UPDATE no action;