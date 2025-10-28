import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  Plus,
  Sliders,
  Lightbulb,
} from "lucide-react";

interface Acao {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  potencial: number;
  roi: number;
  timeline: string;
  status: string;
  passos: string[];
  benchmark?: number;
  kpi?: string;
}

export default function AcoesInteligentes() {
  const [showSimulador, setShowSimulador] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [sliders, setSliders] = useState({
    clientes: 5000,
    ticketMedio: 150,
    taxaResposta: 60,
  });

  const acoes: Acao[] = [
    {
      id: 1,
      titulo: "Campanha de Retenção VIP",
      descricao: "Segmentar clientes VIP e oferecer programa de fidelidade",
      categoria: "Retenção",
      potencial: 125000,
      roi: 245,
      timeline: "Curto prazo (1-3 meses)",
      status: "recomendado",
      passos: [
        "Definir critérios de cliente VIP",
        "Criar programa de fidelidade",
        "Disparar campanha piloto",
        "Medir impacto em 30 dias",
      ],
      benchmark: 12,
      kpi: "Churn",
    },
    {
      id: 2,
      titulo: "Upsell para Clientes Inativos",
      descricao: "Identificar clientes inativos e oferecer upgrade de plano",
      categoria: "Vendas",
      potencial: 87500,
      roi: 180,
      timeline: "Médio prazo (6 meses)",
      status: "planejado",
      passos: [
        "Segmentar clientes inativos",
        "Criar oferta de upgrade",
        "Campanha email + WhatsApp",
        "Acompanhar conversão",
      ],
      benchmark: 8,
      kpi: "LTV",
    },
    {
      id: 3,
      titulo: "Otimização de Preço por Segmento",
      descricao: "Ajustar preços dinamicamente por segmento de cliente",
      categoria: "Produto",
      potencial: 250000,
      roi: 320,
      timeline: "Estratégico (12+ meses)",
      status: "em_andamento",
      passos: [
        "Analisar elasticidade de preço",
        "Testar em segmento piloto",
        "Validar impacto no churn",
        "Expandir para base completa",
      ],
      benchmark: 15,
      kpi: "Receita por Cliente",
    },
    {
      id: 4,
      titulo: "Programa de Referência",
      descricao: "Incentivar clientes a indicar novos clientes",
      categoria: "Marketing",
      potencial: 95000,
      roi: 210,
      timeline: "Curto prazo (1-3 meses)",
      status: "recomendado",
      passos: [
        "Definir estrutura de incentivo",
        "Criar landing page",
        "Disparar convite para clientes",
        "Acompanhar taxa de referência",
      ],
      benchmark: 10,
      kpi: "CAC",
    },
    {
      id: 5,
      titulo: "Automação de Suporte",
      descricao: "Implementar chatbot para reduzir tempo de resposta",
      categoria: "Compliance",
      potencial: 45000,
      roi: 155,
      timeline: "Médio prazo (6 meses)",
      status: "recomendado",
      passos: [
        "Mapear fluxos de suporte",
        "Treinar modelo de IA",
        "Deploy em produção",
        "Monitorar satisfação",
      ],
      benchmark: 6,
      kpi: "CSAT",
    },
  ];

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const getCategoryColor = (categoria: string) => {
    const cores: Record<string, string> = {
      Marketing: "bg-blue-100 text-blue-900",
      Vendas: "bg-green-100 text-green-900",
      Retenção: "bg-purple-100 text-purple-900",
      Produto: "bg-orange-100 text-orange-900",
      Compliance: "bg-red-100 text-red-900",
    };
    return cores[categoria] || "bg-gray-100 text-gray-900";
  };

  const getStatusColor = (status: string) => {
    const cores: Record<string, string> = {
      recomendado: "bg-yellow-100 text-yellow-900",
      planejado: "bg-blue-100 text-blue-900",
      em_andamento: "bg-green-100 text-green-900",
      concluido: "bg-gray-100 text-gray-900",
    };
    return cores[status] || "bg-gray-100 text-gray-900";
  };

  const getTimelineColor = (timeline: string) => {
    if (timeline.includes("Curto")) return "text-green-600";
    if (timeline.includes("Médio")) return "text-orange-600";
    return "text-red-600";
  };

  const handleSimular = () => {
    const potencialTotal = sliders.clientes * sliders.ticketMedio * (sliders.taxaResposta / 100);
    toast.success(`Potencial estimado: ${formatarMoeda(potencialTotal)}`);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ações Inteligentes</h1>
          <p className="text-gray-600 mt-1">
            Recomendações de ações com potencial financeiro e ROI realista
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowRanking(!showRanking)}
            variant="outline"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Ranking
          </Button>
          <Button
            onClick={() => setShowSimulador(!showSimulador)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Sliders className="w-4 h-4 mr-2" />
            Simulador
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Ações Recomendadas</p>
          <p className="text-3xl font-bold text-purple-600">5</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Potencial Total</p>
          <p className="text-2xl font-bold text-green-600">
            {formatarMoeda(602500)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">ROI Médio</p>
          <p className="text-3xl font-bold text-blue-600">222%</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Em Andamento</p>
          <p className="text-3xl font-bold text-orange-600">1</p>
        </Card>
      </div>

      {/* Simulador */}
      {showSimulador && (
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Simulador de ROI
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nº de Clientes: {sliders.clientes.toLocaleString("pt-BR")}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={sliders.clientes}
                onChange={(e) =>
                  setSliders({ ...sliders, clientes: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Ticket Médio: {formatarMoeda(sliders.ticketMedio)}
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={sliders.ticketMedio}
                onChange={(e) =>
                  setSliders({ ...sliders, ticketMedio: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Taxa de Resposta: {sliders.taxaResposta}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={sliders.taxaResposta}
                onChange={(e) =>
                  setSliders({ ...sliders, taxaResposta: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>

          <Button onClick={handleSimular} className="bg-purple-600 hover:bg-purple-700">
            <Zap className="w-4 h-4 mr-2" />
            Calcular Potencial
          </Button>
        </Card>
      )}

      {/* Ranking de Impacto */}
      {showRanking && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Ranking de Impacto (Facilidade vs Potencial)
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Matriz */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-gray-600 mb-4">
                Matriz de Priorização
              </div>
              <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-lg p-8 relative h-64">
                {/* Quadrantes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1 w-full h-full">
                    <div className="border-r border-b border-gray-300 flex items-center justify-center text-xs font-semibold text-green-700">
                      Fácil + Alto
                    </div>
                    <div className="border-b border-gray-300 flex items-center justify-center text-xs font-semibold text-orange-700">
                      Difícil + Alto
                    </div>
                    <div className="border-r border-gray-300 flex items-center justify-center text-xs font-semibold text-yellow-700">
                      Fácil + Baixo
                    </div>
                    <div className="flex items-center justify-center text-xs font-semibold text-red-700">
                      Difícil + Baixo
                    </div>
                  </div>
                </div>

                {/* Pontos */}
                <div className="absolute inset-0">
                  {acoes.map((acao, idx) => (
                    <div
                      key={acao.id}
                      className="absolute w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        left: `${20 + (acao.roi / 320) * 60}%`,
                        top: `${20 + (idx * 15) % 60}%`,
                      }}
                      title={acao.titulo}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Eixo X:</strong> Facilidade de Implementação
                </p>
                <p>
                  <strong>Eixo Y:</strong> Potencial Financeiro
                </p>
              </div>
            </div>

            {/* Legenda */}
            <div className="space-y-3">
              {acoes.map((acao, idx) => (
                <div key={acao.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {acao.titulo}
                    </p>
                    <p className="text-xs text-gray-600">
                      ROI: {acao.roi}% | Potencial: {formatarMoeda(acao.potencial)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Ações */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Recomendações</h2>
        {acoes.map((acao) => (
          <Card
            key={acao.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {acao.titulo}
                  </h3>
                  <Badge className={getCategoryColor(acao.categoria)}>
                    {acao.categoria}
                  </Badge>
                  <Badge className={getStatusColor(acao.status)}>
                    {acao.status === "recomendado" && "Recomendado"}
                    {acao.status === "planejado" && "Planejado"}
                    {acao.status === "em_andamento" && "Em Andamento"}
                    {acao.status === "concluido" && "Concluído"}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-4">{acao.descricao}</p>

                <div className="grid grid-cols-5 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-600">Potencial</p>
                    <p className="font-bold text-green-600">
                      {formatarMoeda(acao.potencial)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">ROI Estimado</p>
                    <p className="font-bold text-blue-600">{acao.roi}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Timeline</p>
                    <p className={`font-bold ${getTimelineColor(acao.timeline)}`}>
                      {acao.timeline}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Benchmark</p>
                    <p className="font-bold text-purple-600">+{acao.benchmark}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">KPI</p>
                    <p className="font-bold text-gray-900">{acao.kpi}</p>
                  </div>
                </div>

                {/* Passos */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    Plano de Implementação
                  </p>
                  <ol className="text-sm text-blue-800 space-y-1">
                    {acao.passos.map((passo, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold">{idx + 1}.</span>
                        <span>{passo}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Benchmark */}
                {acao.benchmark && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold mb-1">
                      Benchmark de Mercado
                    </p>
                    <p className="text-sm text-green-900">
                      Empresas similares tiveram em média +{acao.benchmark}% de impacto nesta ação
                    </p>
                  </div>
                )}
              </div>

              <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
            </div>

            <div className="flex gap-2 pt-4 border-t flex-wrap">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Executar
              </Button>
              <Button size="sm" variant="outline">
                <Lightbulb className="w-4 h-4 mr-2" />
                Detalhes
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
