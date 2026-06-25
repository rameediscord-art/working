import { pgTable, text, serial, numeric, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const starterPacksTable = pgTable("starter_packs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  discountPercentage: integer("discount_percentage").notNull().default(0),
  items: text("items").array().notNull().default([]),
  checkoutUrl: text("checkout_url").notNull().default("https://checkout.lemonsqueezy.com/placeholder"),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStarterPackSchema = createInsertSchema(starterPacksTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStarterPack = z.infer<typeof insertStarterPackSchema>;
export type StarterPack = typeof starterPacksTable.$inferSelect;
