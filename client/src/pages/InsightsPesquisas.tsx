import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Download,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function InsightsPesquisas() {
  const insights = [
    {
      id: 1,
      pesquisa: "NPS - Net Promoter Score",
      tipo: "cluster",
      titulo: "Promotores concentrados em São Paulo",
      descricao: "72% dos promotores (nota 9-10) estão na região SP",
      percentual: 72,
      acaoSugerida: "Replicar estratégia de SP em outras regiões",
      prioridade: "alta",
    },
    {
      id: 2,
      pesquisa: "Satisfação com Atendimento",
      tipo: "alerta",
      titulo: "Tempo de resposta acima do esperado",
      descricao: "35% reclamaram de atraso na resposta do suporte",
      percentual: 35,
      acaoSugerida: "Aumentar equipe de suporte em 20%",
      prioridade: "critica",
    },
    {
      id: 3,
      pesquisa: "Clima Organizacional",
      tipo: "oportunidade",
      titulo: "Potencial de retenção em TI",
      descricao: "Equipe de TI tem 85% de satisfação - oportunidade de crescimento",
      percentual: 85,
      acaoSugerida: "Investir em desenvolvimento de carreira para TI",
      prioridade: "media",
    },
  ];

  const benchmarks = [
    {
      metrica: "NPS",
      regiao1: "São Paulo",
      valor1: 68,
      regiao2: "Rio de Janeiro",
      valor2: 52,
      diferenca: 16,
    },
    {
      metrica: "CSAT",
      regiao1: "Minas Gerais",
      valor1: 88,
      regiao2: "Bahia",
      valor2: 72,
      diferenca: 16,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insights & Benchmarking</h1>
          <p className="text-gray-600 mt-1">
            Análise automática de respostas e comparação entre regiões
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Insights Gerados</p>
          <p className="text-3xl font-bold text-purple-600">12</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Alertas Críticos</p>
          <p className="text-3xl font-bold text-red-600">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Oportunidades</p>
          <p className="text-3xl font-bold text-green-600">5</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Ações Sugeridas</p>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </Card>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Insights Automáticos</h2>
        {insights.map((insight) => (
          <Card key={insight.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {insight.tipo === "alerta" && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  {insight.tipo === "oportunidade" && (
                    <Lightbulb className="w-5 h-5 text-green-600" />
                  )}
                  {insight.tipo === "cluster" && (
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  )}
                  <h3 className="text-lg font-bold text-gray-900">
                    {insight.titulo}
                  </h3>
                  <Badge
                    className={
                      insight.prioridade === "critica"
                        ? "bg-red-100 text-red-900"
                        : insight.prioridade === "alta"
                        ? "bg-orange-100 text-orange-900"
                        : "bg-yellow-100 text-yellow-900"
                    }
                  >
                    {insight.prioridade}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-3">{insight.descricao}</p>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-blue-600 font-semibold">
                      Percentual Afetado
                    </p>
                    <p className="text-sm font-bold text-blue-900">
                      {insight.percentual}%
                    </p>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${insight.percentual}%` }}
                    />
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">
                        Ação Sugerida
                      </p>
                      <p className="text-sm text-green-800">
                        {insight.acaoSugerida}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4 mr-2" />
                Aplicar Ação
              </Button>
              <Button size="sm" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Benchmarking */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Benchmarking Interno</h2>
        <div className="grid grid-cols-2 gap-4">
          {benchmarks.map((bench, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {bench.metrica}
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{bench.regiao1}</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {bench.valor1}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${bench.valor1}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{bench.regiao2}</p>
                    <p className="text-2xl font-bold text-red-600">
                      {bench.valor2}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full"
                      style={{ width: `${bench.valor2}%` }}
                    />
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-xs text-orange-600 font-semibold mb-1">
                    Diferença
                  </p>
                  <p className="text-lg font-bold text-orange-900">
                    +{bench.diferenca} pontos
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
