import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Settings,
  Download,
  Share2,
  AlertCircle,
  Brain,
  Zap,
  Target,
  Plus,
  ArrowRight,
  Percent,
  LineChart,
  Activity,
  GitBranch,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Users,
  Eye,
} from "lucide-react";

interface VariavelCausal {
  nome: string;
  tipo: "entrada" | "intermediaria" | "saida";
  valor: number;
  unidade: string;
  descricao: string;
  impacto: number; // -100 a 100
}

interface AnaliseSensibilidade {
  variavel: string;
  cenarioBase: number;
  variacao10Menos: number;
  variacao10Mais: number;
  elasticidade: number; // % mudança na saída / % mudança na entrada
  criticidade: "alta" | "media" | "baixa";
}

interface FluxoCausal {
  etapa: number;
  nome: string;
  entrada: string;
  saida: string;
  formula: string;
  resultado: number;
}

interface ResultadosFase5 {
  variaveis: VariavelCausal[];
  analisesSensibilidade: AnaliseSensibilidade[];
  fluxoCausal: FluxoCausal[];
  elasticidades: {
    preco: number;
    volume: number;
    desconto: number;
    midia: number;
  };
  metricas: {
    variaveisAnalisadas: number;
    variaveisAltoImpacto: number;
    variaveisMedianoImpacto: number;
    variaveisBaixoImpacto: number;
  };
}

export default function StudioSimuladorABMFase5() {
  const [abaAtiva, setAbaAtiva] = useState<"causalidade" | "sensibilidade" | "elasticidade">(
    "causalidade"
  );

  const [resultados, setResultados] = useState<ResultadosFase5>({
    variaveis: [
      {
        nome: "Orçamento de Mídia",
        tipo: "entrada",
        valor: 16000,
        unidade: "R$",
        descricao: "Investimento total em canais de marketing",
        impacto: 85,
      },
      {
        nome: "Impressões",
        tipo: "intermediaria",
        valor: 320000,
        unidade: "unidades",
        descricao: "Alcance total da campanha",
        impacto: 72,
      },
      {
        nome: "Taxa de Clique",
        tipo: "intermediaria",
        valor: 3.2,
        unidade: "%",
        descricao: "Percentual de impressões que viram cliques",
        impacto: 65,
      },
      {
        nome: "Cliques",
        tipo: "intermediaria",
        valor: 10240,
        unidade: "unidades",
        descricao: "Número total de cliques",
        impacto: 68,
      },
      {
        nome: "Taxa de Conversão",
        tipo: "intermediaria",
        valor: 15.3,
        unidade: "%",
        descricao: "Percentual de cliques que viram conversões",
        impacto: 78,
      },
      {
        nome: "Conversões",
        tipo: "intermediaria",
        valor: 1570,
        unidade: "unidades",
        descricao: "Número total de conversões",
        impacto: 92,
      },
      {
        nome: "Preço Médio",
        tipo: "entrada",
        valor: 150,
        unidade: "R$",
        descricao: "Valor médio por conversão",
        impacto: 88,
      },
      {
        nome: "Receita",
        tipo: "saida",
        valor: 235500,
        unidade: "R$",
        descricao: "Receita total gerada",
        impacto: 100,
      },
      {
        nome: "Custo Total",
        tipo: "entrada",
        valor: 16000,
        unidade: "R$",
        descricao: "Custo total da campanha",
        impacto: -95,
      },
      {
        nome: "ROI",
        tipo: "saida",
        valor: 1371,
        unidade: "%",
        descricao: "Retorno sobre investimento",
        impacto: 100,
      },
    ],
    analisesSensibilidade: [
      {
        variavel: "Orçamento de Mídia",
        cenarioBase: 235500,
        variacao10Menos: 211975,
        variacao10Mais: 259025,
        elasticidade: 1.0,
        criticidade: "alta",
      },
      {
        variavel: "Taxa de Conversão",
        cenarioBase: 235500,
        variacao10Menos: 202200,
        variacao10Mais: 268800,
        elasticidade: 0.95,
        criticidade: "alta",
      },
      {
        variavel: "Preço Médio",
        cenarioBase: 235500,
        variacao10Menos: 211975,
        variacao10Mais: 259025,
        elasticidade: 1.0,
        criticidade: "alta",
      },
      {
        variavel: "Taxa de Clique",
        cenarioBase: 235500,
        variacao10Menos: 224025,
        variacao10Mais: 246975,
        elasticidade: 0.45,
        criticidade: "media",
      },
      {
        variavel: "Desconto Médio",
        cenarioBase: 235500,
        variacao10Menos: 258825,
        variacao10Mais: 212175,
        elasticidade: -0.98,
        criticidade: "alta",
      },
      {
        variavel: "Custo por Clique",
        cenarioBase: 235500,
        variacao10Menos: 247500,
        variacao10Mais: 223500,
        elasticidade: -0.5,
        criticidade: "media",
      },
    ],
    fluxoCausal: [
      {
        etapa: 1,
        nome: "Investimento em Mídia",
        entrada: "Orçamento (R$16.000)",
        saida: "Impressões (320k)",
        formula: "Orçamento ÷ CPM",
        resultado: 320000,
      },
      {
        etapa: 2,
        nome: "Engajamento",
        entrada: "Impressões (320k)",
        saida: "Cliques (10.2k)",
        formula: "Impressões × CTR (3.2%)",
        resultado: 10240,
      },
      {
        etapa: 3,
        nome: "Conversão",
        entrada: "Cliques (10.2k)",
        saida: "Conversões (1.5k)",
        formula: "Cliques × Taxa Conv (15.3%)",
        resultado: 1570,
      },
      {
        etapa: 4,
        nome: "Monetização",
        entrada: "Conversões (1.5k) × Preço (R$150)",
        saida: "Receita (R$235.5k)",
        formula: "Conversões × Preço Médio",
        resultado: 235500,
      },
      {
        etapa: 5,
        nome: "Rentabilidade",
        entrada: "Receita (R$235.5k) - Custo (R$16k)",
        saida: "ROI (1.371%)",
        formula: "((Receita - Custo) / Custo) × 100",
        resultado: 1371,
      },
    ],
    elasticidades: {
      preco: 1.0,
      volume: 0.95,
      desconto: -0.98,
      midia: 1.0,
    },
    metricas: {
      variaveisAnalisadas: 10,
      variaveisAltoImpacto: 5,
      variaveisMedianoImpacto: 2,
      variaveisBaixoImpacto: 3,
    },
  });

  const [variaveisComparacao, setVariaveisComparacao] = useState<string[]>([
    "Orçamento de Mídia",
    "Taxa de Conversão",
  ]);

  const getImpactColor = (impacto: number) => {
    if (impacto >= 80) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (impacto >= 50) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    if (impacto >= 0) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  const getCriticidadeColor = (criticidade: string) => {
    switch (criticidade) {
      case "alta":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "media":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "baixa":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "";
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Simulador ABM - Fase 5
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Análise Causal & Sensibilidade
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Principais */}
          <Tabs
            value={abaAtiva}
            onValueChange={(v) =>
              setAbaAtiva(v as "causalidade" | "sensibilidade" | "elasticidade")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-200 dark:bg-gray-800">
              <TabsTrigger value="causalidade" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                <GitBranch className="w-4 h-4 mr-2" />
                Causalidade
              </TabsTrigger>
              <TabsTrigger value="sensibilidade" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                <Zap className="w-4 h-4 mr-2" />
                Sensibilidade
              </TabsTrigger>
              <TabsTrigger value="elasticidade" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Elasticidade
              </TabsTrigger>
            </TabsList>

            {/* TAB: CAUSALIDADE */}
            <TabsContent value="causalidade" className="space-y-6">
              {/* Métricas Gerais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Variáveis Analisadas</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {resultados.metricas.variaveisAnalisadas}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-violet-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Alto Impacto</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                        {resultados.metricas.variaveisAltoImpacto}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Médio Impacto</p>
                      <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                        {resultados.metricas.variaveisMedianoImpacto}
                      </p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-yellow-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Baixo Impacto</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                        {resultados.metricas.variaveisBaixoImpacto}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                </Card>
              </div>

              {/* Fluxo Causal */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Fluxo Causal: Orçamento → ROI
                </h3>

                <div className="space-y-4">
                  {resultados.fluxoCausal.map((fluxo, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-4">
                        {/* Etapa */}
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30">
                            <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                              {fluxo.etapa}
                            </span>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {fluxo.nome}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {fluxo.entrada} → {fluxo.saida}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-mono">
                            {fluxo.formula}
                          </p>
                        </div>

                        {/* Resultado */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Resultado</p>
                          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 mt-1">
                            {fluxo.resultado.toLocaleString("pt-BR")}
                          </p>
                        </div>

                        {/* Seta */}
                        {idx < resultados.fluxoCausal.length - 1 && (
                          <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-700 flex-shrink-0" />
                        )}
                      </div>

                      {idx < resultados.fluxoCausal.length - 1 && (
                        <div className="ml-6 mt-4 mb-4 border-l-2 border-gray-200 dark:border-gray-800 h-4" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Matriz de Variáveis */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Matriz de Causalidade
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Variável
                        </th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Tipo
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Valor
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Impacto
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Descrição
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.variaveis.map((variavel) => (
                        <tr
                          key={variavel.nome}
                          className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {variavel.nome}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Badge
                              className={
                                variavel.tipo === "entrada"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : variavel.tipo === "intermediaria"
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              }
                            >
                              {variavel.tipo}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300 font-mono">
                            {variavel.valor.toLocaleString("pt-BR")} {variavel.unidade}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Badge className={getImpactColor(Math.abs(variavel.impacto))}>
                              {variavel.impacto > 0 ? "+" : ""}
                              {variavel.impacto}%
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                            {variavel.descricao}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* TAB: SENSIBILIDADE */}
            <TabsContent value="sensibilidade" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Análise de Sensibilidade
                </h3>

                <div className="space-y-6">
                  {resultados.analisesSensibilidade.map((analise) => (
                    <div
                      key={analise.variavel}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {analise.variavel}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Elasticidade: {analise.elasticidade.toFixed(2)} (
                            {Math.abs(analise.elasticidade) > 0.8
                              ? "Alta sensibilidade"
                              : "Baixa sensibilidade"}
                            )
                          </p>
                        </div>
                        <Badge className={getCriticidadeColor(analise.criticidade)}>
                          {analise.criticidade.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Gráfico de Sensibilidade */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            -10%
                          </span>
                          <div className="flex-1 h-8 bg-gradient-to-r from-red-100 to-gray-100 dark:from-red-900/30 dark:to-gray-800 rounded-lg flex items-center px-3">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              R$ {(analise.variacao10Menos / 1000).toFixed(1)}k
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            Base
                          </span>
                          <div className="flex-1 h-8 bg-gradient-to-r from-violet-200 to-violet-100 dark:from-violet-900/40 dark:to-violet-900/20 rounded-lg flex items-center px-3">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              R$ {(analise.cenarioBase / 1000).toFixed(1)}k
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 dark:text-gray-400 w-20">
                            +10%
                          </span>
                          <div className="flex-1 h-8 bg-gradient-to-r from-gray-100 to-green-100 dark:from-gray-800 dark:to-green-900/30 rounded-lg flex items-center px-3">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              R$ {(analise.variacao10Mais / 1000).toFixed(1)}k
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Impacto */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Impacto de ±10% na variável:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                            <p className="text-xs text-red-700 dark:text-red-400">Redução -10%</p>
                            <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">
                              -R$ {((analise.cenarioBase - analise.variacao10Menos) / 1000).toFixed(1)}k
                            </p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                            <p className="text-xs text-green-700 dark:text-green-400">Aumento +10%</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                              +R$ {((analise.variacao10Mais - analise.cenarioBase) / 1000).toFixed(1)}k
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recomendações */}
              <Card className="bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 p-6">
                <h3 className="text-lg font-bold text-violet-900 dark:text-violet-300 mb-4">
                  💡 Recomendações de Otimização
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-800 dark:text-violet-200">
                      <strong>Foco em Variáveis Críticas:</strong> Orçamento, Taxa de Conversão e
                      Preço têm o maior impacto. Otimize essas variáveis primeiro.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-800 dark:text-violet-200">
                      <strong>Desconto é Perigoso:</strong> Reduzir desconto em 10% aumenta receita
                      em 9.8%. Considere estratégia de preço premium.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-800 dark:text-violet-200">
                      <strong>Aumento de Orçamento:</strong> Cada 10% de aumento em orçamento gera
                      10% de aumento em receita. ROI é linear nessa variável.
                    </span>
                  </li>
                </ul>
              </Card>
            </TabsContent>

            {/* TAB: ELASTICIDADE */}
            <TabsContent value="elasticidade" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Elasticidade de Demanda
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Elasticidade de Preço */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Elasticidade de Preço
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Coeficiente</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                          {resultados.elasticidades.preco.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <strong>Interpretação:</strong> Aumentar preço em 1% reduz volume em 1%.
                          Demanda é unitária.
                        </p>
                      </div>
                      <div className="h-32 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-end justify-around p-4">
                        {[0, 20, 40, 60, 80, 100].map((x) => (
                          <div
                            key={x}
                            className="flex flex-col items-center gap-2"
                            style={{ height: "100%" }}
                          >
                            <div
                              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                              style={{
                                width: "20px",
                                height: `${100 - x}%`,
                              }}
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {x}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Elasticidade de Volume */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Elasticidade de Volume
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Coeficiente</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                          {resultados.elasticidades.volume.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <strong>Interpretação:</strong> Aumentar volume em 1% aumenta receita em
                          0.95%. Demanda é inelástica.
                        </p>
                      </div>
                      <div className="h-32 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-end justify-around p-4">
                        {[0, 20, 40, 60, 80, 100].map((x) => (
                          <div
                            key={x}
                            className="flex flex-col items-center gap-2"
                            style={{ height: "100%" }}
                          >
                            <div
                              className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                              style={{
                                width: "20px",
                                height: `${x * 0.95}%`,
                              }}
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {x}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Elasticidade de Desconto */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Elasticidade de Desconto
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Coeficiente</p>
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                          {resultados.elasticidades.desconto.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                        <p className="text-sm text-red-700 dark:text-red-300">
                          <strong>Interpretação:</strong> Aumentar desconto em 1% reduz receita em
                          0.98%. Desconto é prejudicial.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Elasticidade de Mídia */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Elasticidade de Mídia
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Coeficiente</p>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                          {resultados.elasticidades.midia.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          <strong>Interpretação:</strong> Aumentar mídia em 1% aumenta receita em
                          1%. Retorno é proporcional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Curva de Demanda */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Curva de Demanda por Preço
                </h3>

                <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-end justify-around">
                  {[
                    { preco: 100, volume: 2000 },
                    { preco: 125, volume: 1800 },
                    { preco: 150, volume: 1570 },
                    { preco: 175, volume: 1350 },
                    { preco: 200, volume: 1100 },
                  ].map((ponto) => (
                    <div key={ponto.preco} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-gradient-to-t from-violet-500 to-violet-400 rounded-t-lg transition-all hover:opacity-80"
                        style={{
                          width: "40px",
                          height: `${(ponto.volume / 2000) * 100}%`,
                        }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        R$ {ponto.preco}
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {ponto.volume}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  A curva mostra a relação inversa entre preço e volume. Preço ótimo está em R$
                  150, maximizando receita.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

