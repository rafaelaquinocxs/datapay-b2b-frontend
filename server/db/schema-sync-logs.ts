/**
 * Schema de Logs de Sincronização
 * Tabelas para armazenar histórico de sincronizações
 */

import { pgTable, text, timestamp, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Tabela de Logs de Sincronização
 */
export const syncLogs = pgTable("sync_logs", {
  id: varchar("id", { length: 255 }).primaryKey(),
  connectorId: varchar("connector_id", { length: 100 }).notNull(),
  connectorName: varchar("connector_name", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull(), // "success" | "error" | "running"
  recordsSynced: integer("records_synced").notNull().default(0),
  recordsFailed: integer("records_failed").notNull().default(0),
  duration: integer("duration").notNull().default(0), // em ms
  error: text("error"),
  details: text("details"), // JSON stringified
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Tabela de Status de Conectores
 */
export const connectorStatus = pgTable("connector_status", {
  id: varchar("id", { length: 255 }).primaryKey(),
  connectorId: varchar("connector_id", { length: 100 }).notNull().unique(),
  connectorName: varchar("connector_name", { length: 255 }).notNull(),
  isConnected: boolean("is_connected").notNull().default(false),
  lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
  lastSyncStatus: varchar("last_sync_status", { length: 20 }), // "success" | "error"
  lastError: text("last_error"),
  totalSyncs: integer("total_syncs").notNull().default(0),
  successfulSyncs: integer("successful_syncs").notNull().default(0),
  failedSyncs: integer("failed_syncs").notNull().default(0),
  totalRecordsSynced: integer("total_records_synced").notNull().default(0),
  averageDuration: integer("average_duration").notNull().default(0), // em ms
  nextScheduledSync: timestamp("next_scheduled_sync", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Tabela de Jobs de Sincronização
 */
export const syncJobs = pgTable("sync_jobs", {
  id: varchar("id", { length: 255 }).primaryKey(),
  jobId: varchar("job_id", { length: 100 }).notNull().unique(),
  schedule: varchar("schedule", { length: 255 }).notNull(), // Cron expression
  connectorId: varchar("connector_id", { length: 100 }),
  isActive: boolean("is_active").notNull().default(true),
  lastRunAt: timestamp("last_run_at", { withTimezone: true }),
  nextRunAt: timestamp("next_run_at", { withTimezone: true }),
  lastRunStatus: varchar("last_run_status", { length: 20 }), // "success" | "error"
  lastRunError: text("last_run_error"),
  description: text("description"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Tabela de Alertas de Sincronização
 */
export const syncAlerts = pgTable("sync_alerts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  connectorId: varchar("connector_id", { length: 100 }).notNull(),
  connectorName: varchar("connector_name", { length: 255 }).notNull(),
  alertType: varchar("alert_type", { length: 50 }).notNull(), // "error" | "warning" | "info"
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isResolved: boolean("is_resolved").notNull().default(false),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Relações
 */
export const syncLogsRelations = relations(syncLogs, ({ one }) => ({
  connectorStatus: one(connectorStatus, {
    fields: [syncLogs.connectorId],
    references: [connectorStatus.connectorId],
  }),
}));

export const connectorStatusRelations = relations(connectorStatus, ({ many }) => ({
  syncLogs: many(syncLogs),
  syncAlerts: many(syncAlerts),
}));

export const syncAlertsRelations = relations(syncAlerts, ({ one }) => ({
  connectorStatus: one(connectorStatus, {
    fields: [syncAlerts.connectorId],
    references: [connectorStatus.connectorId],
  }),
}));

/**
 * Types
 */
export type SyncLog = typeof syncLogs.$inferSelect;
export type SyncLogInsert = typeof syncLogs.$inferInsert;

export type ConnectorStatus = typeof connectorStatus.$inferSelect;
export type ConnectorStatusInsert = typeof connectorStatus.$inferInsert;

export type SyncJob = typeof syncJobs.$inferSelect;
export type SyncJobInsert = typeof syncJobs.$inferInsert;

export type SyncAlert = typeof syncAlerts.$inferSelect;
export type SyncAlertInsert = typeof syncAlerts.$inferInsert;

