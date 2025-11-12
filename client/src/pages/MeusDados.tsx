import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Conectores de grandes empresas com logos e cores
const CONNECTORS = [
  { id: "salesforce", nome: "Salesforce", categoria: "CRM", cor: "from-blue-500 to-blue-600", icon: "☁️", descricao: "Gerenciamento de relacionamento com clientes" },
  { id: "sap", nome: "SAP", categoria: "ERP", cor: "from-red-500 to-red-600", icon: "🏢", descricao: "Planejamento de recursos empresariais" },
  { id: "google-analytics", nome: "Google Analytics", categoria: "Analytics", cor: "from-orange-500 to-orange-600", icon: "📊", descricao: "Análise de tráfego e comportamento web" },
  { id: "power-bi", nome: "Power BI", categoria: "BI", cor: "from-yellow-500 to-yellow-600", icon: "📈", descricao: "Inteligência de negócios e visualização" },
  { id: "hubspot", nome: "HubSpot", categoria: "Marketing", cor: "from-orange-400 to-orange-500", icon: "🎯", descricao: "Automação de marketing e vendas" },
  { id: "stripe", nome: "Stripe", categoria: "Pagamentos", cor: "from-purple-500 to-purple-600", icon: "💳", descricao: "Processamento de pagamentos online" },
  { id: "slack", nome: "Slack", categoria: "Comunicação", cor: "from-pink-500 to-pink-600", icon: "💬", descricao: "Comunicação em tempo real" },
  { id: "jira", nome: "Jira", categoria: "Projeto", cor: "from-blue-400 to-blue-500", icon: "✓", descricao: "Gerenciamento de projetos ágeis" },
  { id: "tableau", nome: "Tableau", categoria: "BI", cor: "from-green-500 to-green-600", icon: "📊", descricao: "Visualização de dados avançada" },
  { id: "aws", nome: "AWS", categoria: "Cloud", cor: "from-orange-600 to-orange-700", icon: "☁️", descricao: "Serviços em nuvem Amazon" },
  { id: "azure", nome: "Azure", categoria: "Cloud", cor: "from-blue-600 to-blue-700", icon: "☁️", descricao: "Serviços em nuvem Microsoft" },
  { id: "csv", nome: "CSV/Excel", categoria: "Arquivo", cor: "from-green-400 to-green-500", icon: "📄", descricao: "Upload de arquivos CSV ou Excel" },
];

const CATEGORIAS = ["Todos", "CRM", "ERP", "Analytics", "BI", "Marketing", "Pagamentos", "Comunicação", "Projeto", "Cloud", "Arquivo"];

export default function MeusDados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [connectedSources, setConnectedSources] = useState<string[]>(["salesforce", "google-analytics"]);

  const filteredConnectors = CONNECTORS.filter((connector) => {
    const matchSearch = connector.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "Todos" || connector.categoria === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleConnect = (connectorId: string) => {
    if (connectedSources.includes(connectorId)) {
      setConnectedSources(connectedSources.filter(id => id !== connectorId));
      toast.success("Desconectado com sucesso!");
    } else {
      setConnectedSources([...connectedSources, connectorId]);
      toast.success("Conectado com sucesso!");
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Última Sincronização</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Agora</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar conectores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-purple-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Conectores Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnectors.map((connector) => {
                const isConnected = connectedSources.includes(connector.id);
                return (
                  <Card
                    key={connector.id}
                    className={`overflow-hidden transition-all hover:shadow-xl ${
                      isConnected
                        ? "border-green-500 bg-white dark:bg-gray-900"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-purple-500"
                    }`}
                  >
                    {/* Gradient Header */}
                    <div className={`h-24 bg-gradient-to-r ${connector.cor} relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 text-4xl">{connector.icon}</div>
                      </div>
                      {isConnected && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{connector.nome}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{connector.descricao}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {connector.categoria}
                        </Badge>
                        {isConnected && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                            Conectado
                          </Badge>
                        )}
                      </div>

                      <Button
                        onClick={() => handleConnect(connector.id)}
                        className={`w-full transition-all ${
                          isConnected
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        }`}
                      >
                        {isConnected ? "Desconectar" : "Conectar"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConnectors.map((connector) => {
                const isConnected = connectedSources.includes(connector.id);
                return (
                  <Card
                    key={connector.id}
                    className={`p-6 flex items-center justify-between transition-all ${
                      isConnected
                        ? "border-green-500 bg-white dark:bg-gray-900"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-purple-500"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${connector.cor} flex items-center justify-center text-2xl`}>
                        {connector.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{connector.nome}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{connector.descricao}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {connector.categoria}
                          </Badge>
                          {isConnected && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                              Conectado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleConnect(connector.id)}
                      className={`transition-all ${
                        isConnected
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      }`}
                    >
                      {isConnected ? "Desconectar" : "Conectar"}
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredConnectors.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum conector encontrado</h3>
              <p className="text-gray-600 dark:text-gray-400">Tente ajustar sua busca ou filtros</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

