// Import the necessary Drizzle ORM functions
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const jokesTable = sqliteTable("jokes_table", {
    id: int().primaryKey({ autoIncrement: true }),
    joke: text().notNull(),
    submitter: text().notNull(),
    rating: int().notNull(),
    date: text().notNull(), // store ISO string for simplicity
});
