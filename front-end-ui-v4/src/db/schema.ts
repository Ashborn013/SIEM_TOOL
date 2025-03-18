import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const notificationTable = pgTable("notification", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  notifaction_head: varchar().notNull(),
  notifaction_msg: varchar().notNull().unique(),
  time: date().default('2024-1-1')
});
