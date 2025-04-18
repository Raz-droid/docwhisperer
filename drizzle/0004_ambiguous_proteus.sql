CREATE TABLE "userSubscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"StripCustomerId" varchar(256) NOT NULL,
	"stripeSubscriptionId" varchar(256) NOT NULL,
	"stripePriceId" varchar(256) NOT NULL,
	"stripCurrentPeriodEnd" timestamp,
	CONSTRAINT "userSubscriptions_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "userSubscriptions_StripCustomerId_unique" UNIQUE("StripCustomerId"),
	CONSTRAINT "userSubscriptions_stripeSubscriptionId_unique" UNIQUE("stripeSubscriptionId"),
	CONSTRAINT "userSubscriptions_stripePriceId_unique" UNIQUE("stripePriceId")
);
