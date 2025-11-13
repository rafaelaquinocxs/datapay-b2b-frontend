import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Users,
  Zap,
  DollarSign,
  TrendingUp,
  Mail,
  Instagram,
  Megaphone,
  Settings,
  Eye,
  Download,
  Share2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Brain,
  Sliders,
  Target,
  Percent,
} from "lucide-react";

interface SimulacaoConfig {
  nome: string;
  totalAgentes: number;
  idadeMin: number;
  idadeMax: number;
  generoDistribuicao: { masculino: number; feminino: number; outro: number };
  regioes: string[];
  canais: {
    email: { ativo: boolean; orcamento: number; cpc: number };
    instagram: { ativo: boolean; orcamento: number; cpm: number };
    outdoor: { ativo: boolean; orcamento: number; cpm: number };
  };
  orcamentoTotal: number;
  tempoSimulacao: number;
}

interface ResultadosSimulacao {
  statusSimulacao: "nao_iniciada" | "rodando" | "concluida" | "erro";
  progresso: number;
  metricas: {
    conversoes: number;
    receita: number;
    roi: number;
    custoPorAquisicao: number;
    taxaConversao: number;
  };
  resultadosPorCanal: {
    canal: string;
    impressoes: number;
    cliques: number;
    conversoes: number;
    custo: number;
    receita: number;
    roi: number;
  }[];
  tempoExecucao: number;
}

export default function StudioSimuladorABM() {
  const [abaPrincipal, setAbaPrincipal] = useState<"configuracao" | "resultados">("configuracao");
  const [abaConfiguracao, setAbaConfiguracao] = useState<"segmentos" | "canais">("segmentos");

  const [config, setConfig] = useState<SimulacaoConfig>({
    nome: "Campanha Q4 2024",
    totalAgentes: 10000,
    idadeMin: 18,
    idadeMax: 65,
    generoDistribuicao: { masculino: 45, feminino: 50, outro: 5 },
    regioes: ["SP", "RJ", "MG", "BA"],
    canais: {
      email: { ativo: true, orcamento: 5000, cpc: 0.5 },
      instagram: { ativo: true, orcamento: 8000, cpm: 5 },
      outdoor: { ativo: false, orcamento: 3000, cpm: 15 },
    },
    orcamentoTotal: 16000,
    tempoSimulacao: 30,
  });

  const [resultados, setResultados] = useState<ResultadosSimulacao>({
    statusSimulacao: "nao_iniciada",
    progresso: 0,
    metricas: {
      conversoes: 0,
      receita: 0,
      roi: 0,
      custoPorAquisicao: 0,
      taxaConversao: 0,
    },
    resultadosPorCanal: [],
    tempoExecucao: 0,
  });

  const handleIniciarSimulacao = async () => {
    setResultados((prev) => ({ ...prev, statusSimulacao: "rodando", progresso: 0 }));

    // Simulação de progresso
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setResultados((prev) => ({ ...prev, progresso: i }));
    }

    // Resultados simulados
    const canalAtivos = Object.entries(config.canais)
      .filter(([_, c]) => c.ativo)
      .map(([nome, c]) => nome);

    const resultadosPorCanal = canalAtivos.map((canal) => {
      const orcamento = config.canais[canal as keyof typeof config.canais].orcamento;
      const impressoes = Math.floor(orcamento / 0.05);
      const cliques = Math.floor(impressoes * 0.03);
      const conversoes = Math.floor(cliques * 0.05);
      const receita = conversoes * 150;
      const roi = ((receita - orcamento) / orcamento) * 100;

      return {
        canal: canal.charAt(0).toUpperCase() + canal.slice(1),
        impressoes,
        cliques,
        conversoes,
        custo: orcamento,
        receita,
        roi,
      };
    });

    const totalConversoes = resultadosPorCanal.reduce((sum, r) => sum + r.conversoes, 0);
    const totalReceita = resultadosPorCanal.reduce((sum, r) => sum + r.receita, 0);
    const totalCusto = resultadosPorCanal.reduce((sum, r) => sum + r.custo, 0);

    setResultados({
      statusSimulacao: "concluida",
      progresso: 100,
      metricas: {
        conversoes: totalConversoes,
        receita: totalReceita,
        roi: ((totalReceita - totalCusto) / totalCusto) * 100,
        custoPorAquisicao: totalCusto / totalConversoes,
        taxaConversao: (totalConversoes / (config.totalAgentes * 0.1)) * 100,
      },
      resultadosPorCanal,
      tempoExecucao: 45,
    });

    toast.success("Simulação concluída com sucesso!");
    setAbaPrincipal("resultados");
  };

  const handlePausarSimulacao = () => {
    setResultados((prev) => ({ ...prev, statusSimulacao: "nao_iniciada" }));
    toast.info("Simulação pausada");
  };

  const handleResetarSimulacao = () => {
    setResultados({
      statusSimulacao: "nao_iniciada",
      progresso: 0,
      metricas: {
        conversoes: 0,
        receita: 0,
        roi: 0,
        custoPorAquisicao: 0,
        taxaConversao: 0,
      },
      resultadosPorCanal: [],
      tempoExecucao: 0,
    });
    setAbaPrincipal("configuracao");
    toast.info("Simulação resetada");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Simulador ABM</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Simule campanhas de marketing com Modelagem Baseada em Agentes
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {resultados.statusSimulacao === "rodando" ? (
                  <Button
                    onClick={handlePausarSimulacao}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                ) : (
                  <Button
                    onClick={handleIniciarSimulacao}
                    disabled={resultados.statusSimulacao === "rodando"}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {resultados.statusSimulacao === "nao_iniciada" ? "Iniciar Simulação" : "Reiniciar"}
                  </Button>
                )}
                {resultados.statusSimulacao !== "nao_iniciada" && (
                  <Button
                    onClick={handleResetarSimulacao}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resetar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Principais */}
          <Tabs
            value={abaPrincipal}
            onValueChange={(v) => setAbaPrincipal(v as "configuracao" | "resultados")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-800">
              <TabsTrigger value="configuracao" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Configuração
              </TabsTrigger>
              <TabsTrigger value="resultados" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Resultados
              </TabsTrigger>
            </TabsList>

            {/* TAB: CONFIGURAÇÃO */}
            <TabsContent value="configuracao" className="space-y-6">
              <Tabs
                value={abaConfiguracao}
                onValueChange={(v) => setAbaConfiguracao(v as "segmentos" | "canais")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-800">
                  <TabsTrigger value="segmentos" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Segmentos
                  </TabsTrigger>
                  <TabsTrigger value="canais" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Canais & Orçamento
                  </TabsTrigger>
                </TabsList>

                {/* Sub-aba: Segmentos */}
                <TabsContent value="segmentos" className="space-y-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Definir Segmentos Sintéticos
                    </h3>

                    <div className="space-y-6">
                      {/* Total de Agentes */}
                      <div>
                        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                          Total de Agentes Sintéticos
                        </label>
                        <input
                          type="range"
                          min="1000"
                          max="100000"
                          step="1000"
                          value={config.totalAgentes}
                          onChange={(e) =>
                            setConfig({ ...config, totalAgentes: parseInt(e.target.value) })
                          }
                          className="w-full"
                        />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                          {config.totalAgentes.toLocaleString()} agentes
                        </p>
                      </div>

                      {/* Faixa Etária */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                            Idade Mínima
                          </label>
                          <input
                            type="number"
                            min="13"
                            max="100"
                            value={config.idadeMin}
                            onChange={(e) =>
                              setConfig({ ...config, idadeMin: parseInt(e.target.value) })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                            Idade Máxima
                          </label>
                          <input
                            type="number"
                            min="13"
                            max="100"
                            value={config.idadeMax}
                            onChange={(e) =>
                              setConfig({ ...config, idadeMax: parseInt(e.target.value) })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Distribuição de Gênero */}
                      <div>
                        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-4 block">
                          Distribuição de Gênero
                        </label>
                        <div className="space-y-3">
                          {Object.entries(config.generoDistribuicao).map(([genero, percentual]) => (
                            <div key={genero}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                  {genero}
                                </span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                  {percentual}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={percentual}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    generoDistribuicao: {
                                      ...config.generoDistribuicao,
                                      [genero]: parseInt(e.target.value),
                                    },
                                  })
                                }
                                className="w-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Regiões */}
                      <div>
                        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                          Regiões Selecionadas
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["SP", "RJ", "MG", "BA", "RS", "PE"].map((regiao) => (
                            <Button
                              key={regiao}
                              onClick={() => {
                                if (config.regioes.includes(regiao)) {
                                  setConfig({
                                    ...config,
                                    regioes: config.regioes.filter((r) => r !== regiao),
                                  });
                                } else {
                                  setConfig({
                                    ...config,
                                    regioes: [...config.regioes, regiao],
                                  });
                                }
                              }}
                              variant={config.regioes.includes(regiao) ? "default" : "outline"}
                              className={
                                config.regioes.includes(regiao)
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                                  : "border-gray-300 dark:border-gray-700"
                              }
                            >
                              {regiao}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Sub-aba: Canais & Orçamento */}
                <TabsContent value="canais" className="space-y-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      Configurar Canais de Mídia
                    </h3>

                    <div className="space-y-6">
                      {/* Email */}
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-900 dark:text-white">Email</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={config.canais.email.ativo}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                canais: {
                                  ...config.canais,
                                  email: { ...config.canais.email, ativo: e.target.checked },
                                },
                              })
                            }
                            className="w-5 h-5"
                          />
                        </div>
                        {config.canais.email.ativo && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold block mb-2">
                                Orçamento (R$)
                              </label>
                              <input
                                type="number"
                                value={config.canais.email.orcamento}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    canais: {
                                      ...config.canais,
                                      email: {
                                        ...config.canais.email,
                                        orcamento: parseInt(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold block mb-2">
                                CPC (R$)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.canais.email.cpc}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    canais: {
                                      ...config.canais,
                                      email: {
                                        ...config.canais.email,
                                        cpc: parseFloat(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Instagram */}
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Instagram className="w-5 h-5 text-pink-600" />
                            <span className="font-semibold text-gray-900 dark:text-white">Instagram</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={config.canais.instagram.ativo}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                canais: {
                                  ...config.canais,
                                  instagram: {
                                    ...config.canais.instagram,
                                    ativo: e.target.checked,
                                  },
                                },
                              })
                            }
                            className="w-5 h-5"
                          />
                        </div>
                        {config.canais.instagram.ativo && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold block mb-2">
                                Orçamento (R$)
                              </label>
                              <input
                                type="number"
                                value={config.canais.instagram.orcamento}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    canais: {
                                      ...config.canais,
                                      instagram: {
                                        ...config.canais.instagram,
                                        orcamento: parseInt(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold block mb-2">
                                CPM (R$)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.canais.instagram.cpm}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    canais: {
                                      ...config.canais,
                                      instagram: {
                                        ...config.canais.instagram,
                                        cpm: parseFloat(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Outdoor */}
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Megaphone className="w-5 h-5 text-orange-600" />
                            <span className="font-semibold text-gray-900 dark:text-white">Outdoor</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={config.canais.outdoor.ativo}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                canais: {
                                  ...config.canais,
                                  outdoor: { ...config.canais.outdoor, ativo: e.target.checked },
                                },
                              })
                            }
                            className="w-5 h-5"
                          />
                        </div>
                        {config.canais.outdoor.ativo && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold block mb-2">
                                Orçamento (R$)
                              </label>
                              <input
                                type="number"
                                value={config.canais.outdoor.orcamento}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    canais: {
                                      ...config.canais,
                                      outdoor: {
                                        ...config.canais.outdoor,
                                        orcamento: parseInt(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold block mb-2">
                                CPM (R$)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.canais.outdoor.cpm}
                                onChange={(e) =>
                                  setConfig({
                                    ...config,
                                    canais: {
                                      ...config.canais,
                                      outdoor: {
                                        ...config.canais.outdoor,
                                        cpm: parseFloat(e.target.value),
                                      },
                                    },
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Orçamento Total */}
                      <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-indigo-600" />
                            <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                              Orçamento Total
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            R$ {config.orcamentoTotal.toLocaleString("pt-BR")}
                          </span>
                        </div>
                      </Card>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* TAB: RESULTADOS */}
            <TabsContent value="resultados" className="space-y-6">
              {resultados.statusSimulacao === "nao_iniciada" ? (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Nenhuma simulação executada
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Configure os parâmetros e clique em "Iniciar Simulação" para ver os resultados
                  </p>
                </Card>
              ) : resultados.statusSimulacao === "rodando" ? (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
                  <Loader2 className="w-16 h-16 text-indigo-500 mx-auto mb-4 animate-spin" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Simulação em andamento...
                  </h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-4">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${resultados.progresso}%` }}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    {resultados.progresso}% concluído
                  </p>
                </Card>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Conversões</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {resultados.metricas.conversoes}
                          </p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receita</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            R$ {(resultados.metricas.receita / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
                          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                            +{resultados.metricas.roi.toFixed(1)}%
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">CPA</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            R$ {resultados.metricas.custoPorAquisicao.toFixed(2)}
                          </p>
                        </div>
                        <Percent className="w-8 h-8 text-orange-500 opacity-20" />
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Taxa Conversão</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {resultados.metricas.taxaConversao.toFixed(2)}%
                          </p>
                        </div>
                        <Zap className="w-8 h-8 text-orange-500 opacity-20" />
                      </div>
                    </Card>
                  </div>

                  {/* Resultados por Canal */}
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Performance por Canal
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Canal
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Impressões
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Cliques
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Conversões
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Custo
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Receita
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              ROI
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultados.resultadosPorCanal.map((canal) => (
                            <tr
                              key={canal.canal}
                              className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                {canal.canal}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {canal.impressoes.toLocaleString()}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {canal.cliques.toLocaleString()}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {canal.conversoes}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {canal.custo.toLocaleString("pt-BR")}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {canal.receita.toLocaleString("pt-BR")}
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-green-600 dark:text-green-400">
                                +{canal.roi.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-700"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

