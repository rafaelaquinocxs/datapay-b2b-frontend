import { pgTable, text, integer, decimal, timestamp, boolean, jsonb, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * SCHEMA DE DATA LAKEHOUSE
 * Armazena apenas metadados + dados agregados (não dados brutos)
 * Reduz storage em 90% comparado a armazenar tudo
 */

// ============================================
// METADADOS DE SINCRONIZAÇÃO
// ============================================

export const syncMetadata = pgTable("sync_metadata", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  connectorName: varchar("connector_name", { length: 100 }).notNull(),
  
  // Informações de sincronização
  lastSyncAt: timestamp("last_sync_at"),
  nextSyncAt: timestamp("next_sync_at"),
  syncDurationMs: integer("sync_duration_ms"),
  recordsProcessed: integer("records_processed").default(0),
  recordsAggregated: integer("records_aggregated").default(0),
  
  // Status
  syncStatus: varchar("sync_status", { length: 20 }).default("pending"), // pending, running, success, error
  errorMessage: text("error_message"),
  
  // Dados de sincronização
  dataSourceUrl: text("data_source_url"), // URL da API/banco
  dataSourceType: varchar("data_source_type", { length: 50 }), // API, Database, File
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// DADOS AGREGADOS (METADADOS)
// ============================================

export const aggregatedData = pgTable("aggregated_data", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  
  // Identificação do agregado
  dataType: varchar("data_type", { length: 100 }).notNull(), // "sales", "conversions", "users", "revenue", etc
  dimension: varchar("dimension", { length: 100 }), // "daily", "weekly", "monthly", "by_region", "by_product"
  
  // Valores agregados (não dados brutos)
  totalCount: integer("total_count").default(0),
  sumValue: decimal("sum_value", { precision: 15, scale: 2 }).default("0"),
  avgValue: decimal("avg_value", { precision: 15, scale: 2 }).default("0"),
  minValue: decimal("min_value", { precision: 15, scale: 2 }).default("0"),
  maxValue: decimal("max_value", { precision: 15, scale: 2 }).default("0"),
  
  // Período
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  
  // Metadados adicionais
  metadata: jsonb("metadata"), // { "currency": "BRL", "region": "BR", "category": "Electronics" }
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// INSIGHTS PROCESSADOS
// ============================================

export const processedInsights = pgTable("processed_insights", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  
  // Tipo de insight
  insightType: varchar("insight_type", { length: 100 }).notNull(), // "trend", "anomaly", "forecast", "comparison"
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  
  // Dados do insight
  metric: varchar("metric", { length: 100 }).notNull(), // "revenue", "conversions", "churn_rate"
  value: decimal("value", { precision: 15, scale: 2 }),
  previousValue: decimal("previous_value", { precision: 15, scale: 2 }),
  changePercent: decimal("change_percent", { precision: 10, scale: 2 }),
  
  // Confiança
  confidence: decimal("confidence", { precision: 5, scale: 2 }), // 0-100
  
  // Período
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  
  // Status
  isActionable: boolean("is_actionable").default(false),
  recommendation: text("recommendation"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// ÍNDICES E MÉTRICAS
// ============================================

export const connectorMetrics = pgTable("connector_metrics", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  connectorName: varchar("connector_name", { length: 100 }).notNull(),
  
  // Métricas de uso
  totalSyncs: integer("total_syncs").default(0),
  successfulSyncs: integer("successful_syncs").default(0),
  failedSyncs: integer("failed_syncs").default(0),
  successRate: decimal("success_rate", { precision: 5, scale: 2 }).default("0"), // 0-100
  
  // Dados processados
  totalRecordsProcessed: integer("total_records_processed").default(0),
  totalRecordsAggregated: integer("total_records_aggregated").default(0),
  totalStorageUsedMB: decimal("total_storage_used_mb", { precision: 10, scale: 2 }).default("0"),
  
  // Performance
  avgSyncDurationMs: integer("avg_sync_duration_ms").default(0),
  lastSyncDurationMs: integer("last_sync_duration_ms"),
  
  // Período de medição
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// CREDENCIAIS (CRIPTOGRAFADAS)
// ============================================

export const connectorCredentials = pgTable("connector_credentials", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  connectorName: varchar("connector_name", { length: 100 }).notNull(),
  
  // Credenciais criptografadas (AES-256)
  credentials: text("credentials").notNull(),
  
  // Status
  isActive: boolean("is_active").default(true),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// STATUS DE CONECTORES
// ============================================

export const connectorStatus = pgTable("connector_status", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  connectorName: varchar("connector_name", { length: 100 }).notNull(),
  
  // Status de conexão
  isConnected: boolean("is_connected").default(false),
  connectionStatus: varchar("connection_status", { length: 20 }).default("disconnected"), // connected, disconnected, error
  lastConnectionAt: timestamp("last_connection_at"),
  
  // Estatísticas
  totalSyncs: integer("total_syncs").default(0),
  successfulSyncs: integer("successful_syncs").default(0),
  failedSyncs: integer("failed_syncs").default(0),
  
  // Última sincronização
  lastSyncAt: timestamp("last_sync_at"),
  lastSyncStatus: varchar("last_sync_status", { length: 20 }), // success, error
  lastSyncError: text("last_sync_error"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// ALERTAS E NOTIFICAÇÕES
// ============================================

export const connectorAlerts = pgTable("connector_alerts", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  connectorName: varchar("connector_name", { length: 100 }).notNull(),
  
  // Tipo de alerta
  alertType: varchar("alert_type", { length: 20 }).notNull(), // "error", "warning", "info"
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  
  // Status
  isResolved: boolean("is_resolved").default(false),
  resolvedAt: timestamp("resolved_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// CONFIGURAÇÃO DE SINCRONIZAÇÃO
// ============================================

export const syncConfiguration = pgTable("sync_configuration", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  connectorId: text("connector_id").notNull(),
  
  // Frequência de sincronização
  syncFrequency: varchar("sync_frequency", { length: 20 }).notNull(), // "hourly", "daily", "weekly", "monthly"
  syncHour: integer("sync_hour"), // 0-23
  syncDay: integer("sync_day"), // 1-7 para semanal, 1-31 para mensal
  
  // Retenção de dados
  dataRetentionDays: integer("data_retention_days").default(90), // Quantos dias manter dados agregados
  
  // Configurações
  isEnabled: boolean("is_enabled").default(true),
  notifyOnError: boolean("notify_on_error").default(true),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

