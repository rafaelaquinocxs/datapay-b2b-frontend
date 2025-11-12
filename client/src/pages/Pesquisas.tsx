import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Zap,
  TrendingUp,
  Users,
  BarChart3,
  MessageSquare,
  Gauge,
  Smile,
  Briefcase,
  AlertCircle,
  ChevronRight,
  Loader2,
  Eye,
  Play,
  Pause,
  Copy,
  Trash2,
  Settings,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Survey {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  categoria: string;
  segmento: string;
  estado: string;
  respostasColetadas: number;
  taxaResposta: number;
  recompensaAtiva: boolean;
  recompensaValor?: number;
  dataCriacao: string;
}

export default function Pesquisas() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [busca, setBusca] = useState<string>("");

  const pesquisas: Survey[] = [
    {
      id: 1,
      titulo: "NPS - Net Promoter Score",
      descricao: "Medir lealdade e satisfação geral dos clientes",
      tipo: "nps",
      categoria: "clientes",
      segmento: "vip",
      estado: "ativo",
      respostasColetadas: 1250,
      taxaResposta: 68,
      recompensaAtiva: true,
      recompensaValor: 10,
      dataCriacao: "2024-11-01",
    },
    {
      id: 2,
      titulo: "Satisfação com Atendimento",
      descricao: "Avaliar qualidade e eficiência do suporte",
      tipo: "satisfacao",
      categoria: "clientes",
      segmento: "todos",
      estado: "ativo",
      respostasColetadas: 890,
      taxaResposta: 72,
      recompensaAtiva: false,
      dataCriacao: "2024-11-05",
    },
    {
      id: 3,
      titulo: "Clima Organizacional",
      descricao: "Avaliação de satisfação dos funcionários",
      tipo: "clima",
      categoria: "funcionarios",
      segmento: "todos",
      estado: "ativo",
      respostasColetadas: 245,
      taxaResposta: 85,
      recompensaAtiva: true,
      recompensaValor: 25,
      dataCriacao: "2024-11-08",
    },
    {
      id: 4,
      titulo: "Feedback de Produto",
      descricao: "Coletar feedback sobre novo produto lançado",
      tipo: "feedback",
      categoria: "produto",
      segmento: "beta",
      estado: "rascunho",
      respostasColetadas: 0,
      taxaResposta: 0,
      recompensaAtiva: false,
      dataCriacao: "2024-11-10",
    },
    {
      id: 5,
      titulo: "Pesquisa de Mercado - Q4",
      descricao: "Análise de tendências e preferências do mercado",
      tipo: "mercado",
      categoria: "mercado",
      segmento: "todos",
      estado: "pausado",
      respostasColetadas: 3420,
      taxaResposta: 54,
      recompensaAtiva: true,
      recompensaValor: 15,
      dataCriacao: "2024-10-15",
    },
  ];

  const categorias = [...new Set(pesquisas.map((p) => p.categoria))];
  const estados = [...new Set(pesquisas.map((p) => p.estado))];

  const pesquisasFiltradas = pesquisas.filter((p) => {
    const matchBusca = p.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = !filtroCategoria || p.categoria === filtroCategoria;
    const matchEstado = !filtroEstado || p.estado === filtroEstado;
    return matchBusca && matchCategoria && matchEstado;
  });

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, React.ReactNode> = {
      nps: <Gauge className="w-5 h-5" />,
      satisfacao: <Smile className="w-5 h-5" />,
      clima: <Users className="w-5 h-5" />,
      feedback: <MessageSquare className="w-5 h-5" />,
      mercado: <Briefcase className="w-5 h-5" />,
    };
    return icons[tipo] || <BarChart3 className="w-5 h-5" />;
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      nps: "NPS",
      satisfacao: "Satisfação",
      clima: "Clima",
      feedback: "Feedback",
      mercado: "Mercado",
    };
    return labels[tipo] || tipo;
  };

  const getEstadoColor = (estado: string) => {
    const cores: Record<string, string> = {
      ativo: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      rascunho: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      pausado: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      finalizado: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return cores[estado] || "";
  };

  const getEstadoLabel = (estado: string) => {
    const labels: Record<string, string> = {
      ativo: "Ativo",
      rascunho: "Rascunho",
      pausado: "Pausado",
      finalizado: "Finalizado",
    };
    return labels[estado] || estado;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pesquisas</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gerencie e acompanhe todas as suas pesquisas e coletas de dados
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nova Pesquisa
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de Pesquisas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {pesquisas.length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ativas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {pesquisas.filter((p) => p.estado === "ativo").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Respostas Coletadas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {(pesquisas.reduce((sum, p) => sum + p.respostasColetadas, 0) / 1000).toFixed(1)}k
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Taxa Média</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {Math.round(
                      pesquisas.filter((p) => p.estado === "ativo").reduce((sum, p) => sum + p.taxaResposta, 0) /
                        pesquisas.filter((p) => p.estado === "ativo").length
                    )}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Buscas e Filtros */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar pesquisas..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Categoria:</span>
              </div>
              <Button
                onClick={() => setFiltroCategoria("")}
                variant={filtroCategoria === "" ? "default" : "outline"}
                className={filtroCategoria === "" ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white" : "border-gray-300 dark:border-gray-700"}
              >
                Todas
              </Button>
              {categorias.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  variant={filtroCategoria === cat ? "default" : "outline"}
                  className={filtroCategoria === cat ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white" : "border-gray-300 dark:border-gray-700"}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Estado:</span>
              </div>
              <Button
                onClick={() => setFiltroEstado("")}
                variant={filtroEstado === "" ? "default" : "outline"}
                className={filtroEstado === "" ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white" : "border-gray-300 dark:border-gray-700"}
              >
                Todos
              </Button>
              {estados.map((estado) => (
                <Button
                  key={estado}
                  onClick={() => setFiltroEstado(estado)}
                  variant={filtroEstado === estado ? "default" : "outline"}
                  className={filtroEstado === estado ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white" : "border-gray-300 dark:border-gray-700"}
                >
                  {getEstadoLabel(estado)}
                </Button>
              ))}
            </div>
          </div>

          {/* Lista de Pesquisas */}
          <div className="space-y-4">
            {pesquisasFiltradas.length === 0 ? (
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
                <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Nenhuma pesquisa encontrada
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Ajuste seus filtros ou crie uma nova pesquisa
                </p>
              </Card>
            ) : (
              pesquisasFiltradas.map((pesquisa) => (
                <Card
                  key={pesquisa.id}
                  className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {getTipoIcon(pesquisa.tipo)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {pesquisa.titulo}
                            </h3>
                            <Badge className={getEstadoColor(pesquisa.estado)}>
                              {getEstadoLabel(pesquisa.estado)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {pesquisa.descricao}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Métricas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200 dark:border-gray-800">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                          Respostas
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                          {pesquisa.respostasColetadas}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                          Taxa
                        </p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                          {pesquisa.taxaResposta}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                          Tipo
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">
                          {getTipoLabel(pesquisa.tipo)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                          Criada em
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">
                          {pesquisa.dataCriacao}
                        </p>
                      </div>
                    </div>

                    {/* Recompensa */}
                    {pesquisa.recompensaAtiva && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-700 dark:text-amber-300">
                          Recompensa ativa: R$ {pesquisa.recompensaValor} por resposta
                        </span>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex gap-2 pt-4">
                      {pesquisa.estado === "ativo" ? (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-700"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Resultados
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-700"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </Button>
                        </>
                      ) : pesquisa.estado === "rascunho" ? (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-700"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Disparar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-700"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Resultados
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-700"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

