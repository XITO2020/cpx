import pool from '../db';
import { User, Account, Session } from '../types';

export const userQueries = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  async create(user: Partial<User>): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (name, email, email_verified, image, hashed_password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user.name, user.email, user.emailVerified, user.image, user.hashedPassword]
    );
    return result.rows[0];
  },

  async updateTabzBalance(userId: string, amount: number): Promise<void> {
    await pool.query(
      'UPDATE users SET tabz_balance = tabz_balance + $1 WHERE id = $2',
      [amount, userId]
    );
  }
};

export const sessionQueries = {
  async create(session: Partial<Session>): Promise<Session> {
    const result = await pool.query(
      `INSERT INTO sessions (session_token, user_id, expires)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [session.sessionToken, session.userId, session.expires]
    );
    return result.rows[0];
  },

  async delete(sessionToken: string): Promise<void> {
    await pool.query(
      'DELETE FROM sessions WHERE session_token = $1',
      [sessionToken]
    );
  }
};

export const accountQueries = {
  async create(account: Partial<Account>): Promise<Account> {
    const result = await pool.query(
      `INSERT INTO accounts (
        user_id, type, provider, provider_account_id,
        refresh_token, access_token, expires_at,
        token_type, scope, id_token, session_state
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        account.userId,
        account.type,
        account.provider,
        account.providerAccountId,
        account.refresh_token,
        account.access_token,
        account.expires_at,
        account.token_type,
        account.scope,
        account.id_token,
        account.session_state
      ]
    );
    return result.rows[0];
  }
};