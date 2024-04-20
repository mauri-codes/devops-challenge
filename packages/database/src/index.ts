import { drizzle } from 'drizzle-orm/postgres-js'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import * as drizzleOrm from 'drizzle-orm'
import postgres from 'postgres'
import mySchema from './schema'


const sql = postgres(process.env.DATABASE_URL as string, { ssl: { rejectUnauthorized: false } })
const db = drizzle(sql, { schema: mySchema })

export default db

export const schema = mySchema
export const orm = drizzleOrm

export type Photo = InferSelectModel<typeof schema.photos>
export type InsertPhoto = InferInsertModel<typeof schema.photos>
