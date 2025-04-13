import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.")
}

const dbUrl = new URL(process.env.DATABASE_URL)

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || "5432"),
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    ssl: true,
  },
} satisfies Config
