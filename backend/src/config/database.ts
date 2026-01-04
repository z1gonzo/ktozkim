import { Pool } from 'pg';

let pool: Pool;

// Check if DATABASE_URL is provided (for production/cloud deployments)
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Increased timeout for cloud
    statement_timeout: 30000, // 30 second statement timeout
    query_timeout: 30000, // 30 second query timeout
  });
} else {
  // Use individual environment variables (for development)
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ktozkim',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Increased timeout for cloud
    statement_timeout: 30000, // 30 second statement timeout
    query_timeout: 30000, // 30 second query timeout
  });
}

export default pool;
