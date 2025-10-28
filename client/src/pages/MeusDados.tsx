import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Loader,
  Database,
  RefreshCw,
  Eye,
  Clock,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit,
  MoreVertical,
  Search,
  X,
} from "lucide-react";

interface DataSource {
  id: number;
  nome: string;
  conector: string;
  status: "conectado" | "sincronizando" | "erro" | "desconectado";
  totalRegistros: number;
  ultimaSincronizacao?: Date;
  proximaSincronizacao?: Date;
}

const CONNECTOR_ICONS: Record<string, string> = {
  csv: "📄",
  excel: "📊",
  salesforce: "☁️",
  sap: "🏢",
  vtex: "🛒",
  postgresql: "🗄️",
  mysql: "🗄️",
  api: "🔌",
};

export default function MeusDados() {
  const empresaId = 1;
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCategoria, setFilterCategoria] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sources } = trpc.dataSources.getAll.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  useEffect(() => {
    if (sources) {
      setDataSources(sources as any);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [sources]);

  const syncMutation = trpc.dataSources.createSyncLog.useMutation({
    onSuccess: () => {
      toast.success("Sincronização iniciada!");
    },
    onError: () => {
      toast.error("Erro ao sincronizar");
    },
  });

  const handleSync = async (source: DataSource) => {
    await syncMutation.mutateAsync({
      dataSourceId: source.id,
      status: "sincronizando",
      registrosLidos: 0,
      registrosGravados: 0,
      erros: 0,
      duracao: 0,
    });
  };

  const handleDeleteSource = async (sourceId: number, sourceName: string) => {
    if (confirm(`Tem certeza que deseja apagar "${sourceName}"?`)) {
      setDataSources(dataSources.filter(s => s.id !== sourceId));
      setSelectedSource(null);
      toast.success("Fonte de dados removida com sucesso!");
    }
  };

  const filteredSources = dataSources.filter((source) => {
    const matchesSearch = source.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategoria === "todos" || source.conector === filterCategoria;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "conectado":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "sincronizando":
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      case "erro":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      conectado: "Sincronizado",
      sincronizando: "Sincronizando",
      erro: "Erro",
      desconectado: "Desconectado",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "conectado":
        return "bg-green-50 border-green-200";
      case "sincronizando":
        return "bg-blue-50 border-blue-200";
      case "erro":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Dados</h1>
          <p className="text-gray-600 mt-1">
            Conecte e gerencie suas fontes de dados
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Fonte
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar fonte..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          {["todos", "csv", "salesforce", "sap", "api"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategoria(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterCategoria === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "todos" ? "Todos" : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-96">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : filteredSources.length === 0 ? (
        <Card className="p-12 text-center">
          <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma fonte conectada
          </h3>
          <p className="text-gray-600 mb-6">
            Conecte sua primeira fonte de dados em 2-3 cliques
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Conectar Primeira Fonte
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <Card
              key={source.id}
              className={`p-5 cursor-pointer hover:shadow-lg transition-all border-l-4 ${getStatusColor(
                source.status
              )}`}
              onClick={() => setSelectedSource(source)}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {CONNECTOR_ICONS[source.conector] || "📊"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {source.nome}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {source.conector.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSource(source);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Previsualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSource(source);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSource(source.id, source.nome);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Apagar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {getStatusIcon(source.status)}
                  <span className="text-sm font-medium text-gray-700">
                    {getStatusLabel(source.status)}
                  </span>
                </div>

                {/* Registros */}
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600">Registros</p>
                  <p className="text-lg font-bold text-gray-900">
                    {source.totalRegistros.toLocaleString("pt-BR")}
                  </p>
                </div>

                {/* Última Sincronização */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    Última sync:{" "}
                    {source.ultimaSincronizacao
                      ? new Date(source.ultimaSincronizacao).toLocaleDateString(
                          "pt-BR"
                        )
                      : "Nunca"}
                  </span>
                </div>

                {/* Ações */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSync(source);
                    }}
                    disabled={syncMutation.isPending}
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Sincronizar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSource(source);
                    }}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Side Panel */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSelectedSource(null)} />
      )}

      {selectedSource && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedSource.nome}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedSource.conector.toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setSelectedSource(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Card */}
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex items-center gap-3 mb-4">
                {getStatusIcon(selectedSource.status)}
                <span className="font-semibold text-gray-900">
                  {getStatusLabel(selectedSource.status)}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registros</span>
                  <span className="font-semibold">
                    {selectedSource.totalRegistros.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Última sync</span>
                  <span className="font-semibold">
                    {selectedSource.ultimaSincronizacao
                      ? new Date(
                          selectedSource.ultimaSincronizacao
                        ).toLocaleDateString("pt-BR")
                      : "Nunca"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="space-y-4">
              <div className="border-b">
                <div className="flex gap-4">
                  <button className="pb-2 px-2 border-b-2 border-purple-600 text-purple-600 font-medium">
                    Visão Geral
                  </button>
                  <button className="pb-2 px-2 text-gray-600 hover:text-gray-900">
                    Logs
                  </button>
                </div>
              </div>

              {/* Qualidade */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Qualidade de Dados
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Score</span>
                    <Badge>82%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="space-y-2 pt-4 border-t">
                <Button
                  onClick={() => handleSync(selectedSource)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={syncMutation.isPending}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sincronizar Agora
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" className="w-full text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Fonte - 4 Passos */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl p-8 max-h-96 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Adicionar Fonte de Dados
                </h2>
                <p className="text-gray-600">
                  Conecte uma nova fonte em 4 passos simples
                </p>
              </div>

              {/* Conectores */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Escolha um Conector</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "csv", icon: "📄", nome: "CSV" },
                    { id: "excel", icon: "📊", nome: "Excel" },
                    { id: "salesforce", icon: "☁️", nome: "Salesforce" },
                    { id: "sap", icon: "🏢", nome: "SAP" },
                    { id: "postgresql", icon: "🗄️", nome: "PostgreSQL" },
                    { id: "mysql", icon: "🗄️", nome: "MySQL" },
                    { id: "vtex", icon: "🛒", nome: "VTEX" },
                    { id: "api", icon: "🔌", nome: "API" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all text-center"
                    >
                      <div className="text-2xl mb-1">{c.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{c.nome}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>Dica:</strong> Após selecionar o conector, você configurará autenticação, mapeamento de campos e agendamento de sincronização.
                </p>
              </Card>

              {/* Botões */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    setShowModal(false);
                    // Redirecionar para página de adicionar fonte
                    window.location.href = "/adicionar-fonte";
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Continuar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
