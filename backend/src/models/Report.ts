import pool from '../config/database';

export interface Report {
  id: number;
  user_id: number;
  official_id?: number;
  connection_id?: number;
  allegation_type: string;
  title: string;
  description: string;
  evidence?: string;
  status: string;
  reviewed_by?: number;
  reviewed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateReportData {
  user_id: number;
  official_id?: number;
  connection_id?: number;
  allegation_type: string;
  title: string;
  description: string;
  evidence?: string;
}

export interface UpdateReportData {
  allegation_type?: string;
  title?: string;
  description?: string;
  evidence?: string;
  status?: string;
  reviewed_by?: number;
  reviewed_at?: Date;
}

export class ReportModel {
  static async findAll(filters: {
    user_id?: number;
    official_id?: number;
    status?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ reports: Report[]; total: number }> {
    const { user_id, official_id, status, limit = 20, offset = 0 } = filters;

    let query = `
      SELECT r.*, u.email as user_email, o.first_name as official_first_name, o.last_name as official_last_name
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN officials o ON r.official_id = o.id
    `;
    const values: any[] = [];
    const conditions: string[] = [];

    if (user_id) {
      conditions.push(`r.user_id = $${values.length + 1}`);
      values.push(user_id);
    }

    if (official_id) {
      conditions.push(`r.official_id = $${values.length + 1}`);
      values.push(official_id);
    }

    if (status) {
      conditions.push(`r.status = $${values.length + 1}`);
      values.push(status);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY r.created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM reports r';
    if (conditions.length > 0) {
      countQuery += ` WHERE ${conditions.join(' AND ')}`;
    }
    const countResult = await pool.query(countQuery, values.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);

    return {
      reports: result.rows.map((row: any) => ({
        id: row.id,
        user_id: row.user_id,
        official_id: row.official_id,
        connection_id: row.connection_id,
        allegation_type: row.allegation_type,
        title: row.title,
        description: row.description,
        evidence: row.evidence,
        status: row.status,
        reviewed_by: row.reviewed_by,
        reviewed_at: row.reviewed_at,
        created_at: row.created_at,
        updated_at: row.updated_at,
      })),
      total,
    };
  }

  static async findById(id: number): Promise<Report | null> {
    const result = await pool.query(`
      SELECT r.*, u.email as user_email, o.first_name as official_first_name, o.last_name as official_last_name
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN officials o ON r.official_id = o.id
      WHERE r.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      official_id: row.official_id,
      connection_id: row.connection_id,
      allegation_type: row.allegation_type,
      title: row.title,
      description: row.description,
      evidence: row.evidence,
      status: row.status,
      reviewed_by: row.reviewed_by,
      reviewed_at: row.reviewed_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async create(data: CreateReportData): Promise<Report> {
    const { user_id, official_id, connection_id, allegation_type, title, description, evidence } = data;

    const result = await pool.query(`
      INSERT INTO reports (user_id, official_id, connection_id, allegation_type, title, description, evidence)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [user_id, official_id, connection_id, allegation_type, title, description, evidence]);

    const row = result.rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      official_id: row.official_id,
      connection_id: row.connection_id,
      allegation_type: row.allegation_type,
      title: row.title,
      description: row.description,
      evidence: row.evidence,
      status: row.status,
      reviewed_by: row.reviewed_by,
      reviewed_at: row.reviewed_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async update(id: number, data: UpdateReportData): Promise<Report | null> {
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
      UPDATE reports
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
      user_id: row.user_id,
      official_id: row.official_id,
      connection_id: row.connection_id,
      allegation_type: row.allegation_type,
      title: row.title,
      description: row.description,
      evidence: row.evidence,
      status: row.status,
      reviewed_by: row.reviewed_by,
      reviewed_at: row.reviewed_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
