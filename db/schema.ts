
import {pgTable, text, uuid, varchar} from "drizzle-orm/pg-core";

export const blogTable = pgTable('blogs', {
  id: uuid().defaultRandom().primaryKey(),
  title:varchar({length:80}).notNull(),
  content:text().notNull(),
  orgId:varchar().notNull()
})

export type CreateBlogType = typeof blogTable.$inferInsert;
export type SelectBlogType = typeof blogTable.$inferSelect;
