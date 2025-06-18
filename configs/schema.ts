import { integer, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(0)
});

export const wireframesTable = pgTable("wireframes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uid: varchar().notNull(),
    imageUrl: varchar({ length: 255 }),
    model: varchar({ length: 255 }),
    userPrompt: varchar(),
    code: json(),
    createdBy: varchar(),
});