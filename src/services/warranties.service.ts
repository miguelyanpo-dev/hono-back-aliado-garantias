import { db } from '../config/db';

export class WarrantiesService {
  static async getAll() {
    const { rows } = await db.query(
      `SELECT *
       FROM warranties
       ORDER BY user_created_date DESC`
    );
    return rows;
  }
  static async getById(id: number) {
    const { rows } = await db.query(
      `SELECT * FROM warranties WHERE id = $1`,
      [id]
    );
    return rows[0];
  }
  static async create(data: any) {
    const { rows } = await db.query(
      `
      INSERT INTO warranties (
        customer_id, customer_name, customer_identification,
        customer_email, customer_cellphone,
        seller_id, seller_name,
        status, is_active,
        user_created_date
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9, now()
      )
      RETURNING *
      `,
      [
        data.customer_id,
        data.customer_name,
        data.customer_identification,
        data.customer_email,
        data.customer_cellphone,
        data.seller_id,
        data.seller_name,
        data.status,
        data.is_active,
      ]
    );

    return rows[0];
  }
}
