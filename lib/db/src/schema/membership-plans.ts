import { pgTable, text, serial, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membershipPlansTable = pgTable("membership_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  billingCycle: text("billing_cycle", { enum: ["monthly", "yearly", "lifetime", "one_time"] }).notNull().default("monthly"),
  description: text("description").notNull().default(""),
  features: text("features").array().notNull().default([]),
  checkoutUrl: text("checkout_url").notNull().default("https://checkout.lemonsqueezy.com/placeholder"),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertMembershipPlanSchema = createInsertSchema(membershipPlansTable).omit({ id: true, sortOrder: true, createdAt: true, updatedAt: true });
export type InsertMembershipPlan = z.infer<typeof insertMembershipPlanSchema>;
export type MembershipPlan = typeof membershipPlansTable.$inferSelect;
