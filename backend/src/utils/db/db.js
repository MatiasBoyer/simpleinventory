import { Pool } from 'pg';
import environment from '#config/environment.js';
import path from 'node:path';
import fs from 'node:fs';

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = new Pool({
        user: environment.DATABASE.USER,
        password: environment.DATABASE.PASS,
        host: environment.DATABASE.HOST,
        port: environment.DATABASE.PORT,
        database: environment.DATABASE.DBNAME,
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  /**
   * Run a query or a series of queries inside a transaction.
   *
   * @param {string|function} queryOrCallback - SQL query text or a callback for a transaction
   * @param {object} params - Query parameters if running a single query
   * @returns {Promise<any>}
   */
  async run(queryOrCallback, params = {}) {
    const client = await this.pool.connect();
    try {
      if (typeof queryOrCallback === 'function') {
        await client.query('BEGIN');
        const result = await queryOrCallback(client);
        await client.query('COMMIT');
        return result;
      }

      let sql = queryOrCallback;
      let values = [];

      if (params && typeof params === 'object' && !Array.isArray(params)) {
        const keys = Object.keys(params);

        keys.forEach((key, index) => {
          const placeholder = `:${key}`;
          const pgPlaceholder = `$${index + 1}`;
          sql = sql.replaceAll(placeholder, pgPlaceholder);
          values.push(params[key]);
        });
      } else {
        values = params;
      }

      const result = await client.query(sql, values);
      return result;
    } catch (err) {
      await client.query('ROLLBACK').catch(() => {});
      console.error('Database query error:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  /**
   * Reads a file from .\src\db\* folder
   * @param {string} filename
   * @returns {string} filecontent
   */
  async read(filename) {
    const fullpath = path.join(process.cwd(), 'src', 'db', filename);
    return fs.readFileSync(fullpath, { encoding: 'utf-8' });
  }
}

const instance = new Database();
Object.freeze(instance);

export default instance;
