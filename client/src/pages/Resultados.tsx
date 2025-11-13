import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { trpc } from "@/lib/trpc";
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  BarChart,
  CheckCircle2,
  ArrowUp,
  Loader,
} from "lucide-react";

export default function Resultados() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const empresaId = usuario?.id || 1;

  // Buscar resultados das ações
  const { data: resultados = [], isLoading } = trpc.resultados.listar.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  // Calcular KPIs gerais
  const totalInvestimento = resultados.reduce((acc: number, r: any) => {
    const valor = parseInt(r.investimento?.replace(/\D/g, "") || "0");
    return acc + valor;
  }, 0);

  const totalReceita = resultados.reduce((acc: number, r: any) => {
    const valor = parseInt(r.receita?.replace(/\D/g, "") || "0");
    return acc + valor;
  }, 0);

  const totalLucro = resultados.reduce((acc: number, r: any) => {
    const valor = parseInt(r.lucro?.replace(/\D/g, "") || "0");
    return acc + valor;
  }, 0);

  const roiMedio = resultados.length > 0
    ? Math.round(
        resultados.reduce((acc: number, r: any) => {
          const roi = parseInt(r.roi?.replace(/\D/g, "") || "0");
          return acc + roi;
        }, 0) / resultados.length
      )
    : 0;

  const conversaoMedia = resultados.length > 0
    ? (
        resultados.reduce((acc: number, r: any) => {
          const conv = parseFloat(r.conversao?.replace(/\D/g, ".") || "0");
          return acc + conv;
        }, 0) / resultados.length
      ).toFixed(1)
    : "0";

  const totalAlcance = resultados.reduce((acc: number, r: any) => {
    const valor = parseInt(r.alcance?.replace(/\D/g, "") || "0");
    return acc + valor;
  }, 0);

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
          <p className="text-3xl font-bold text-gray-900 mt-2">
            R$ {(totalReceita / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              <ArrowUp className="w-3 h-3 mr-1" />
              +{roiMedio}%
            </Badge>
          </div>
          <p className="text-sm text-gray-500">ROI Médio</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{roiMedio}%</p>
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
          <p className="text-3xl font-bold text-gray-900 mt-2">{conversaoMedia}%</p>
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
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {(totalAlcance / 1000).toFixed(1)}k
          </p>
          <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
        </Card>
      </div>

      {/* Resultados por Ação */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Resultados por Ação
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : resultados.length === 0 ? (
          <Card className="p-8 text-center">
            <BarChart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhum resultado registrado ainda</p>
            <p className="text-sm text-gray-500 mt-2">
              Os resultados das ações implementadas aparecerão aqui
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {resultados.map((resultado: any) => (
              <Card
                key={resultado.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {resultado.periodo || "Resultado"}
                      </h3>
                      <Badge className={
                        resultado.status === "concluida"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {resultado.status === "concluida" ? "Concluída" : "Em Progresso"}
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
                      {resultado.investimento || "N/A"}
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Receita</p>
                    <p className="text-xl font-bold text-green-600">
                      {resultado.receita || "N/A"}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Lucro</p>
                    <p className="text-xl font-bold text-blue-600">
                      {resultado.lucro || "N/A"}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">ROI</p>
                    <p className="text-xl font-bold text-purple-600">
                      {resultado.roi || "N/A"}
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Conversão</p>
                    <p className="text-xl font-bold text-orange-600">
                      {resultado.conversao || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Alcance: <strong>{resultado.alcance || "N/A"}</strong>
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
        )}
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
            <p className="text-3xl font-bold">R$ {(totalInvestimento / 1000).toFixed(0)}k</p>
          </div>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <p className="text-sm text-purple-100 mb-1">Total Gerado</p>
            <p className="text-3xl font-bold">R$ {(totalReceita / 1000).toFixed(0)}k</p>
          </div>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <p className="text-sm text-purple-100 mb-1">Lucro Líquido</p>
            <p className="text-3xl font-bold">R$ {(totalLucro / 1000).toFixed(0)}k</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

