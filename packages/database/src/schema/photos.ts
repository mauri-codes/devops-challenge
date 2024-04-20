import { sql } from 'drizzle-orm'
import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core'

export const photos = pgTable('photos', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  originalName: varchar('original_name'),
  bucketName: varchar('bucket_name'),
  key: varchar('key')
})
