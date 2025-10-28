import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Loader,
  AlertCircle,
} from "lucide-react";

export default function Benchmarks() {
  const empresaId = 1;
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: profile } = trpc.companyProfile.get.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  const { data: benchmarkComps } = trpc.benchmarking.getBenchmarkComparisons.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  useEffect(() => {
    if (benchmarkComps) {
      setComparisons(benchmarkComps);
      setIsLoading(false);
    }
  }, [benchmarkComps]);

  const mockData = [
    {
      metrica: "Qualidade de Dados",
      empresa: profile?.dataQualityScore || 45,
      mediana: 60,
      p90: 85,
    },
    {
      metrica: "Budget Mensal",
      empresa: (profile?.budget || 10000) / 1000,
      mediana: 15,
      p90: 35,
    },
    {
      metrica: "Conformidade LGPD",
      empresa: profile?.lgpdCompliance ? 100 : 0,
      mediana: 70,
      p90: 95,
    },
  ];

  const getPercentilColor = (percentil: number) => {
    if (percentil >= 75) return "text-green-600";
    if (percentil >= 50) return "text-blue-600";
    if (percentil >= 25) return "text-orange-600";
    return "text-red-600";
  };

  const getPercentilBg = (percentil: number) => {
    if (percentil >= 75) return "bg-green-50";
    if (percentil >= 50) return "bg-blue-50";
    if (percentil >= 25) return "bg-orange-50";
    return "bg-red-50";
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Benchmarks & Comparações</h1>
            <p className="text-green-100 mt-1">
              Compare sua empresa com o setor {profile?.setor || ""}
            </p>
          </div>
          <Target className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Gráfico de Comparação */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Comparação com Benchmarks do Setor
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metrica" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="empresa" fill="#8b5cf6" name="Sua Empresa" />
            <Bar dataKey="mediana" fill="#3b82f6" name="Mediana do Setor" />
            <Bar dataKey="p90" fill="#10b981" name="P90 (Top 10%)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Cards de Comparação */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Análise Detalhada
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.map((item, idx) => {
            const percentil = Math.min(
              100,
              Math.max(0, Math.round((item.empresa / item.p90) * 100))
            );
            const gap = item.mediana - item.empresa;

            return (
              <Card
                key={idx}
                className={`p-6 border-l-4 ${getPercentilBg(percentil)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {item.metrica}
                  </h3>
                  {gap > 0 ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Sua Empresa</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {item.empresa.toFixed(0)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mediana do Setor</span>
                    <span className="font-semibold text-gray-900">
                      {item.mediana}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentil >= 75
                          ? "bg-green-600"
                          : percentil >= 50
                            ? "bg-blue-600"
                            : percentil >= 25
                              ? "bg-orange-600"
                              : "bg-red-600"
                      }`}
                      style={{ width: `${percentil}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Percentil</span>
                    <Badge
                      className={`${getPercentilColor(percentil)}`}
                      variant="outline"
                    >
                      {percentil}º
                    </Badge>
                  </div>

                  {gap !== 0 && (
                    <div
                      className={`p-2 rounded text-sm ${
                        gap > 0
                          ? "bg-red-50 text-red-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {gap > 0
                        ? `${Math.abs(gap).toFixed(0)} abaixo da mediana`
                        : `${Math.abs(gap).toFixed(0)} acima da mediana`}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recomendações */}
      <Card className="p-6 border-l-4 border-blue-600 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Recomendações Baseadas em Benchmarks
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>
                • Sua qualidade de dados está abaixo da mediana. Considere
                implementar processos de validação.
              </li>
              <li>
                • O budget alocado é competitivo. Mantenha o investimento
                estratégico.
              </li>
              <li>
                • Conformidade LGPD é crítica. Priorize a implementação de
                controles.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Histórico de Comparações */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Histórico de Comparações
        </h2>
        {comparisons.length > 0 ? (
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Métrica
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Mediana
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Percentil
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Gap
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {comparisons.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {comp.metricaChave}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {comp.valorEmpresa}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {comp.mediana}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge
                        variant={
                          comp.percentil >= 75
                            ? "default"
                            : comp.percentil >= 50
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {comp.percentil}º
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={
                          comp.gap > 0
                            ? "text-red-600 font-medium"
                            : "text-green-600 font-medium"
                        }
                      >
                        {comp.gap > 0 ? "+" : ""}{comp.gap}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma comparação disponível
            </h3>
            <p className="text-gray-600">
              Complete seu perfil para gerar comparações com benchmarks do setor
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

