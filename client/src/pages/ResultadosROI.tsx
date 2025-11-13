import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Target, AlertCircle } from "lucide-react";

export default function ResultadosROI() {
  const resultados = [
    {
      id: 1,
      insight: "Segmentação por Ciclo de Vida",
      periodo: "30 dias",
      conversaoBaseline: "8.5%",
      conversaoReal: "14.2%",
      uplift: "67%",
      roi: "385%",
      clientesAlcancados: 2810,
      vendas: "R$ 128.000",
      status: "em_progresso",
    },
    {
      id: 2,
      insight: "Propensão de Recompra",
      periodo: "30 dias",
      conversaoBaseline: "12%",
      conversaoReal: "18.5%",
      uplift: "54%",
      roi: "280%",
      clientesAlcancados: 1950,
      vendas: "R$ 95.000",
      status: "concluido",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resultados & ROI</h1>
        <p className="text-gray-600 mt-1">Acompanhe o desempenho das ações implementadas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">ROI Médio</p>
          <p className="text-3xl font-bold text-green-600">332%</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% vs mês anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Uplift Médio</p>
          <p className="text-3xl font-bold text-blue-600">60%</p>
          <p className="text-xs text-blue-600 mt-2">↑ Conversão</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Receita Gerada</p>
          <p className="text-3xl font-bold text-purple-600">R$ 223k</p>
          <p className="text-xs text-purple-600 mt-2">Últimos 30 dias</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Clientes Alcançados</p>
          <p className="text-3xl font-bold text-orange-600">4.760</p>
          <p className="text-xs text-orange-600 mt-2">Segmentados</p>
        </Card>
      </div>

      <div className="space-y-4">
        {resultados.map((resultado) => (
          <Card key={resultado.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{resultado.insight}</h3>
                <p className="text-sm text-gray-600">Período: {resultado.periodo}</p>
              </div>
              <Badge className={resultado.status === "concluido" ? "bg-green-100 text-green-900" : "bg-blue-100 text-blue-900"}>
                {resultado.status === "concluido" ? "Concluído" : "Em Progresso"}
              </Badge>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Conversão Baseline</p>
                <p className="text-lg font-bold text-gray-900">{resultado.conversaoBaseline}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Conversão Real</p>
                <p className="text-lg font-bold text-green-600">{resultado.conversaoReal}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Uplift</p>
                <p className="text-lg font-bold text-blue-600">{resultado.uplift}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">ROI</p>
                <p className="text-lg font-bold text-purple-600">{resultado.roi}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Clientes</p>
                <p className="text-lg font-bold text-orange-600">{resultado.clientesAlcancados.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Vendas</p>
                <p className="text-lg font-bold text-green-600">{resultado.vendas}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Crescimento</p>
                    <p className="font-semibold text-gray-900">+{resultado.uplift}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Segmento</p>
                    <p className="font-semibold text-gray-900">{resultado.clientesAlcancados.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Receita</p>
                    <p className="font-semibold text-gray-900">{resultado.vendas}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Aprendizado Contínuo</h4>
            <p className="text-sm text-blue-800">
              Usamos seus resultados para melhorar as próximas recomendações. Quanto mais dados coletarmos, mais precisas serão as previsões.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
