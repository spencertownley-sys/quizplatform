ALTER TYPE "public"."product" ADD VALUE 'bundle';--> statement-breakpoint
ALTER TYPE "public"."product" ADD VALUE 'comparison';--> statement-breakpoint
CREATE TABLE "comparisons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_slug" text NOT NULL,
	"attempt_a" uuid NOT NULL,
	"attempt_b" uuid,
	"invite_token" text NOT NULL,
	"access_token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "emails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"to" text NOT NULL,
	"kind" text NOT NULL,
	"subject" text NOT NULL,
	"html" text NOT NULL,
	"status" text NOT NULL,
	"provider_id" text,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "funnel_daily" (
	"day" date NOT NULL,
	"quiz_slug" text NOT NULL,
	"event" text NOT NULL,
	"variant" text DEFAULT '' NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "funnel_daily_day_quiz_slug_event_variant_pk" PRIMARY KEY("day","quiz_slug","event","variant")
);
--> statement-breakpoint
CREATE TABLE "quiz_overrides" (
	"slug" text PRIMARY KEY NOT NULL,
	"definition" jsonb,
	"status" text,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purchase_id" uuid NOT NULL,
	"quiz_slug" text NOT NULL,
	"rating" smallint NOT NULL,
	"body" text NOT NULL,
	"display_name" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unsubscribes" (
	"email" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "marketing_consent" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "share_code" text;--> statement-breakpoint
-- Backfill share codes for attempts that existed before this migration.
UPDATE "attempts" SET "share_code" = substr(md5(random()::text || "id"::text), 1, 12) WHERE "share_code" IS NULL;--> statement-breakpoint
ALTER TABLE "attempts" ALTER COLUMN "share_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "age_band" text;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "variants" jsonb;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "winback_stage" smallint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "guest_sessions" ADD COLUMN "birth_year" smallint;--> statement-breakpoint
ALTER TABLE "guest_sessions" ADD COLUMN "underage" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "comparison_id" uuid;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "bundle_key" text;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "quiz_slug" text;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "variants" jsonb;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "receipt_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "canceled_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_attempt_a_attempts_id_fk" FOREIGN KEY ("attempt_a") REFERENCES "public"."attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_attempt_b_attempts_id_fk" FOREIGN KEY ("attempt_b") REFERENCES "public"."attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "comparisons_invite_idx" ON "comparisons" USING btree ("invite_token");--> statement-breakpoint
CREATE UNIQUE INDEX "comparisons_access_idx" ON "comparisons" USING btree ("access_token");--> statement-breakpoint
CREATE INDEX "comparisons_a_idx" ON "comparisons" USING btree ("attempt_a");--> statement-breakpoint
CREATE INDEX "comparisons_b_idx" ON "comparisons" USING btree ("attempt_b");--> statement-breakpoint
CREATE INDEX "emails_to_idx" ON "emails" USING btree ("to","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_purchase_idx" ON "reviews" USING btree ("purchase_id");--> statement-breakpoint
CREATE INDEX "reviews_status_idx" ON "reviews" USING btree ("status","quiz_slug");--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_comparison_id_comparisons_id_fk" FOREIGN KEY ("comparison_id") REFERENCES "public"."comparisons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "attempts_quiz_idx" ON "attempts" USING btree ("quiz_slug","completed_at");--> statement-breakpoint
CREATE UNIQUE INDEX "attempts_share_idx" ON "attempts" USING btree ("share_code");--> statement-breakpoint
CREATE INDEX "purchases_comparison_idx" ON "purchases" USING btree ("comparison_id");--> statement-breakpoint
CREATE INDEX "purchases_user_idx" ON "purchases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "purchases_guest_idx" ON "purchases" USING btree ("guest_session_id");--> statement-breakpoint
CREATE INDEX "purchases_paid_idx" ON "purchases" USING btree ("status","paid_at");