import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "123456789",
  database: "ecommerce",
  port: 5432,
});

export { pool };
