import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronDown,
  Download,
  RotateCw,
} from "lucide-react";

interface SyncLog {
  id: string;
  connectorId: string;
  connectorName: string;
  status: "success" | "error" | "pending";
  recordsSynced: number;
  recordsFailed: number;
  duration: number;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}

interface SyncHistoryPanelProps {
  connectorId: string;
  connectorName: string;
  logs: SyncLog[];
  onRetry?: (connectorId: string) => Promise<void>;
  onExport?: (connectorId: string) => Promise<void>;
  loading?: boolean;
}

export function SyncHistoryPanel({
  connectorId,
  connectorName,
  logs,
  onRetry,
  onExport,
  loading = false,
}: SyncHistoryPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filteredLogs, setFilteredLogs] = useState<SyncLog[]>(logs);

  useEffect(() => {
    setFilteredLogs(logs.filter((log) => log.connectorId === connectorId));
  }, [logs, connectorId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Sucesso</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      default:
        return null;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{connectorName} - Histórico</CardTitle>
          <div className="flex gap-2">
            {onExport && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onExport(connectorId)}
                disabled={loading}
              >
                <Download className="w-4 h-4 mr-1" />
                Exportar
              </Button>
            )}
            {onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRetry(connectorId)}
                disabled={loading}
              >
                <RotateCw className="w-4 h-4 mr-1" />
                Sincronizar Agora
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">Nenhuma sincronização realizada</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-2 pr-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="border rounded-lg p-3 hover:bg-accent transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === log.id ? null : log.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(log.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {formatDate(new Date(log.startedAt))}
                          </span>
                          {getStatusBadge(log.status)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {log.recordsSynced} registros sincronizados
                          {log.recordsFailed > 0 && ` • ${log.recordsFailed} erros`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-muted-foreground">
                        {formatDuration(log.duration)}
                      </p>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform ${
                          expandedId === log.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* DETALHES EXPANDIDOS */}
                  {expandedId === log.id && (
                    <div className="mt-3 pt-3 border-t space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Iniciado em</p>
                          <p className="font-medium">
                            {formatDate(new Date(log.startedAt))}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Concluído em</p>
                          <p className="font-medium">
                            {log.completedAt
                              ? formatDate(new Date(log.completedAt))
                              : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Registros Sincronizados</p>
                          <p className="font-medium text-green-600">{log.recordsSynced}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Erros</p>
                          <p className={`font-medium ${log.recordsFailed > 0 ? "text-red-600" : "text-green-600"}`}>
                            {log.recordsFailed}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Duração</p>
                          <p className="font-medium">{formatDuration(log.duration)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          {getStatusBadge(log.status)}
                        </div>
                      </div>

                      {log.error && (
                        <div className="bg-red-50 border border-red-200 rounded p-2 mt-2">
                          <p className="text-xs font-medium text-red-900 mb-1">Erro:</p>
                          <p className="text-xs text-red-800 font-mono break-words">
                            {log.error}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

export default SyncHistoryPanel;

