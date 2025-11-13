import { Pool, Client } from "pg";
import mysql from "mysql2/promise";

// ============ POSTGRESQL CONNECTOR ============

export interface PostgresTable {
  name: string;
  schema: string;
  rowCount: number;
  columns: PostgresColumn[];
}

export interface PostgresColumn {
  name: string;
  type: string;
  nullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
}

export interface PostgresData {
  table: string;
  rows: any[];
  count: number;
}

export class PostgreSQLConnector {
  private pool: Pool;
  private connectionConfig: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };

  constructor(
    host: string,
    port: number,
    database: string,
    user: string,
    password: string
  ) {
    this.connectionConfig = { host, port, database, user, password };
    this.pool = new Pool(this.connectionConfig);
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query("SELECT NOW()");
      client.release();
      return true;
    } catch (error) {
      console.error("Erro ao testar conexão PostgreSQL:", error);
      return false;
    }
  }

  async getTables(): Promise<PostgresTable[]> {
    try {
      const result = await this.pool.query(`
        SELECT 
          t.table_name,
          t.table_schema,
          (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
        FROM information_schema.tables t
        WHERE t.table_schema NOT IN ('pg_catalog', 'information_schema')
        ORDER BY t.table_name
      `);

      const tables: PostgresTable[] = [];

      for (const row of result.rows) {
        const columns = await this.getTableColumns(row.table_name);
        const rowCount = await this.getTableRowCount(row.table_name);

        tables.push({
          name: row.table_name,
          schema: row.table_schema,
          rowCount,
          columns,
        });
      }

      return tables;
    } catch (error) {
      console.error("Erro ao obter tabelas PostgreSQL:", error);
      return [];
    }
  }

  async getTableColumns(tableName: string): Promise<PostgresColumn[]> {
    try {
      const result = await this.pool.query(`
        SELECT 
          c.column_name,
          c.data_type,
          c.is_nullable,
          CASE WHEN tc.constraint_type = 'PRIMARY KEY' THEN true ELSE false END as is_primary_key,
          CASE WHEN tc.constraint_type = 'FOREIGN KEY' THEN true ELSE false END as is_foreign_key
        FROM information_schema.columns c
        LEFT JOIN information_schema.key_column_usage kcu ON c.table_name = kcu.table_name AND c.column_name = kcu.column_name
        LEFT JOIN information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name
        WHERE c.table_name = $1
        ORDER BY c.ordinal_position
      `, [tableName]);

      return result.rows.map((row) => ({
        name: row.column_name,
        type: row.data_type,
        nullable: row.is_nullable === "YES",
        isPrimaryKey: row.is_primary_key || false,
        isForeignKey: row.is_foreign_key || false,
      }));
    } catch (error) {
      console.error("Erro ao obter colunas PostgreSQL:", error);
      return [];
    }
  }

  async getTableRowCount(tableName: string): Promise<number> {
    try {
      const result = await this.pool.query(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      console.error("Erro ao contar linhas PostgreSQL:", error);
      return 0;
    }
  }

  async getTableData(
    tableName: string,
    limit: number = 1000,
    offset: number = 0
  ): Promise<PostgresData> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM ${tableName} LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      const countResult = await this.pool.query(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );

      return {
        table: tableName,
        rows: result.rows,
        count: parseInt(countResult.rows[0].count, 10),
      };
    } catch (error) {
      console.error("Erro ao obter dados PostgreSQL:", error);
      return { table: tableName, rows: [], count: 0 };
    }
  }

  async syncAll() {
    const startTime = Date.now();
    let recordsSynced = 0;
    let recordsFailed = 0;

    try {
      const tables = await this.getTables();
      recordsSynced = tables.length;

      const allData = [];
      for (const table of tables) {
        try {
          const data = await this.getTableData(table.name, 1000);
          allData.push(data);
          recordsSynced += data.rows.length;
        } catch (error) {
          recordsFailed++;
        }
      }

      return {
        tables,
        data: allData,
        recordsSynced,
        recordsFailed,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      console.error("Erro ao sincronizar PostgreSQL:", error);
      return {
        tables: [],
        data: [],
        recordsSynced,
        recordsFailed,
        duration: Date.now() - startTime,
      };
    }
  }

  async close() {
    await this.pool.end();
  }
}

// ============ MYSQL CONNECTOR ============

export interface MySQLTable {
  name: string;
  engine: string;
  rowCount: number;
  columns: MySQLColumn[];
}

export interface MySQLColumn {
  name: string;
  type: string;
  nullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
}

export interface MySQLData {
  table: string;
  rows: any[];
  count: number;
}

export class MySQLConnector {
  private pool: mysql.Pool;
  private connectionConfig: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };

  constructor(
    host: string,
    port: number,
    database: string,
    user: string,
    password: string
  ) {
    this.connectionConfig = { host, port, database, user, password };
    this.pool = mysql.createPool(this.connectionConfig);
  }

  async testConnection(): Promise<boolean> {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      return true;
    } catch (error) {
      console.error("Erro ao testar conexão MySQL:", error);
      return false;
    }
  }

  async getTables(): Promise<MySQLTable[]> {
    try {
      const connection = await this.pool.getConnection();
      const [tables] = await connection.query(
        `SELECT TABLE_NAME, ENGINE FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?`,
        [this.connectionConfig.database]
      );

      const result: MySQLTable[] = [];

      for (const table of tables as any[]) {
        const columns = await this.getTableColumns(table.TABLE_NAME);
        const rowCount = await this.getTableRowCount(table.TABLE_NAME);

        result.push({
          name: table.TABLE_NAME,
          engine: table.ENGINE,
          rowCount,
          columns,
        });
      }

      connection.release();
      return result;
    } catch (error) {
      console.error("Erro ao obter tabelas MySQL:", error);
      return [];
    }
  }

  async getTableColumns(tableName: string): Promise<MySQLColumn[]> {
    try {
      const connection = await this.pool.getConnection();
      const [columns] = await connection.query(
        `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
        [this.connectionConfig.database, tableName]
      );

      connection.release();

      return (columns as any[]).map((col) => ({
        name: col.COLUMN_NAME,
        type: col.COLUMN_TYPE,
        nullable: col.IS_NULLABLE === "YES",
        isPrimaryKey: col.COLUMN_KEY === "PRI",
        isForeignKey: col.COLUMN_KEY === "MUL",
      }));
    } catch (error) {
      console.error("Erro ao obter colunas MySQL:", error);
      return [];
    }
  }

  async getTableRowCount(tableName: string): Promise<number> {
    try {
      const connection = await this.pool.getConnection();
      const [result] = await connection.query(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );

      connection.release();
      return (result as any[])[0].count;
    } catch (error) {
      console.error("Erro ao contar linhas MySQL:", error);
      return 0;
    }
  }

  async getTableData(
    tableName: string,
    limit: number = 1000,
    offset: number = 0
  ): Promise<MySQLData> {
    try {
      const connection = await this.pool.getConnection();
      const [rows] = await connection.query(
        `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [countResult] = await connection.query(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );

      connection.release();

      return {
        table: tableName,
        rows: rows as any[],
        count: (countResult as any[])[0].count,
      };
    } catch (error) {
      console.error("Erro ao obter dados MySQL:", error);
      return { table: tableName, rows: [], count: 0 };
    }
  }

  async syncAll() {
    const startTime = Date.now();
    let recordsSynced = 0;
    let recordsFailed = 0;

    try {
      const tables = await this.getTables();
      recordsSynced = tables.length;

      const allData = [];
      for (const table of tables) {
        try {
          const data = await this.getTableData(table.name, 1000);
          allData.push(data);
          recordsSynced += data.rows.length;
        } catch (error) {
          recordsFailed++;
        }
      }

      return {
        tables,
        data: allData,
        recordsSynced,
        recordsFailed,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      console.error("Erro ao sincronizar MySQL:", error);
      return {
        tables: [],
        data: [],
        recordsSynced,
        recordsFailed,
        duration: Date.now() - startTime,
      };
    }
  }

  async close() {
    await this.pool.end();
  }
}

export default { PostgreSQLConnector, MySQLConnector };

