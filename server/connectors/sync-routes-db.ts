/**
 * Rotas de Sincronização com Persistência em Banco de Dados
 * Endpoints REST para gerenciar sincronização com logs persistentes
 */

import { Router, Request, Response } from "express";
import SyncServiceDB from "./sync-service-db";
import { db } from "@/server/db";
import { syncAlerts } from "@/server/db/schema-sync-logs";
import { eq } from "drizzle-orm";

export function createSyncRouterDB(syncService: SyncServiceDB): Router {
  const router = Router();

  /**
   * POST /api/sync/connector/:id
   * Sincroniza um conector específico
   */
  router.post("/connector/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await syncService.syncConnector(id);
      res.json({ success: true, message: `Sincronização de ${id} iniciada` });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/all
   * Sincroniza todos os conectores
   */
  router.post("/all", async (req: Request, res: Response) => {
    try {
      await syncService.syncAllConnectors();
      res.json({ success: true, message: "Sincronização de todos os conectores iniciada" });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/critical
   * Sincroniza apenas conectores críticos
   */
  router.post("/critical", async (req: Request, res: Response) => {
    try {
      await syncService.syncCriticalConnectors();
      res.json({ success: true, message: "Sincronização de conectores críticos iniciada" });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/logs
   * Obtém logs de sincronização
   */
  router.get("/logs", async (req: Request, res: Response) => {
    const { connectorId, status, limit } = req.query;

    try {
      const logs = await syncService.getLogs({
        connectorId: connectorId as string,
        status: status as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });

      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/logs/:connectorId
   * Obtém logs de um conector específico
   */
  router.get("/logs/:connectorId", async (req: Request, res: Response) => {
    const { connectorId } = req.params;
    const { limit } = req.query;

    try {
      const logs = await syncService.getLogs({
        connectorId,
        limit: limit ? parseInt(limit as string) : 100,
      });

      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/connector-statuses
   * Obtém status de todos os conectores
   */
  router.get("/connector-statuses", async (req: Request, res: Response) => {
    try {
      const statuses = await syncService.getConnectorStatuses();
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/connector-status/:connectorId
   * Obtém status de um conector específico
   */
  router.get("/connector-status/:connectorId", async (req: Request, res: Response) => {
    const { connectorId } = req.params;

    try {
      const status = await syncService.getConnectorStatus(connectorId);
      if (status) {
        res.json(status);
      } else {
        res.status(404).json({ error: "Conector não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/stats
   * Obtém estatísticas de sincronização
   */
  router.get("/stats", async (req: Request, res: Response) => {
    const { connectorId } = req.query;

    try {
      const stats = await syncService.getStats(connectorId as string);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/stats/:connectorId
   * Obtém estatísticas de um conector específico
   */
  router.get("/stats/:connectorId", async (req: Request, res: Response) => {
    const { connectorId } = req.params;

    try {
      const stats = await syncService.getStats(connectorId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/alerts
   * Obtém alertas não resolvidos
   */
  router.get("/alerts", async (req: Request, res: Response) => {
    try {
      const alerts = await syncService.getUnresolvedAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/alerts/:alertId/resolve
   * Marca alerta como resolvido
   */
  router.post("/alerts/:alertId/resolve", async (req: Request, res: Response) => {
    const { alertId } = req.params;

    try {
      await syncService.resolveAlert(alertId);
      res.json({ success: true, message: "Alerta resolvido" });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * GET /api/sync/jobs
   * Obtém status de todos os jobs
   */
  router.get("/jobs", async (req: Request, res: Response) => {
    try {
      const jobs = await syncService.getJobsStatus();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/jobs/:jobId/stop
   * Para um job específico
   */
  router.post("/jobs/:jobId/stop", async (req: Request, res: Response) => {
    const { jobId } = req.params;

    try {
      const result = await syncService.stopJob(jobId);
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/jobs/stop-all
   * Para todos os jobs
   */
  router.post("/jobs/stop-all", (req: Request, res: Response) => {
    try {
      syncService.stopAllJobs();
      res.json({ success: true, message: "Todos os jobs foram parados" });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/jobs/restart-all
   * Reinicia todos os jobs
   */
  router.post("/jobs/restart-all", async (req: Request, res: Response) => {
    try {
      await syncService.restartAllJobs();
      res.json({ success: true, message: "Todos os jobs foram reiniciados" });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/jobs/create
   * Cria um novo job de sincronização
   */
  router.post("/jobs/create", async (req: Request, res: Response) => {
    const { jobId, schedule, connectorId, description } = req.body;

    if (!jobId || !schedule) {
      return res.status(400).json({ error: "jobId e schedule são obrigatórios" });
    }

    try {
      const result = await syncService.createJob({
        jobId,
        schedule,
        connectorId,
        description,
      });

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  return router;
}

export default createSyncRouterDB;

