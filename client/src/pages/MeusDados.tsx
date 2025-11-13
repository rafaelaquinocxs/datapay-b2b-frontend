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
  AlertTriangle,
  Info,
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

// Conectores com status de implementação
const CONNECTORS = [
  // ERP
  { id: "totvs", nome: "TOTVS", categoria: "ERP", logo: "🔧", status: "ready", descricao: "Manifesto, Materiais, Lançamentos" },
  { id: "sap", nome: "SAP", categoria: "ERP", logo: "📊", status: "ready", descricao: "Parceiros, Materiais, Ordens" },
  
  // CRM
  { id: "salesforce", nome: "Salesforce", categoria: "CRM", logo: "☁️", status: "ready", descricao: "Contas, Contatos, Oportunidades" },
  { id: "hubspot", nome: "HubSpot", categoria: "CRM", logo: "🎯", status: "ready", descricao: "Contatos, Deals, Campanhas" },
  
  // Analytics & BI
  { id: "google-analytics", nome: "Google Analytics", categoria: "Analytics", logo: "📈", status: "debugging", descricao: "Tráfego, Conversões, Usuários" },
  { id: "power-bi", nome: "Power BI", categoria: "BI", logo: "📊", status: "ready", descricao: "Grupos, Datasets, Relatórios" },
  { id: "tableau", nome: "Tableau", categoria: "BI", logo: "📊", status: "ready", descricao: "Workbooks, Dashboards, Dados" },
  
  // Pagamentos
  { id: "stripe", nome: "Stripe", categoria: "Pagamentos", logo: "💳", status: "ready", descricao: "Clientes, Transações, Faturas" },
  
  // Comunicação
  { id: "slack", nome: "Slack", categoria: "Comunicação", logo: "💬", status: "ready", descricao: "Usuários, Canais, Mensagens" },
  
  // Projeto
  { id: "jira", nome: "Jira", categoria: "Projeto", logo: "⚙️", status: "ready", descricao: "Issues, Sprints, Boards" },
  
  // Cloud
  { id: "aws", nome: "AWS", categoria: "Cloud", logo: "☁️", status: "ready", descricao: "EC2, S3, RDS, CloudWatch" },
  { id: "azure", nome: "Azure", categoria: "Cloud", logo: "☁️", status: "ready", descricao: "VMs, Storage, Databases" },
  
  // Tráfego Pago
  { id: "meta", nome: "Meta", categoria: "Tráfego Pago", logo: "📱", status: "ready", descricao: "Campanhas, Anúncios, Insights" },
  
  // E-commerce
  { id: "shopify", nome: "Shopify", categoria: "E-commerce", logo: "🛒", status: "ready", descricao: "Produtos, Pedidos, Clientes" },
  { id: "woocommerce", nome: "WooCommerce", categoria: "E-commerce", logo: "🛍️", status: "ready", descricao: "Produtos, Pedidos, Clientes" },
  { id: "magento", nome: "Magento", categoria: "E-commerce", logo: "📦", status: "ready", descricao: "Produtos, Pedidos, Clientes" },
  
  // Bancos de Dados
  { id: "postgresql", nome: "PostgreSQL", categoria: "Banco de Dados", logo: "🗄️", status: "ready", descricao: "Tabelas, Colunas, Dados" },
  { id: "mysql", nome: "MySQL", categoria: "Banco de Dados", logo: "🗄️", status: "ready", descricao: "Tabelas, Colunas, Dados" },
  
  // Arquivo
  { id: "csv", nome: "CSV/Excel", categoria: "Arquivo", logo: "📄", status: "ready", descricao: "Upload de arquivos" },
];

const CATEGORIAS = ["Todos", "ERP", "CRM", "Analytics", "BI", "Pagamentos", "Comunicação", "Projeto", "Cloud", "Tráfego Pago", "E-commerce", "Banco de Dados", "Arquivo"];

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
  const [connectedSources, setConnectedSources] = useState<string[]>(["salesforce"]);
  const [connectorStatuses, setConnectorStatuses] = useState<Map<string, ConnectorStatus>>(new Map());
  const [syncAlerts, setSyncAlerts] = useState<SyncAlert[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [stats, setStats] = useState({ totalConnectors: 0, connectedConnectors: 0, totalRecordsSynced: 0, lastSync: "" });
  
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
    const loadConnectors = async () => {
      try {
        await fetchConnectors();
      } catch (err) {
        console.error("Erro ao carregar conectores:", err);
      }
    };

    loadConnectors();
  }, []);

  // Atualizar stats
  useEffect(() => {
    setStats({
      totalConnectors: CONNECTORS.length,
      connectedConnectors: connectedSources.length,
      totalRecordsSynced: Array.from(connectorStatuses.values()).reduce((sum, s) => sum + s.totalRecordsSynced, 0),
      lastSync: new Date().toLocaleTimeString("pt-BR"),
    });
  }, [connectedSources, connectorStatuses]);

  // Filtrar conectores
  const filteredConnectors = CONNECTORS.filter((connector) => {
    const matchesSearch = connector.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || connector.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = (connector: { id: string; nome: string }) => {
    setSelectedConnector({ id: connector.id, name: connector.nome });
    setShowModal(true);
  };

  const handleDisconnect = (connectorId: string) => {
    setConnectedSources(connectedSources.filter(id => id !== connectorId));
    toast.success(`${connectorId} desconectado`);
  };

  const handleSync = async (connectorId: string) => {
    setIsSyncing(true);
    try {
      await syncConnector(connectorId);
      toast.success(`${connectorId} sincronizado com sucesso`);
    } catch (err) {
      toast.error(`Erro ao sincronizar ${connectorId}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-500/20 text-green-700 border-green-200">Pronto</Badge>;
      case "debugging":
        return <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-200">Debugando</Badge>;
      case "coming":
        return <Badge className="bg-gray-500/20 text-gray-700 border-gray-200">Em Breve</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Meus Dados</h1>
          <p className="text-slate-600 dark:text-slate-400">Conecte suas fontes de dados e sincronize informações</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Disponíveis</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalConnectors}</p>
              </div>
              <Database className="w-12 h-12 text-indigo-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Conectadas</p>
                <p className="text-3xl font-bold text-green-600">{stats.connectedConnectors}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Registros</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{(stats.totalRecordsSynced / 1000).toFixed(1)}k</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Última Sync</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{stats.lastSync}</p>
              </div>
              <Activity className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Alertas */}
        {syncAlerts.length > 0 && (
          <div className="mb-8 space-y-3">
            {syncAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className={`rounded-lg border p-4 flex items-start gap-3 ${
                alert.alertType === "error" ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800" :
                alert.alertType === "warning" ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800" :
                "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
              }`}>
                {alert.alertType === "error" && <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />}
                {alert.alertType === "warning" && <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />}
                {alert.alertType === "info" && <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Busca e Filtros */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar conectores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === "grid"
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === "list"
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIAS.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setSelectedCategory(categoria)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === categoria
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de Conectores */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConnectors.map((connector) => {
              const isConnected = connectedSources.includes(connector.id);
              return (
                <div
                  key={connector.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Header do Card */}
                  <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3),transparent)]"></div>
                    </div>
                    <span className="text-6xl">{connector.logo}</span>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{connector.nome}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{connector.descricao}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-0">{connector.categoria}</Badge>
                        {getStatusBadge(connector.status)}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <div className="flex items-center gap-2">
                        {isConnected ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Conectado</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Desconectado</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      {isConnected ? (
                        <>
                          <button
                            onClick={() => handleSync(connector.id)}
                            disabled={isSyncing}
                            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Sincronizar
                          </button>
                          <button
                            onClick={() => handleDisconnect(connector.id)}
                            className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                          >
                            Desconectar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnect(connector)}
                          className="w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Conectar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Lista de Conectores */
          <div className="space-y-3">
            {filteredConnectors.map((connector) => {
              const isConnected = connectedSources.includes(connector.id);
              return (
                <div
                  key={connector.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl">{connector.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{connector.nome}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{connector.descricao}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-0">{connector.categoria}</Badge>
                      {getStatusBadge(connector.status)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isConnected && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {isConnected ? (
                      <>
                        <button
                          onClick={() => handleSync(connector.id)}
                          disabled={isSyncing}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          Sincronizar
                        </button>
                        <button
                          onClick={() => handleDisconnect(connector.id)}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                        >
                          Desconectar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleConnect(connector)}
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal de Conexão */}
        {showModal && selectedConnector && (
          <ConnectorModal
            connector={selectedConnector}
            onClose={() => setShowModal(false)}
            onConnect={(credentials) => {
              setConnectedSources([...connectedSources, selectedConnector.id]);
              setShowModal(false);
              toast.success(`${selectedConnector.name} conectado com sucesso!`);
            }}
          />
        )}

        {/* Histórico de Sincronização */}
        {showHistory && (
          <SyncHistoryPanel
            connectorId={showHistory}
            onClose={() => setShowHistory(null)}
          />
        )}
      </div>
    </PageTransition>
  );
}

