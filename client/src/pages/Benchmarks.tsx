import { PageTransition } from "@/components/PageTransition";
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
  Award,
  ArrowUpRight,
  ArrowDownRight,
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
      verde: "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800",
      amarelo: "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
      vermelho: "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800",
    };
    return cores[status] || "bg-gray-100 dark:bg-gray-800";
  };

  const getStatusTextColor = (status: string) => {
    const cores: Record<string, string> = {
      verde: "text-green-700 dark:text-green-400",
      amarelo: "text-orange-700 dark:text-orange-400",
      vermelho: "text-red-700 dark:text-red-400",
    };
    return cores[status] || "text-gray-700";
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
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Benchmarks</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Compare sua empresa com a mediana do setor e top performers</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowHistorico(!showHistorico)}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700"
                >
                  <LineChart className="w-4 h-4 mr-2" />
                  Histórico
                </Button>
                <Button
                  onClick={() => setShowSimulador(!showSimulador)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  What-if
                </Button>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-3 flex-wrap">
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="trimestre">Último Trimestre</option>
              <option value="ano">Último Ano</option>
              <option value="completo">Histórico Completo</option>
            </select>

            <select
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="todos">Todos os Setores</option>
              <option value="varejo">Varejo</option>
              <option value="financeiro">Financeiro</option>
              <option value="saude">Saúde</option>
              <option value="tech">Tech</option>
            </select>

            <Button variant="outline" className="border-gray-300 dark:border-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Métricas Críticas</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">2</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Acima da Mediana</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">1</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Percentil Médio</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">P35</p>
                </div>
                <Award className="w-8 h-8 text-purple-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Potencial de Melhoria</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">+20pts</p>
                </div>
                <Zap className="w-8 h-8 text-orange-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Narrativa Executiva */}
          <Card className={`${getStatusColor("vermelho")} border-2 p-6`}>
            <div className="flex items-start gap-4">
              <AlertCircle className={`w-6 h-6 ${getStatusTextColor("vermelho")} flex-shrink-0 mt-1`} />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Resumo Executivo
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Sua empresa está <strong>abaixo da mediana em 2 indicadores críticos</strong> (Qualidade de Dados e Conformidade LGPD). Isso pode impactar escalabilidade, precisão de insights e criar risco regulatório.
                </p>
                <div className="flex items-start gap-2 text-sm font-semibold">
                  <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Ações recomendadas: Aumentar investimento em qualidade de dados (30% do budget) e implementar projeto de adequação LGPD em até 6 meses.</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Simulador What-if */}
          {showSimulador && (
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Simulador What-if
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
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
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Novo valor: 2.7% da receita
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
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
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Novo score: 73 (acima da mediana)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
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
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Novo score: 68 (próximo da mediana)
                  </p>
                </div>
              </div>

              <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-green-900 dark:text-green-400 mb-2">
                  ✓ Impacto Estimado
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Com esses investimentos, você passaria do <strong>percentil 25 para o percentil 55</strong> em 12 meses. Isso representaria um salto significativo na competitividade do setor.
                </p>
              </div>

              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Exportar Cenário
              </Button>
            </Card>
          )}

          {/* Histórico de Evolução */}
          {showHistorico && (
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Evolução Histórica (Percentil)
              </h2>

              <div className="space-y-3">
                {metricas.map((metrica) => (
                  <div key={metrica.nome} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900 dark:text-white">{metrica.nome}</p>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        P25 → P35 (+10 pontos)
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400 flex-wrap">
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Comparação de Métricas</h2>

            {metricas.map((metrica) => (
              <Card key={metrica.nome} className={`${getStatusColor(metrica.status)} border-2 p-6`}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getStatusIcon(metrica.status)}</span>
                        <h3 className={`text-lg font-bold ${getStatusTextColor(metrica.status)}`}>
                          {metrica.nome}
                        </h3>
                        <Badge className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          {getPercentil(metrica.sua_empresa, metrica.mediana, metrica.p90)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{metrica.impacto}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTendenciaIcon(metrica.tendencia)}
                    </div>
                  </div>

                  {/* Comparação de Valores */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-current border-opacity-20">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Sua Empresa</p>
                      <p className={`text-2xl font-bold ${getStatusTextColor(metrica.status)} mt-1`}>
                        {metrica.sua_empresa}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Mediana</p>
                      <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-1">
                        {metrica.mediana}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">P90</p>
                      <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-1">
                        {metrica.p90}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="pt-2">
                    <div className="h-2 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          metrica.status === "verde"
                            ? "bg-green-600"
                            : metrica.status === "amarelo"
                            ? "bg-orange-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${(metrica.sua_empresa / metrica.p90) * 100}%` }}
                      />
                    </div>
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

