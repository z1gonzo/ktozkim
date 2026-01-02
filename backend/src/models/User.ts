import pool from '../config/database';

export interface User {
  id: number;
  email: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  google_id?: string;
  auth_provider: 'local' | 'google';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  google_id?: string;
  auth_provider?: 'local' | 'google';
}

export interface UpdateUserData {
  email?: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  google_id?: string;
  auth_provider?: 'local' | 'google';
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      first_name: row.first_name,
      last_name: row.last_name,
      google_id: row.google_id,
      auth_provider: row.auth_provider || 'local',
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async findByGoogleId(googleId: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      first_name: row.first_name,
      last_name: row.last_name,
      google_id: row.google_id,
      auth_provider: row.auth_provider || 'local',
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async findById(id: number): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      first_name: row.first_name,
      last_name: row.last_name,
      google_id: row.google_id,
      auth_provider: row.auth_provider || 'local',
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async create(data: CreateUserData): Promise<User> {
    const { email, password_hash, first_name, last_name, google_id, auth_provider = 'local' } = data;

    const result = await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, google_id, auth_provider)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [email, password_hash, first_name, last_name, google_id, auth_provider]);

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      first_name: row.first_name,
      last_name: row.last_name,
      google_id: row.google_id,
      auth_provider: row.auth_provider || 'local',
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async update(id: number, data: UpdateUserData): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(`
      UPDATE users
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      first_name: row.first_name,
      last_name: row.last_name,
      google_id: row.google_id,
      auth_provider: row.auth_provider || 'local',
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
