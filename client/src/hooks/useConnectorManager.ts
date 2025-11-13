import { useState, useCallback } from "react";
import { toast } from "sonner";

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
  status: "success" | "error" | "pending" | "running";
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

  // Obter ID do usuário
  const getUserId = useCallback(() => {
    return localStorage.getItem("userId") || "user-demo";
  }, []);

  // Obter todos os conectores
  const fetchConnectors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = getUserId();
      const response = await fetch(`/api/connectors/status/${userId}`);
      if (!response.ok) throw new Error("Erro ao buscar conectores");

      const data = await response.json();
      setConnectors(data.statuses || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  }, [getUserId]);

  // Conectar um conector
  const connectConnector = useCallback(
    async (connectorId: string, connectorName: string, credentials: Record<string, string>) => {
      setLoading(true);
      setError(null);

      try {
        const userId = getUserId();

        // 1. Testar conexão
        const testResponse = await fetch("/api/connectors/test-connection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectorId, credentials }),
        });

        if (!testResponse.ok) {
          throw new Error("Falha ao testar conexão");
        }

        const testData = await testResponse.json();
        if (!testData.isValid) {
          throw new Error(testData.message || "Credenciais inválidas");
        }

        // 2. Conectar conector
        const response = await fetch("/api/connectors/connect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            connectorId,
            connectorName,
            credentials,
            userId,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erro ao conectar");
        }

        const data = await response.json();

        // Atualizar lista de conectores
        await fetchConnectors();
        toast.success(data.message || `${connectorName} conectado com sucesso!`);

        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getUserId, fetchConnectors]
  );

  // Desconectar um conector
  const disconnectConnector = useCallback(
    async (connectorId: string) => {
      setLoading(true);
      setError(null);

      try {
        const userId = getUserId();

        const response = await fetch("/api/connectors/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectorId, userId }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erro ao desconectar");
        }

        const data = await response.json();

        // Atualizar lista de conectores
        await fetchConnectors();
        toast.success(data.message || "Conector desconectado com sucesso!");

        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getUserId, fetchConnectors]
  );

  // Sincronizar um conector
  const syncConnector = useCallback(
    async (connectorId: string) => {
      setLoading(true);
      setError(null);

      try {
        const userId = getUserId();

        // Atualizar status para "syncing"
        setConnectors((prev) =>
          prev.map((c) =>
            c.connectorId === connectorId ? { ...c, status: "syncing" } : c
          )
        );

        const response = await fetch(`/api/sync/connector/${connectorId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
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
            recordsSynced: data.recordsSynced || 0,
            recordsFailed: data.recordsFailed || 0,
            duration: data.duration || 0,
            startedAt: new Date(Date.now() - (data.duration || 0)),
            completedAt: new Date(),
          },
          ...prev,
        ]);

        toast.success("Sincronização concluída com sucesso!");
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(message);
        toast.error(message);

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
    },
    [getUserId]
  );

  // Obter logs de sincronização
  const fetchSyncLogs = useCallback(
    async (connectorId?: string) => {
      setLoading(true);
      setError(null);

      try {
        const userId = getUserId();
        const url = new URL("/api/sync/logs", window.location.origin);
        url.searchParams.append("userId", userId);
        if (connectorId) {
          url.searchParams.append("connectorId", connectorId);
        }

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error("Erro ao buscar logs");

        const data = await response.json();
        setSyncLogs(data.logs || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setError(message);
        console.error(message);
      } finally {
        setLoading(false);
      }
    },
    [getUserId]
  );

  // Testar conexão
  const testConnection = useCallback(
    async (connectorId: string, credentials: Record<string, string>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/connectors/test-connection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectorId, credentials }),
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

