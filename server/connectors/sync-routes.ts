/**
 * Rotas de Sincronização
 * Endpoints REST para gerenciar sincronização de conectores
 */

import { Router, Request, Response } from "express";
import SyncService from "./sync-service";

export function createSyncRouter(syncService: SyncService): Router {
  const router = Router();

  /**
   * POST /api/sync/connector/:id
   * Sincroniza um conector específico
   */
  router.post("/connector/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const log = await syncService.syncConnector(id);
      res.json(log);
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
  router.get("/logs", (req: Request, res: Response) => {
    const { connectorId, status, limit } = req.query;

    const logs = syncService.getLogs({
      connectorId: connectorId as string,
      status: status as "success" | "error",
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.json(logs);
  });

  /**
   * GET /api/sync/logs/:connectorId
   * Obtém logs de um conector específico
   */
  router.get("/logs/:connectorId", (req: Request, res: Response) => {
    const { connectorId } = req.params;
    const { limit } = req.query;

    const logs = syncService.getLogs({
      connectorId,
      limit: limit ? parseInt(limit as string) : 100,
    });

    res.json(logs);
  });

  /**
   * GET /api/sync/stats
   * Obtém estatísticas de sincronização
   */
  router.get("/stats", (req: Request, res: Response) => {
    const { connectorId } = req.query;

    const stats = syncService.getStats(connectorId as string);
    res.json(stats);
  });

  /**
   * GET /api/sync/stats/:connectorId
   * Obtém estatísticas de um conector específico
   */
  router.get("/stats/:connectorId", (req: Request, res: Response) => {
    const { connectorId } = req.params;

    const stats = syncService.getStats(connectorId);
    res.json(stats);
  });

  /**
   * GET /api/sync/jobs
   * Obtém status de todos os jobs
   */
  router.get("/jobs", (req: Request, res: Response) => {
    const jobs = syncService.getJobsStatus();
    res.json(jobs);
  });

  /**
   * POST /api/sync/jobs/:jobId/stop
   * Para um job específico
   */
  router.post("/jobs/:jobId/stop", (req: Request, res: Response) => {
    const { jobId } = req.params;

    const result = syncService.stopJob(jobId);
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
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
  router.post("/jobs/restart-all", (req: Request, res: Response) => {
    try {
      syncService.restartAllJobs();
      res.json({ success: true, message: "Todos os jobs foram reiniciados" });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  /**
   * POST /api/sync/jobs/create
   * Cria um novo job de sincronização
   */
  router.post("/jobs/create", (req: Request, res: Response) => {
    const { jobId, schedule, connectorId } = req.body;

    if (!jobId || !schedule || !connectorId) {
      return res
        .status(400)
        .json({ error: "jobId, schedule e connectorId são obrigatórios" });
    }

    const result = syncService.createJob(jobId, schedule, async () => {
      await syncService.syncConnector(connectorId);
    });

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  });

  return router;
}

export default createSyncRouter;

