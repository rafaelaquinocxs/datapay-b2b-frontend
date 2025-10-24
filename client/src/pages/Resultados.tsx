import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  BarChart,
  CheckCircle2,
  ArrowUp,
} from "lucide-react";

const resultadosAcoes = [
  {
    id: 1,
    titulo: "Combo Cerveja + Petisco no Estádio",
    periodo: "Últimos 30 dias",
    investimento: "R$ 8k",
    receita: "R$ 38k",
    lucro: "R$ 30k",
    roi: "375%",
    conversao: "24.3%",
    alcance: "12.4k pessoas",
    status: "concluída",
  },
];

export default function Resultados() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resultados</h1>
        <p className="text-gray-500 mt-1">
          Performance e ROI das ações implementadas
        </p>
      </div>

      {/* KPIs Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <Badge className="bg-green-100 text-green-700">
              <ArrowUp className="w-3 h-3 mr-1" />
              +45%
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Receita Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">R$ 38k</p>
          <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              <ArrowUp className="w-3 h-3 mr-1" />
              +375%
            </Badge>
          </div>
          <p className="text-sm text-gray-500">ROI Médio</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">375%</p>
          <p className="text-xs text-gray-500 mt-1">Acima da meta (300%)</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              <ArrowUp className="w-3 h-3 mr-1" />
              +18%
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Taxa de Conversão</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">24.3%</p>
          <p className="text-xs text-gray-500 mt-1">Meta: 20%</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <Badge className="bg-orange-100 text-orange-700">
              <ArrowUp className="w-3 h-3 mr-1" />
              +32%
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Pessoas Alcançadas</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12.4k</p>
          <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
        </Card>
      </div>

      {/* Resultados por Ação */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Resultados por Ação
        </h2>

        <div className="space-y-6">
          {resultadosAcoes.map((resultado) => (
            <Card
              key={resultado.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {resultado.titulo}
                    </h3>
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Concluída
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{resultado.periodo}</p>
                </div>
              </div>

              {/* Métricas Principais */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Investimento</p>
                  <p className="text-xl font-bold text-gray-900">
                    {resultado.investimento}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Receita</p>
                  <p className="text-xl font-bold text-green-600">
                    {resultado.receita}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Lucro</p>
                  <p className="text-xl font-bold text-blue-600">
                    {resultado.lucro}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">ROI</p>
                  <p className="text-xl font-bold text-purple-600">
                    {resultado.roi}
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Conversão</p>
                  <p className="text-xl font-bold text-orange-600">
                    {resultado.conversao}
                  </p>
                </div>
              </div>

              {/* Detalhes */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Alcance: <strong>{resultado.alcance}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Status: <strong className="text-green-600">Sucesso</strong>
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Resumo Geral */}
      <Card className="p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Resumo Geral</h3>
            <p className="text-purple-100">
              Performance acumulada de todas as ações implementadas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <p className="text-sm text-purple-100 mb-1">Total Investido</p>
            <p className="text-3xl font-bold">R$ 8k</p>
          </div>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <p className="text-sm text-purple-100 mb-1">Total Gerado</p>
            <p className="text-3xl font-bold">R$ 38k</p>
          </div>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <p className="text-sm text-purple-100 mb-1">Lucro Líquido</p>
            <p className="text-3xl font-bold">R$ 30k</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

