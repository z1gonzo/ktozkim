import pool from '../config/database';

export interface Official {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  city?: string;
  company_id?: number;
  bio?: string;
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOfficialData {
  first_name: string;
  last_name: string;
  position: string;
  city?: string;
  company_id?: number;
  bio?: string;
  verified?: boolean;
}

export interface UpdateOfficialData {
  first_name?: string;
  last_name?: string;
  position?: string;
  city?: string;
  company_id?: number;
  bio?: string;
  verified?: boolean;
}

export class OfficialModel {
  static async findAll(filters: {
    city?: string;
    position?: string;
    verified?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ officials: Official[]; total: number }> {
    const { city, position, verified, limit = 20, offset = 0 } = filters;

    let query = `
      SELECT o.*, c.name as company_name
      FROM officials o
      LEFT JOIN companies c ON o.company_id = c.id
    `;
    const values: any[] = [];
    const conditions: string[] = [];

    if (city) {
      conditions.push(`o.city ILIKE $${values.length + 1}`);
      values.push(`%${city}%`);
    }

    if (position) {
      conditions.push(`o.position ILIKE $${values.length + 1}`);
      values.push(`%${position}%`);
    }

    if (verified !== undefined) {
      conditions.push(`o.verified = $${values.length + 1}`);
      values.push(verified);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY o.created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM officials o';
    if (conditions.length > 0) {
      countQuery += ` WHERE ${conditions.join(' AND ')}`;
    }
    const countResult = await pool.query(countQuery, values.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);

    return {
      officials: result.rows.map(row => ({
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        position: row.position,
        city: row.city,
        company_id: row.company_id,
        bio: row.bio,
        verified: row.verified,
        created_at: row.created_at,
        updated_at: row.updated_at,
      })),
      total,
    };
  }

  static async findById(id: number): Promise<Official | null> {
    const result = await pool.query(`
      SELECT o.*, c.name as company_name
      FROM officials o
      LEFT JOIN companies c ON o.company_id = c.id
      WHERE o.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      position: row.position,
      city: row.city,
      company_id: row.company_id,
      bio: row.bio,
      verified: row.verified,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async create(data: CreateOfficialData): Promise<Official> {
    const { first_name, last_name, position, city, company_id, bio, verified = false } = data;

    const result = await pool.query(`
      INSERT INTO officials (first_name, last_name, position, city, company_id, bio, verified)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [first_name, last_name, position, city, company_id, bio, verified]);

    const row = result.rows[0];
    return {
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      position: row.position,
      city: row.city,
      company_id: row.company_id,
      bio: row.bio,
      verified: row.verified,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async update(id: number, data: UpdateOfficialData): Promise<Official | null> {
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
      UPDATE officials
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
      first_name: row.first_name,
      last_name: row.last_name,
      position: row.position,
      city: row.city,
      company_id: row.company_id,
      bio: row.bio,
      verified: row.verified,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM officials WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
