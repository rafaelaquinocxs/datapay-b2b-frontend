import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
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
} from "lucide-react";

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
  const empresa = { id: 1, nome: "Empresa Demo" };
  const [gerando, setGerando] = useState(false);
  const [filtroFamilia, setFiltroFamilia] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

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

  const FAMILIAS = [
    { id: "segmentacao", nome: "Segmentação", cor: "bg-blue-100 text-blue-900" },
    { id: "propensao", nome: "Propensão", cor: "bg-purple-100 text-purple-900" },
    { id: "market_basket", nome: "Market Basket", cor: "bg-green-100 text-green-900" },
    { id: "uplift", nome: "Uplift", cor: "bg-orange-100 text-orange-900" },
  ];

  const ESTADOS = [
    { id: "novo", nome: "Novo", cor: "bg-gray-100 text-gray-900" },
    { id: "visualizado", nome: "Visualizado", cor: "bg-blue-100 text-blue-900" },
    { id: "aplicado", nome: "Aplicado", cor: "bg-green-100 text-green-900" },
    { id: "descartado", nome: "Descartado", cor: "bg-red-100 text-red-900" },
  ];

  const filteredInsights = (insightsHistoricos || []).filter((i: any) =>
    i.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    (i.resumo || i.descricao || "").toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Análise da IA</h1>
          <p className="text-gray-600 mt-1">
            Insights e recomendações geradas por IA para seu negócio
          </p>
        </div>
        <Button
          onClick={handleGerarInsights}
          disabled={gerando}
          className="bg-purple-600 hover:bg-purple-700"
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

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar insights..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {FAMILIAS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltroFamilia(filtroFamilia === f.id ? "" : f.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filtroFamilia === f.id
                  ? `${f.cor} ring-2 ring-offset-2 ring-purple-600`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de Insights */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : filteredInsights.length === 0 ? (
        <Card className="p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum insight encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Clique em "Gerar Novos Insights" para começar a análise
          </p>
          <Button
            onClick={handleGerarInsights}
            disabled={gerando}
            className="bg-purple-600 hover:bg-purple-700"
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
        <div className="grid gap-4">
          {filteredInsights.map((insight: any) => (
            <Card
              key={insight.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedInsight(insight);
                setShowDrawer(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`${
                        insight.priorityScore >= 80
                          ? "bg-red-100 text-red-900"
                          : insight.priorityScore >= 60
                          ? "bg-orange-100 text-orange-900"
                          : "bg-yellow-100 text-yellow-900"
                      }`}
                    >
                      Impacto {getImpactoLabel(insight.priorityScore)}
                    </Badge>
                    <Badge variant="outline">Esforço BAIXO</Badge>
                    <Badge variant="outline">
                      Confiança {insight.confianca || 0}%
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {insight.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {insight.resumo || insight.descricao}
                  </p>

                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>Potencial:</strong> R$ {(insight.potencialR$ || 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Alvo:</strong> {(insight.tamanhoSegmento || 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>
                        <strong>Período:</strong> 30 dias
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span>
                        <strong>Tipo:</strong> {insight.familia || insight.categoria}
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
              </div>

              {/* Ações Rápidas */}
              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Marcar Aplicado
                </Button>
                <Button size="sm" variant="outline">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Criar Tarefa
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(insight.titulo);
                    toast.success("Copiado!");
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Drawer de Detalhe */}
      {showDrawer && selectedInsight && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-xl overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Detalhes</h2>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Título</p>
                  <p className="font-semibold text-gray-900">{selectedInsight.titulo}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Resumo</p>
                  <p className="text-gray-700">{selectedInsight.resumo || selectedInsight.descricao}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Impacto</p>
                    <p className={`font-bold ${getImpactoColor(selectedInsight.priorityScore)}`}>
                      {getImpactoLabel(selectedInsight.priorityScore)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Confiança</p>
                    <p className="font-bold text-blue-600">{selectedInsight.confianca || 0}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Aplicar Agora
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Plano de Ação
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
