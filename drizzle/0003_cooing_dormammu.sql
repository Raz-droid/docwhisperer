ALTER TABLE "messages" RENAME TO "Chatmessages";--> statement-breakpoint
ALTER TABLE "Chatmessages" DROP CONSTRAINT "messages_chat_id_Chats_chat_id_fk";
--> statement-breakpoint
ALTER TABLE "Chatmessages" ADD CONSTRAINT "Chatmessages_chat_id_Chats_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."Chats"("chat_id") ON DELETE no action ON UPDATE no action;