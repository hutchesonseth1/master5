import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow()
});

export const entitlements = pgTable("entitlements", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  product: text("product").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  stripeProductId: text("stripe_product_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const prices = pgTable("prices", {
  id: uuid("id").primaryKey().defaultRandom(),
  stripePriceId: text("stripe_price_id").notNull().unique(),
  productId: uuid("product_id").notNull(),
  currency: text("currency").notNull(),
  unitAmount: integer("unit_amount").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
