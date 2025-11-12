import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
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
  Rocket,
  Eye,
  Play,
  Pause,
  Settings,
  ArrowRight,
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
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [showSimulador, setShowSimulador] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

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
      kpi: "Conversão",
    },
    {
      id: 3,
      titulo: "Cross-sell de Produtos",
      descricao: "Oferecer produtos complementares para clientes ativos",
      categoria: "Vendas",
      potencial: 156000,
      roi: 320,
      timeline: "Curto prazo (1-3 meses)",
      status: "ativo",
      passos: [
        "Analisar padrões de compra",
        "Identificar oportunidades de cross-sell",
        "Personalizar ofertas",
        "Disparar campanha segmentada",
      ],
      benchmark: 15,
      kpi: "Ticket Médio",
    },
  ];

  const categorias = [...new Set(acoes.map((a) => a.categoria))];
  const acoesFiltradas = filtroCategoria
    ? acoes.filter((a) => a.categoria === filtroCategoria)
    : acoes;

  const getStatusColor = (status: string) => {
    const cores: Record<string, string> = {
      recomendado: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      planejado: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      ativo: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    };
    return cores[status] || "";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      recomendado: "Recomendado",
      planejado: "Planejado",
      ativo: "Ativo",
    };
    return labels[status] || status;
  };

  const getCategoryIcon = (categoria: string) => {
    const icons: Record<string, React.ReactNode> = {
      Retenção: <Target className="w-4 h-4" />,
      Vendas: <TrendingUp className="w-4 h-4" />,
      Marketing: <Zap className="w-4 h-4" />,
    };
    return icons[categoria] || <Lightbulb className="w-4 h-4" />;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Coleta e Ações</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Ações inteligentes recomendadas para maximizar seu ROI
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nova Ação
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de Ações</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {acoes.length}
                  </p>
                </div>
                <Rocket className="w-8 h-8 text-purple-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Potencial Total</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    R$ {(acoes.reduce((sum, a) => sum + a.potencial, 0) / 1000).toFixed(0)}k
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ROI Médio</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {Math.round(acoes.reduce((sum, a) => sum + a.roi, 0) / acoes.length)}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ativas</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {acoes.filter((a) => a.status === "ativo").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setFiltroCategoria("")}
              variant={filtroCategoria === "" ? "default" : "outline"}
              className={filtroCategoria === "" ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "border-gray-300 dark:border-gray-700"}
            >
              Todas
            </Button>
            {categorias.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                variant={filtroCategoria === cat ? "default" : "outline"}
                className={filtroCategoria === cat ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "border-gray-300 dark:border-gray-700"}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Lista de Ações */}
          <div className="space-y-4">
            {acoesFiltradas.map((acao) => (
              <Card
                key={acao.id}
                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {getCategoryIcon(acao.categoria)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {acao.titulo}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {acao.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(acao.status)}>
                      {getStatusLabel(acao.status)}
                    </Badge>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                        Potencial
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                        R$ {(acao.potencial / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                        ROI
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                        +{acao.roi}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                        Timeline
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {acao.timeline}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                        KPI
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {acao.kpi}
                      </p>
                    </div>
                  </div>

                  {/* Passos */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Passos para Implementação
                    </p>
                    <div className="space-y-2">
                      {acao.passos.map((passo, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {passo}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-4">
                    {acao.status === "ativo" ? (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 dark:border-gray-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 dark:border-gray-700"
                        >
                          <Pause className="w-4 h-4 mr-2" />
                          Pausar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-300 dark:border-gray-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Ativar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

