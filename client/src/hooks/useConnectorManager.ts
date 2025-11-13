import { useState, useCallback } from "react";

export interface ConnectorCredential {
  id: string;
  connectorId: string;
  connectorName: string;
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync?: Date;
  nextSync?: Date;
  recordsSynced?: number;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncLog {
  id: string;
  connectorId: string;
  status: "success" | "error" | "pending";
  recordsSynced: number;
  recordsFailed: number;
  duration: number;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}

export function useConnectorManager() {
  const [connectors, setConnectors] = useState<ConnectorCredential[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obter todos os conectores
  const fetchConnectors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/sync/connector-statuses");
      if (!response.ok) throw new Error("Erro ao buscar conectores");

      const data = await response.json();
      setConnectors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  // Conectar um conector
  const connectConnector = useCallback(
    async (connectorId: string, credentials: Record<string, string>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/sync/connector/${connectorId}/connect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erro ao conectar");
        }

        const data = await response.json();

        // Atualizar lista de conectores
        setConnectors((prev) =>
          prev.map((c) =>
            c.connectorId === connectorId
              ? { ...c, status: "connected", error: undefined }
              : c
          )
        );

        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Desconectar um conector
  const disconnectConnector = useCallback(async (connectorId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sync/connector/${connectorId}/disconnect`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Erro ao desconectar");

      setConnectors((prev) =>
        prev.map((c) =>
          c.connectorId === connectorId
            ? { ...c, status: "disconnected", error: undefined }
            : c
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sincronizar um conector
  const syncConnector = useCallback(async (connectorId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Atualizar status para "syncing"
      setConnectors((prev) =>
        prev.map((c) =>
          c.connectorId === connectorId ? { ...c, status: "syncing" } : c
        )
      );

      const response = await fetch(`/api/sync/connector/${connectorId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao sincronizar");
      }

      const data = await response.json();

      // Atualizar status para "connected" com informações de sincronização
      setConnectors((prev) =>
        prev.map((c) =>
          c.connectorId === connectorId
            ? {
                ...c,
                status: "connected",
                lastSync: new Date(),
                recordsSynced: data.recordsSynced,
                error: undefined,
              }
            : c
        )
      );

      // Adicionar log de sincronização
      setSyncLogs((prev) => [
        {
          id: `${connectorId}-${Date.now()}`,
          connectorId,
          status: "success",
          recordsSynced: data.recordsSynced,
          recordsFailed: data.recordsFailed,
          duration: data.duration,
          startedAt: new Date(Date.now() - data.duration),
          completedAt: new Date(),
        },
        ...prev,
      ]);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);

      // Atualizar status para "error"
      setConnectors((prev) =>
        prev.map((c) =>
          c.connectorId === connectorId
            ? { ...c, status: "error", error: message }
            : c
        )
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obter logs de sincronização
  const fetchSyncLogs = useCallback(async (connectorId?: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL("/api/sync/logs", window.location.origin);
      if (connectorId) {
        url.searchParams.append("connectorId", connectorId);
      }

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Erro ao buscar logs");

      const data = await response.json();
      setSyncLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  // Testar conexão
  const testConnection = useCallback(
    async (connectorId: string, credentials: Record<string, string>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/sync/connector/${connectorId}/test`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erro ao testar conexão");
        }

        return await response.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    connectors,
    syncLogs,
    loading,
    error,
    fetchConnectors,
    connectConnector,
    disconnectConnector,
    syncConnector,
    fetchSyncLogs,
    testConnection,
  };
}

