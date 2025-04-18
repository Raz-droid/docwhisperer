import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export const userSystemEnum = pgEnum("userSystemENum", ["user", "system"]);

export const Chats = pgTable("Chats", {
  chat_id: serial("chat_id").primaryKey(),
  pdf_name: text("pdf_name").notNull(),
  pdf_url: text("pdf_url").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  file_key: text("file_key").notNull(),
});

export type DrizzleChat = typeof Chats.$inferSelect;

export const Chatmessages = pgTable("Chatmessages", {
  message_id: serial("message_id").primaryKey(),
  chat_id: integer("chat_id")
    .references(() => Chats.chat_id)
    .notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  role: userSystemEnum("role").notNull(),
});

export const userSubscriptions = pgTable("userSubscriptions", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull().unique(),
  StripCustomerId: varchar("StripCustomerId", { length: 256 })
    .notNull()
    .unique(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 256 })
    .notNull()
    .unique(),
  stripePriceId: varchar("stripePriceId", { length: 256 }).notNull().unique(),
  stripCurrentPeriodEnd: timestamp("stripCurrentPeriodEnd"),
});
