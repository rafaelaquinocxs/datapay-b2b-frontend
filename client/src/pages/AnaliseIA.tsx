import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import {
  Sparkles,
  Loader2,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle2,
  Zap,
  Filter,
  Search,
  ChevronRight,
  DollarSign,
  Users,
  Calendar,
  AlertCircle,
  X,
  Copy,
  FileText,
  Bookmark,
  Download,
  Send,
  ArrowUpRight,
  Brain,
  Flame,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Insight {
  id: number;
  familia?: string;
  area?: string;
  titulo: string;
  resumo?: string;
  priorityScore?: number;
  estado?: string;
  confianca?: number;
  potencialR$?: number;
  tamanhoSegmento?: number;
  geradoEm?: string;
  descricao?: string;
  categoria?: string | null;
  impactoEstimado?: string | null;
  acoesSugeridas?: string[] | null;
  createdAt?: Date | null;
}

export default function AnaliseIA() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const empresa = { id: usuario?.id || 1, nome: usuario?.nome || "Empresa Demo" };
  const [gerando, setGerando] = useState(false);
  const [filtroFamilia, setFiltroFamilia] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [modalAberto, setModalAberto] = useState<string | null>(null);
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [descricaoTarefa, setDescricaoTarefa] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const {
    data: insightsHistoricos,
    refetch,
    isLoading,
  } = trpc.analiseIA.listarInsights.useQuery(
    { empresaId: empresa?.id || 0 },
    { enabled: !!empresa?.id }
  );

  const gerarInsights = trpc.analiseIA.gerarInsights.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.insights.length} insights gerados com sucesso!`);
      setGerando(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao gerar insights");
      setGerando(false);
    },
  });

  const handleGerarInsights = async () => {
    if (!empresa?.id) {
      toast.error("Empresa não identificada");
      return;
    }
    setGerando(true);
    await gerarInsights.mutateAsync({ empresaId: empresa.id });
  };

  const getImpactoColor = (score?: number) => {
    if (!score) return "text-gray-600";
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-orange-600";
    return "text-yellow-600";
  };

  const getImpactoLabel = (score?: number) => {
    if (!score) return "Médio";
    if (score >= 80) return "ALTO";
    if (score >= 60) return "MÉDIO";
    return "BAIXO";
  };

  const getImpactoBg = (score?: number) => {
    if (!score) return "bg-gray-100 text-gray-700";
    if (score >= 80) return "bg-red-100 text-red-700";
    if (score >= 60) return "bg-orange-100 text-orange-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const FAMILIAS = [
    { id: "segmentacao", nome: "Segmentação", icon: "👥" },
    { id: "propensao", nome: "Propensão", icon: "📈" },
    { id: "market_basket", nome: "Market Basket", icon: "🛒" },
    { id: "uplift", nome: "Uplift", icon: "⚡" },
  ];

  const filteredInsights = (insightsHistoricos || []).filter((i: any) =>
    i.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    (i.resumo || i.descricao || "").toLowerCase().includes(busca.toLowerCase())
  );

  const handleCriarTarefa = () => {
    if (!nomeTarefa || !dataVencimento) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Tarefa criada com sucesso!");
    setModalAberto(null);
    setNomeTarefa("");
    setDescricaoTarefa("");
    setDataVencimento("");
    setResponsavel("");
  };

  const handleExportar = () => {
    if (!selectedInsight) return;
    const conteudo = `
INSIGHT: ${selectedInsight.titulo}
RESUMO: ${selectedInsight.resumo || selectedInsight.descricao}
IMPACTO: ${getImpactoLabel(selectedInsight.priorityScore)}
CONFIANÇA: ${selectedInsight.confianca}%
POTENCIAL: R$ ${selectedInsight.potencialR$}
CLIENTES: ${selectedInsight.tamanhoSegmento}
    `.trim();
    
    const elemento = document.createElement("a");
    elemento.href = "data:text/plain;charset=utf-8," + encodeURIComponent(conteudo);
    elemento.download = `insight-${selectedInsight.id}.txt`;
    elemento.click();
    toast.success("Arquivo exportado!");
  };

  const handleCopiar = () => {
    if (!selectedInsight) return;
    navigator.clipboard.writeText(selectedInsight.titulo);
    toast.success("Título copiado para a área de transferência!");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Premium */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Análise de IA</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Insights inteligentes para impulsionar seu negócio</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleGerarInsights}
                disabled={gerando}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
              >
                {gerando ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Gerar Novos Insights
                  </>
                )}
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Total de Insights</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredInsights.length}</p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-500 opacity-20" />
                </div>
              </Card>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Alto Impacto</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{filteredInsights.filter((i: any) => i.priorityScore >= 80).length}</p>
                  </div>
                  <Flame className="w-8 h-8 text-red-500 opacity-20" />
                </div>
              </Card>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Potencial Total</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">R$ {(filteredInsights.reduce((sum: number, i: any) => sum + (i.potencialR$ || 0), 0) / 1000).toFixed(0)}k</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </Card>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Confiança Média</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{filteredInsights.length > 0 ? Math.round(filteredInsights.reduce((sum: number, i: any) => sum + (i.confianca || 0), 0) / filteredInsights.length) : 0}%</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </Card>
            </div>
          </div>

          {/* Search e Filtros */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar insights por título ou descrição..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Filtros por Família */}
            <div className="flex gap-2 flex-wrap">
              {FAMILIAS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFiltroFamilia(filtroFamilia === f.id ? "" : f.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                    filtroFamilia === f.id
                      ? "bg-purple-500 text-white shadow-lg"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-purple-500"
                  }`}
                >
                  <span>{f.icon}</span>
                  {f.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Insights Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-purple-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Carregando insights...</p>
            </div>
          ) : filteredInsights.length === 0 ? (
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Nenhum insight encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Clique em "Gerar Novos Insights" para começar a análise
              </p>
              <Button
                onClick={handleGerarInsights}
                disabled={gerando}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {gerando ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Gerar Novos Insights
                  </>
                )}
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredInsights.map((insight: any) => (
                <Card
                  key={insight.id}
                  className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => {
                    setSelectedInsight(insight);
                    setShowDrawer(true);
                  }}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={`${getImpactoBg(insight.priorityScore)} font-semibold`}>
                            Impacto {getImpactoLabel(insight.priorityScore)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Confiança {insight.confianca || 0}%
                          </Badge>
                          {insight.familia && (
                            <Badge variant="outline" className="text-xs">
                              {insight.familia}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
                          {insight.titulo}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                          {insight.resumo || insight.descricao}
                        </p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Métricas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Potencial</p>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">R$ {(insight.potencialR$ || 0).toLocaleString("pt-BR")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Alvo</p>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">{(insight.tamanhoSegmento || 0).toLocaleString("pt-BR")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Período</p>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">30 dias</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Tipo</p>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">{insight.familia || insight.categoria}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ações Rápidas */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInsight(insight);
                          setModalAberto("tarefa");
                        }}
                        className="text-xs"
                      >
                        <Bookmark className="w-4 h-4 mr-1" />
                        Tarefa
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInsight(insight);
                          handleCopiar();
                        }}
                        className="text-xs"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInsight(insight);
                          handleExportar();
                        }}
                        className="text-xs"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Exportar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInsight(insight);
                          setModalAberto("acao");
                        }}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Ação
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Drawer de Detalhe */}
          {showDrawer && selectedInsight && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:items-center justify-end">
              <div className="bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto w-full md:w-96 md:rounded-lg max-h-screen md:max-h-[90vh]">
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detalhes do Insight</h2>
                    <button
                      onClick={() => setShowDrawer(false)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Título</p>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">{selectedInsight.titulo}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Resumo</p>
                      <p className="text-gray-700 dark:text-gray-300">{selectedInsight.resumo || selectedInsight.descricao}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Impacto</p>
                        <p className={`font-bold text-lg mt-1 ${getImpactoColor(selectedInsight.priorityScore)}`}>
                          {getImpactoLabel(selectedInsight.priorityScore)}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Confiança</p>
                        <p className="font-bold text-lg mt-1 text-blue-600">{selectedInsight.confianca || 0}%</p>
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Potencial</p>
                        <p className="font-bold text-lg mt-1 text-green-600">R$ {(selectedInsight.potencialR$ || 0).toLocaleString("pt-BR")}</p>
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Alvo</p>
                        <p className="font-bold text-lg mt-1 text-purple-600">{(selectedInsight.tamanhoSegmento || 0).toLocaleString("pt-BR")}</p>
                      </div>
                    </div>

                    {selectedInsight.acoesSugeridas && selectedInsight.acoesSugeridas.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Ações Sugeridas</p>
                        <ul className="space-y-2">
                          {selectedInsight.acoesSugeridas.map((acao, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              {acao}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Button
                      onClick={() => {
                        setSelectedInsight(selectedInsight);
                        setModalAberto("tarefa");
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Criar Tarefa
                    </Button>
                    <Button
                      onClick={() => setShowDrawer(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

