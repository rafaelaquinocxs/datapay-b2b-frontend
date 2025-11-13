import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Zap,
  Database,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  MoreVertical,
  X,
  Filter,
  Grid,
  List,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageTransition from "@/components/PageTransition";

// Conectores de grandes empresas com logos de marca
const CONNECTORS = [
  { id: "salesforce", nome: "Salesforce", categoria: "CRM", logo: "SF", descricao: "Gerenciamento de relacionamento com clientes" },
  { id: "sap", nome: "SAP", categoria: "ERP", logo: "SAP", descricao: "Planejamento de recursos empresariais" },
  { id: "google-analytics", nome: "Google Analytics", categoria: "Analytics", logo: "GA", descricao: "Análise de tráfego e comportamento web" },
  { id: "power-bi", nome: "Power BI", categoria: "BI", logo: "PBI", descricao: "Inteligência de negócios e visualização" },
  { id: "hubspot", nome: "HubSpot", categoria: "Marketing", logo: "HS", descricao: "Automação de marketing e vendas" },
  { id: "stripe", nome: "Stripe", categoria: "Pagamentos", logo: "STR", descricao: "Processamento de pagamentos online" },
  { id: "slack", nome: "Slack", categoria: "Comunicação", logo: "SLK", descricao: "Comunicação em tempo real" },
  { id: "jira", nome: "Jira", categoria: "Projeto", logo: "JRA", descricao: "Gerenciamento de projetos ágeis" },
  { id: "tableau", nome: "Tableau", categoria: "BI", logo: "TBL", descricao: "Visualização de dados avançada" },
  { id: "aws", nome: "AWS", categoria: "Cloud", logo: "AWS", descricao: "Serviços em nuvem Amazon" },
  { id: "azure", nome: "Azure", categoria: "Cloud", logo: "AZR", descricao: "Serviços em nuvem Microsoft" },
  { id: "csv", nome: "CSV/Excel", categoria: "Arquivo", logo: "CSV", descricao: "Upload de arquivos CSV ou Excel" },
];

const CATEGORIAS = ["Todos", "CRM", "ERP", "Analytics", "BI", "Marketing", "Pagamentos", "Comunicação", "Projeto", "Cloud", "Arquivo"];

interface ConnectorStatus {
  connectorId: string;
  connectorName: string;
  isConnected: boolean;
  lastSyncAt?: Date;
  lastSyncStatus?: "success" | "error";
  totalRecordsSynced: number;
  averageDuration: number;
}

interface SyncAlert {
  id: string;
  connectorId: string;
  connectorName: string;
  alertType: "error" | "warning" | "info";
  title: string;
  message: string;
  isResolved: boolean;
}

export default function MeusDados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [connectedSources, setConnectedSources] = useState<string[]>(["salesforce", "google-analytics"]);
  const [connectorStatuses, setConnectorStatuses] = useState<Map<string, ConnectorStatus>>(new Map());
  const [syncAlerts, setSyncAlerts] = useState<SyncAlert[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [stats, setStats] = useState({ totalConnectors: 0, connectedConnectors: 0, totalRecordsSynced: 0 });

  // Carregar status dos conectores
  useEffect(() => {
    const loadConnectorStatuses = async () => {
      try {
        const response = await fetch("/api/sync/connector-statuses");
        if (response.ok) {
          const data = await response.json();
          const statusMap = new Map();
          data.forEach((status: ConnectorStatus) => {
            statusMap.set(status.connectorId, status);
          });
          setConnectorStatuses(statusMap);
        }
      } catch (error) {
        console.error("Erro ao carregar status dos conectores:", error);
      }
    };

    const loadAlerts = async () => {
      try {
        const response = await fetch("/api/sync/alerts");
        if (response.ok) {
          const data = await response.json();
          setSyncAlerts(data);
        }
      } catch (error) {
        console.error("Erro ao carregar alertas:", error);
      }
    };

    const loadStats = async () => {
      try {
        const response = await fetch("/api/sync/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    };

    loadConnectorStatuses();
    loadAlerts();
    loadStats();

    // Recarregar a cada 30 segundos
    const interval = setInterval(() => {
      loadConnectorStatuses();
      loadAlerts();
      loadStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredConnectors = CONNECTORS.filter((connector) => {
    const matchSearch = connector.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "Todos" || connector.categoria === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleConnect = async (connectorId: string) => {
    try {
      if (connectedSources.includes(connectorId)) {
        setConnectedSources(connectedSources.filter(id => id !== connectorId));
        toast.success("Desconectado com sucesso!");
      } else {
        setConnectedSources([...connectedSources, connectorId]);
        toast.success("Conectado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao conectar/desconectar");
    }
  };

  const handleSync = async (connectorId: string) => {
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/sync/connector/${connectorId}`, { method: "POST" });
      if (response.ok) {
        toast.success("Sincronização iniciada!");
        // Recarregar status após 2 segundos
        setTimeout(() => {
          const loadStatus = async () => {
            const res = await fetch(`/api/sync/stats/${connectorId}`);
            if (res.ok) {
              const data = await res.json();
              const status = connectorStatuses.get(connectorId);
              if (status) {
                setConnectorStatuses(new Map(connectorStatuses.set(connectorId, { ...status, ...data })));
              }
            }
          };
          loadStatus();
        }, 2000);
      }
    } catch (error) {
      toast.error("Erro ao sincronizar");
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "error":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Meus Dados</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Conecte suas fontes de dados em segundos</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
              Integre com as principais plataformas de dados do mercado. Sincronize automaticamente e mantenha seus dados sempre atualizados.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fontes Conectadas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{connectedSources.length}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Disponíveis</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{CONNECTORS.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Registros Sincronizados</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalRecordsSynced.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Última Sincronização</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">Agora</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Alertas */}
          {syncAlerts.length > 0 && (
            <div className="space-y-2">
              {syncAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 dark:text-red-200">{alert.title}</h3>
                    <p className="text-sm text-red-700 dark:text-red-300">{alert.message}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSyncAlerts(syncAlerts.filter(a => a.id !== alert.id));
                    toast.success("Alerta descartado");
                  }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Filtros e Busca */}
          <div className="space-y-4">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar conectores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {CATEGORIAS.map((categoria) => (
                <Button
                  key={categoria}
                  variant={selectedCategory === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(categoria)}
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>

          {/* Conectores Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
            {filteredConnectors.map((connector) => {
              const status = connectorStatuses.get(connector.id);
              const isConnected = connectedSources.includes(connector.id);

              return (
                <Card
                  key={connector.id}
                  className={`border-2 transition-all ${
                    isConnected
                      ? "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                  } p-6 hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 text-sm">
                        {connector.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{connector.nome}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{connector.categoria}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSync(connector.id)} disabled={isSyncing}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Sincronizar Agora
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Ver Histórico
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{connector.descricao}</p>

                  {status && (
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(status.lastSyncStatus)}`}>
                          {getStatusIcon(status.lastSyncStatus)}
                          <span className="text-xs font-semibold">
                            {status.lastSyncStatus === "success" ? "Sincronizado" : status.lastSyncStatus === "error" ? "Erro" : "Pendente"}
                          </span>
                        </div>
                      </div>
                      {status.lastSyncAt && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">Última sync:</span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(status.lastSyncAt).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Registros:</span>
                        <span className="text-gray-900 dark:text-white">{status.totalRecordsSynced.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant={isConnected ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => handleConnect(connector.id)}
                    >
                      {isConnected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Conectado
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Conectar
                        </>
                      )}
                    </Button>
                    {isConnected && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSync(connector.id)}
                        disabled={isSyncing}
                      >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

