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
import { ConnectorModal } from "@/components/ConnectorModal";
import { SyncHistoryPanel } from "@/components/SyncHistoryPanel";
import { useConnectorManager } from "@/hooks/useConnectorManager";

// Conectores de grandes empresas com logos de marca
const CONNECTORS = [
  { id: "salesforce", nome: "Salesforce", categoria: "CRM", logo: "SF", descricao: "Gerenciamento de relacionamento com clientes" },
  { id: "sap", nome: "SAP", categoria: "ERP", logo: "SAP", descricao: "Planejamento de recursos empresariais" },
  { id: "totvs", nome: "TOTVS", categoria: "ERP", logo: "TOT", descricao: "ERP Protheus" },
  { id: "google-analytics", nome: "Google Analytics", categoria: "Analytics", logo: "GA", descricao: "Análise de tráfego e comportamento web" },
  { id: "power-bi", nome: "Power BI", categoria: "BI", logo: "PBI", descricao: "Inteligência de negócios e visualização" },
  { id: "hubspot", nome: "HubSpot", categoria: "CRM", logo: "HS", descricao: "Automação de marketing e vendas" },
  { id: "stripe", nome: "Stripe", categoria: "Pagamentos", logo: "STR", descricao: "Processamento de pagamentos online" },
  { id: "slack", nome: "Slack", categoria: "Comunicação", logo: "SLK", descricao: "Comunicação em tempo real" },
  { id: "jira", nome: "Jira", categoria: "Projeto", logo: "JRA", descricao: "Gerenciamento de projetos ágeis" },
  { id: "tableau", nome: "Tableau", categoria: "BI", logo: "TBL", descricao: "Visualização de dados avançada" },
  { id: "aws", nome: "AWS", categoria: "Cloud", logo: "AWS", descricao: "Serviços em nuvem Amazon" },
  { id: "azure", nome: "Azure", categoria: "Cloud", logo: "AZR", descricao: "Serviços em nuvem Microsoft" },
  { id: "csv", nome: "CSV/Excel", categoria: "Arquivo", logo: "CSV", descricao: "Upload de arquivos CSV ou Excel" },
];

const CATEGORIAS = ["Todos", "CRM", "ERP", "Analytics", "BI", "Pagamentos", "Comunicação", "Projeto", "Cloud", "Arquivo"];

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
  
  // Modal de conexão
  const [selectedConnector, setSelectedConnector] = useState<{ id: string; name: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState<string | null>(null);

  const {
    connectors,
    syncLogs,
    loading,
    error,
    fetchConnectors,
    connectConnector,
    syncConnector,
    fetchSyncLogs,
  } = useConnectorManager();

  // Carregar status dos conectores
  useEffect(() => {
    fetchConnectors();
    fetchSyncLogs();
  }, []);

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

    loadConnectorStatuses();
    loadAlerts();

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      loadConnectorStatuses();
      loadAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Atualizar stats
  useEffect(() => {
    const connectedCount = connectedSources.length;
    const totalRecords = Array.from(connectorStatuses.values()).reduce(
      (sum, status) => sum + status.totalRecordsSynced,
      0
    );

    setStats({
      totalConnectors: CONNECTORS.length,
      connectedConnectors: connectedCount,
      totalRecordsSynced: totalRecords,
    });
  }, [connectedSources, connectorStatuses]);

  // Filtrar conectores
  const filteredConnectors = CONNECTORS.filter((connector) => {
    const matchesSearch = connector.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || connector.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Conectar conector
  const handleConnectConnector = async (credentials: Record<string, string>) => {
    if (!selectedConnector) return;

    try {
      await connectConnector(selectedConnector.id, credentials);
      setConnectedSources([...connectedSources, selectedConnector.id]);
      toast.success(`${selectedConnector.name} conectado com sucesso!`);
      setShowModal(false);
      setSelectedConnector(null);
    } catch (err) {
      toast.error(`Erro ao conectar ${selectedConnector.name}`);
    }
  };

  // Desconectar conector
  const handleDisconnectConnector = (connectorId: string) => {
    setConnectedSources(connectedSources.filter((id) => id !== connectorId));
    toast.success("Conector desconectado");
  };

  // Sincronizar conector
  const handleSyncConnector = async (connectorId: string) => {
    try {
      setIsSyncing(true);
      await syncConnector(connectorId);
      toast.success("Sincronização iniciada");
    } catch (err) {
      toast.error("Erro ao sincronizar");
    } finally {
      setIsSyncing(false);
    }
  };

  // Obter status do conector
  const getConnectorStatus = (connectorId: string) => {
    return connectorStatuses.get(connectorId);
  };

  // Renderizar card de conector
  const renderConnectorCard = (connector: any) => {
    const isConnected = connectedSources.includes(connector.id);
    const status = getConnectorStatus(connector.id);

    return (
      <div
        key={connector.id}
        className={`p-4 rounded-lg border-2 transition-all ${
          isConnected
            ? "border-indigo-200 bg-indigo-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {connector.logo}
          </div>
          {isConnected && <CheckCircle2 className="w-5 h-5 text-green-600" />}
        </div>

        {/* Nome e descrição */}
        <h3 className="font-semibold text-sm mb-1">{connector.nome}</h3>
        <p className="text-xs text-muted-foreground mb-3">{connector.descricao}</p>

        {/* Status */}
        {isConnected && status && (
          <div className="mb-3 p-2 bg-white rounded text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última sincronização:</span>
              <span className="font-medium">
                {status.lastSyncAt
                  ? new Date(status.lastSyncAt).toLocaleDateString("pt-BR")
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registros:</span>
              <span className="font-medium">{status.totalRecordsSynced}</span>
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="flex gap-2">
          {!isConnected ? (
            <Button
              size="sm"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {
                setSelectedConnector({ id: connector.id, name: connector.nome });
                setShowModal(true);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Conectar
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => handleSyncConnector(connector.id)}
                disabled={isSyncing}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Sincronizar
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowHistory(connector.id)}>
                    <Activity className="w-4 h-4 mr-2" />
                    Ver Histórico
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDisconnectConnector(connector.id)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Desconectar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Meus Dados</h1>
            <p className="text-slate-600">Gerencie suas integrações e sincronizações de dados</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Conectores Disponíveis</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalConnectors}</p>
                </div>
                <Database className="w-8 h-8 text-indigo-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Conectados</p>
                  <p className="text-2xl font-bold text-green-600">{stats.connectedConnectors}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Registros Sincronizados</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalRecordsSynced.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Alertas</p>
                  <p className="text-2xl font-bold text-orange-600">{syncAlerts.filter((a) => !a.isResolved).length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* ALERTAS */}
          {syncAlerts.filter((a) => !a.isResolved).length > 0 && (
            <div className="mb-6 space-y-2">
              {syncAlerts
                .filter((a) => !a.isResolved)
                .slice(0, 3)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-orange-900">{alert.title}</p>
                      <p className="text-xs text-orange-800">{alert.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* BUSCA E FILTROS */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar conectores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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

            {/* CATEGORIAS */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {CATEGORIAS.map((categoria) => (
                <Button
                  key={categoria}
                  variant={selectedCategory === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(categoria)}
                  className="whitespace-nowrap"
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>

          {/* CONECTORES */}
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredConnectors.map((connector) => renderConnectorCard(connector))}
          </div>

          {/* HISTÓRICO DE SINCRONIZAÇÃO */}
          {showHistory && (
            <div className="mt-8">
              <SyncHistoryPanel
                connectorId={showHistory}
                connectorName={CONNECTORS.find((c) => c.id === showHistory)?.nome || ""}
                logs={syncLogs}
                onRetry={handleSyncConnector}
              />
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE CONEXÃO */}
      {selectedConnector && (
        <ConnectorModal
          isOpen={showModal}
          connectorId={selectedConnector.id}
          connectorName={selectedConnector.name}
          onClose={() => {
            setShowModal(false);
            setSelectedConnector(null);
          }}
          onConnect={handleConnectConnector}
        />
      )}
    </PageTransition>
  );
}

