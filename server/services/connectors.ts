import fs from "fs";
import path from "path";
import csv from "csv-parse/sync";
import * as XLSX from "xlsx";

export interface ConnectorConfig {
  type: "csv" | "excel" | "api" | "postgresql" | "mysql" | "salesforce" | "sap" | "vtex";
  name: string;
  config: Record<string, unknown>;
}

export interface SyncResult {
  success: boolean;
  recordsProcessed: number;
  recordsInserted: number;
  recordsUpdated: number;
  recordsSkipped: number;
  errors: string[];
  duration: number;
}

// CSV Connector
export async function readCSV(filePath: string): Promise<Record<string, unknown>[]> {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const records = csv.parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

// Excel Connector
export async function readExcel(filePath: string, sheetName?: string): Promise<Record<string, unknown>[]> {
  const workbook = XLSX.readFile(filePath);
  const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
  const records = XLSX.utils.sheet_to_json(sheet);
  return records;
}

// API Connector
export async function fetchFromAPI(url: string, headers?: Record<string, string>): Promise<Record<string, unknown>[]> {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  const data = await response.json();
  return Array.isArray(data) ? data : data.data || [];
}

// PostgreSQL Connector
export async function readPostgreSQL(
  connectionString: string,
  query: string
): Promise<Record<string, unknown>[]> {
  try {
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString });
    const result = await pool.query(query);
    await pool.end();
    return result.rows;
  } catch (error) {
    throw new Error(`PostgreSQL Error: ${error}`);
  }
}

// MySQL Connector
export async function readMySQL(
  connectionString: string,
  query: string
): Promise<Record<string, unknown>[]> {
  try {
    const mysql = await import("mysql2/promise");
    const connection = await mysql.createConnection(connectionString);
    const [rows] = await connection.execute(query);
    await connection.end();
    return rows as Record<string, unknown>[];
  } catch (error) {
    throw new Error(`MySQL Error: ${error}`);
  }
}

// Salesforce Connector
export async function readSalesforce(
  instanceUrl: string,
  accessToken: string,
  soqlQuery: string
): Promise<Record<string, unknown>[]> {
  const response = await fetch(`${instanceUrl}/services/data/v57.0/query`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: soqlQuery }),
    method: "POST",
  });

  if (!response.ok) throw new Error(`Salesforce Error: ${response.statusText}`);
  const data = await response.json() as { records?: Record<string, unknown>[] };
  return data.records || [];
}

// SAP Connector
export async function readSAP(
  baseUrl: string,
  username: string,
  password: string,
  entity: string
): Promise<Record<string, unknown>[]> {
  const auth = Buffer.from(`${username}:${password}`).toString("base64");
  const response = await fetch(`${baseUrl}/sap/opu/odata/sap/${entity}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) throw new Error(`SAP Error: ${response.statusText}`);
  const data = await response.json() as { d?: { results?: Record<string, unknown>[] } };
  return data.d?.results || [];
}

// VTEX Connector
export async function readVTEX(
  accountName: string,
  apiKey: string,
  apiToken: string,
  endpoint: string
): Promise<Record<string, unknown>[]> {
  const response = await fetch(`https://${accountName}.vtexcommercestable.com.br/api/catalog_system/pvt/${endpoint}`, {
    headers: {
      "X-VTEX-API-AppKey": apiKey,
      "X-VTEX-API-AppToken": apiToken,
    },
  });

  if (!response.ok) throw new Error(`VTEX Error: ${response.statusText}`);
  return await response.json() as Record<string, unknown>[];
}

// ETL: Transform data
export function transformData(
  records: Record<string, unknown>[],
  mappings: Record<string, string>
): Record<string, unknown>[] {
  return records.map((record) => {
    const transformed: Record<string, unknown> = {};
    for (const [source, target] of Object.entries(mappings)) {
      if (source in record) {
        transformed[target] = record[source];
      }
    }
    return transformed;
  });
}

// Validation
export function validateRecords(
  records: Record<string, unknown>[],
  schema: Record<string, "string" | "number" | "boolean" | "date">
): { valid: Record<string, unknown>[]; invalid: Array<{ record: Record<string, unknown>; errors: string[] }> } {
  const valid: Record<string, unknown>[] = [];
  const invalid: Array<{ record: Record<string, unknown>; errors: string[] }> = [];

  for (const record of records) {
    const errors: string[] = [];

    for (const [field, type] of Object.entries(schema)) {
      const value = record[field];

      if (value === null || value === undefined) {
        errors.push(`${field} is required`);
        continue;
      }

      switch (type) {
        case "string":
          if (typeof value !== "string") errors.push(`${field} must be string`);
          break;
        case "number":
          if (typeof value !== "number") errors.push(`${field} must be number`);
          break;
        case "boolean":
          if (typeof value !== "boolean") errors.push(`${field} must be boolean`);
          break;
        case "date":
          if (!(value instanceof Date) && isNaN(Date.parse(String(value)))) {
            errors.push(`${field} must be valid date`);
          }
          break;
      }
    }

    if (errors.length > 0) {
      invalid.push({ record, errors });
    } else {
      valid.push(record);
    }
  }

  return { valid, invalid };
}

// Deduplication
export function deduplicateRecords(
  records: Record<string, unknown>[],
  uniqueFields: string[]
): Record<string, unknown>[] {
  const seen = new Set<string>();
  const deduplicated: Record<string, unknown>[] = [];

  for (const record of records) {
    const key = uniqueFields.map((field) => record[field]).join("|");

    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(record);
    }
  }

  return deduplicated;
}

// Main sync function
export async function syncData(
  connector: ConnectorConfig,
  mappings: Record<string, string>,
  schema: Record<string, "string" | "number" | "boolean" | "date">,
  uniqueFields: string[]
): Promise<SyncResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  let records: Record<string, unknown>[] = [];

  try {
    // Fetch data based on connector type
    switch (connector.type) {
      case "csv":
        records = await readCSV(connector.config.filePath as string);
        break;
      case "excel":
        records = await readExcel(connector.config.filePath as string, connector.config.sheetName as string | undefined);
        break;
      case "api":
        records = await fetchFromAPI(connector.config.url as string, connector.config.headers as Record<string, string> | undefined);
        break;
      case "postgresql":
        records = await readPostgreSQL(connector.config.connectionString as string, connector.config.query as string);
        break;
      case "mysql":
        records = await readMySQL(connector.config.connectionString as string, connector.config.query as string);
        break;
      case "salesforce":
        records = await readSalesforce(
          connector.config.instanceUrl as string,
          connector.config.accessToken as string,
          connector.config.soqlQuery as string
        );
        break;
      case "sap":
        records = await readSAP(
          connector.config.baseUrl as string,
          connector.config.username as string,
          connector.config.password as string,
          connector.config.entity as string
        );
        break;
      case "vtex":
        records = await readVTEX(
          connector.config.accountName as string,
          connector.config.apiKey as string,
          connector.config.apiToken as string,
          connector.config.endpoint as string
        );
        break;
    }

    const recordsProcessed = records.length;

    // Transform
    records = transformData(records, mappings);

    // Validate
    const { valid, invalid } = validateRecords(records, schema);
    if (invalid.length > 0) {
      errors.push(`${invalid.length} records failed validation`);
    }

    // Deduplicate
    records = deduplicateRecords(valid, uniqueFields);

    const duration = Date.now() - startTime;

    return {
      success: errors.length === 0,
      recordsProcessed,
      recordsInserted: records.length,
      recordsUpdated: 0,
      recordsSkipped: invalid.length,
      errors,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      recordsProcessed: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      recordsSkipped: 0,
      errors: [String(error)],
      duration,
    };
  }
}
