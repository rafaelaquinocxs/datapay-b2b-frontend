import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BarChart3,
  LineChart,
  Download,
  Filter,
  Zap,
  Target,
  ChevronRight,
} from "lucide-react";

interface Metrica {
  nome: string;
  sua_empresa: number;
  mediana: number;
  p90: number;
  status: "verde" | "amarelo" | "vermelho";
  tendencia: "up" | "down" | "stable";
  impacto: string;
}

export default function Benchmarks() {
  const [periodo, setPeriodo] = useState("trimestre");
  const [setor, setSetor] = useState("todos");
  const [showSimulador, setShowSimulador] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);

  const metricas: Metrica[] = [
    {
      nome: "Qualidade de Dados",
      sua_empresa: 45,
      mediana: 65,
      p90: 85,
      status: "vermelho",
      tendencia: "up",
      impacto: "Afeta escalabilidade e precisão de insights",
    },
    {
      nome: "Budget Mensal (% receita)",
      sua_empresa: 2.1,
      mediana: 3.5,
      p90: 5.8,
      status: "amarelo",
      tendencia: "stable",
      impacto: "Limita capacidade de inovação",
    },
    {
      nome: "Conformidade LGPD",
      sua_empresa: 52,
      mediana: 78,
      p90: 95,
      status: "vermelho",
      tendencia: "down",
      impacto: "Risco regulatório crítico",
    },
    {
      nome: "Automação de Processos",
      sua_empresa: 72,
      mediana: 68,
      p90: 92,
      status: "verde",
      tendencia: "up",
      impacto: "Reduz custos operacionais",
    },
    {
      nome: "Satisfação do Cliente (NPS)",
      sua_empresa: 58,
      mediana: 62,
      p90: 78,
      status: "amarelo",
      tendencia: "stable",
      impacto: "Impacta retenção e LTV",
    },
  ];

  const getStatusColor = (status: string) => {
    const cores: Record<string, string> = {
      verde: "text-green-600 bg-green-50",
      amarelo: "text-orange-600 bg-orange-50",
      vermelho: "text-red-600 bg-red-50",
    };
    return cores[status] || "text-gray-600 bg-gray-50";
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      verde: "🟢",
      amarelo: "🟡",
      vermelho: "🔴",
    };
    return icons[status] || "⚪";
  };

  const getTendenciaIcon = (tendencia: string) => {
    if (tendencia === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (tendencia === "down") return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4 text-gray-600">—</div>;
  };

  const getPercentil = (sua_empresa: number, mediana: number, p90: number) => {
    if (sua_empresa >= p90) return "P90+ (Top 10%)";
    if (sua_empresa >= mediana) return "P50-P90 (Acima da mediana)";
    return "P10-P50 (Abaixo da mediana)";
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Benchmarks</h1>
          <p className="text-gray-600 mt-1">
            Compare sua empresa com a mediana do setor e top performers
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowHistorico(!showHistorico)}
            variant="outline"
          >
            <LineChart className="w-4 h-4 mr-2" />
            Histórico
          </Button>
          <Button
            onClick={() => setShowSimulador(!showSimulador)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            What-if
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-3">
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
        >
          <option value="trimestre">Último Trimestre</option>
          <option value="ano">Último Ano</option>
          <option value="completo">Histórico Completo</option>
        </select>

        <select
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
        >
          <option value="todos">Todos os Setores</option>
          <option value="varejo">Varejo</option>
          <option value="financeiro">Financeiro</option>
          <option value="saude">Saúde</option>
          <option value="tech">Tech</option>
        </select>

        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Mais Filtros
        </Button>
      </div>

      {/* Narrativa Executiva */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Resumo Executivo
            </h2>
            <p className="text-gray-700 mb-3">
              Sua empresa está <strong>abaixo da mediana em 2 indicadores críticos</strong> (Qualidade de Dados e Conformidade LGPD). Isso pode impactar escalabilidade, precisão de insights e criar risco regulatório.
            </p>
            <div className="flex items-center gap-2 text-sm text-red-900 font-semibold">
              <Zap className="w-4 h-4" />
              Ações recomendadas: Aumentar investimento em qualidade de dados (30% do budget) e implementar projeto de adequação LGPD em até 6 meses.
            </div>
          </div>
        </div>
      </Card>

      {/* Simulador What-if */}
      {showSimulador && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Simulador What-if
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Aumentar Budget em: +30%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                defaultValue="30"
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-2">
                Novo valor: 2.7% da receita
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Investir em LGPD: +40%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                defaultValue="40"
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-2">
                Novo score: 73 (acima da mediana)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Melhorar Qualidade de Dados: +50%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                defaultValue="50"
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-2">
                Novo score: 68 (próximo da mediana)
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-green-900 mb-2">
              Impacto Estimado
            </p>
            <p className="text-gray-700">
              Com esses investimentos, você passaria do <strong>percentil 25 para o percentil 55</strong> em 12 meses. Isso representaria um salto significativo na competitividade do setor.
            </p>
          </div>

          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar Cenário
          </Button>
        </Card>
      )}

      {/* Histórico de Evolução */}
      {showHistorico && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Evolução Histórica (Percentil)
          </h2>

          <div className="space-y-4">
            {metricas.map((metrica) => (
              <div key={metrica.nome} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{metrica.nome}</p>
                  <span className="text-sm font-bold text-purple-600">
                    P25 → P35 (+10 pontos)
                  </span>
                </div>
                <div className="flex gap-2 text-xs text-gray-600">
                  <span>2024 Q1: P20</span>
                  <span>→</span>
                  <span>Q2: P25</span>
                  <span>→</span>
                  <span>Q3: P30</span>
                  <span>→</span>
                  <span>Q4: P35</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Métricas Comparativas */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Comparação de Métricas</h2>

        {metricas.map((metrica) => (
          <Card key={metrica.nome} className={`p-6 ${getStatusColor(metrica.status)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getStatusIcon(metrica.status)}</span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {metrica.nome}
                  </h3>
                  <Badge className="bg-white text-gray-900">
                    {getPercentil(metrica.sua_empresa, metrica.mediana, metrica.p90)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4">{metrica.impacto}</p>

                {/* Gráfico de barras */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700 w-24">
                      Sua Empresa
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full"
                        style={{
                          width: `${(metrica.sua_empresa / 100) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12">
                      {metrica.sua_empresa}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700 w-24">
                      Mediana Setor
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{
                          width: `${(metrica.mediana / 100) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12">
                      {metrica.mediana}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700 w-24">
                      P90 (Top 10%)
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-600 h-full rounded-full"
                        style={{
                          width: `${(metrica.p90 / 100) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12">
                      {metrica.p90}
                    </span>
                  </div>
                </div>

                {/* Tendência */}
                <div className="flex items-center gap-2">
                  {getTendenciaIcon(metrica.tendencia)}
                  <span className="text-xs text-gray-600">
                    {metrica.tendencia === "up" && "Tendência: Crescimento"}
                    {metrica.tendencia === "down" && "Tendência: Queda"}
                    {metrica.tendencia === "stable" && "Tendência: Estável"}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
            </div>

            <div className="flex gap-2 pt-4 border-t flex-wrap">
              <Button size="sm" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Plano de Ação
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
