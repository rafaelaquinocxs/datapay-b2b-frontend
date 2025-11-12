import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import {
  Play,
  BarChart3,
  TrendingUp,
  Settings,
  Download,
  Share2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Brain,
  Zap,
  Target,
  Plus,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Percent,
  LineChart,
  Activity,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";

interface ValidacaoCampanha {
  id: string;
  nome: string;
  dataCampanha: string;
  previsto: {
    conversoes: number;
    receita: number;
    roi: number;
    cpa: number;
  };
  real: {
    conversoes: number;
    receita: number;
    roi: number;
    cpa: number;
  };
  erro: {
    conversoes: number;
    receita: number;
    roi: number;
    cpa: number;
  };
  mape: number; // Mean Absolute Percentage Error
  precisao: number; // 0-100%
  status: "excelente" | "bom" | "aceitavel" | "ruim";
}

interface EvolutaoPrecisao {
  data: string;
  precisao: number;
  mape: number;
  campanhasValidadas: number;
}

interface ResultadosFase4 {
  validacoes: ValidacaoCampanha[];
  evolucaoPrecisao: EvolutaoPrecisao[];
  metricas: {
    precisaoMedia: number;
    mapeMedia: number;
    campanhasValidadas: number;
    melhoriaMedia: number;
  };
  modeloStatus: {
    versao: string;
    ultimoTreinamento: string;
    precisaoAtual: number;
    proximoTreinamento: string;
  };
}

export default function StudioSimuladorABMFase4() {
  const [abaAtiva, setAbaAtiva] = useState<"validacoes" | "evolucao" | "modelo">("validacoes");

  const [resultados, setResultados] = useState<ResultadosFase4>({
    validacoes: [
      {
        id: "1",
        nome: "Campanha Verão 2024",
        dataCampanha: "2024-11-01",
        previsto: {
          conversoes: 1570,
          receita: 235500,
          roi: 1371,
          cpa: 10.19,
        },
        real: {
          conversoes: 1520,
          receita: 228000,
          roi: 1325,
          cpa: 10.53,
        },
        erro: {
          conversoes: -50,
          receita: -7500,
          roi: -46,
          cpa: 0.34,
        },
        mape: 3.2,
        precisao: 96.8,
        status: "excelente",
      },
      {
        id: "2",
        nome: "Black Friday 2024",
        dataCampanha: "2024-10-15",
        previsto: {
          conversoes: 2850,
          receita: 427500,
          roi: 1610,
          cpa: 5.61,
        },
        real: {
          conversoes: 2920,
          receita: 438000,
          roi: 1650,
          cpa: 5.48,
        },
        erro: {
          conversoes: 70,
          receita: 10500,
          roi: 40,
          cpa: -0.13,
        },
        mape: 2.5,
        precisao: 97.5,
        status: "excelente",
      },
      {
        id: "3",
        nome: "Lançamento Produto X",
        dataCampanha: "2024-09-20",
        previsto: {
          conversoes: 890,
          receita: 133500,
          roi: 834,
          cpa: 17.98,
        },
        real: {
          conversoes: 750,
          receita: 112500,
          roi: 703,
          cpa: 21.33,
        },
        erro: {
          conversoes: -140,
          receita: -21000,
          roi: -131,
          cpa: 3.35,
        },
        mape: 15.7,
        precisao: 84.3,
        status: "aceitavel",
      },
    ],
    evolucaoPrecisao: [
      { data: "2024-09-20", precisao: 84.3, mape: 15.7, campanhasValidadas: 1 },
      { data: "2024-10-15", precisao: 91.1, mape: 8.9, campanhasValidadas: 2 },
      { data: "2024-11-01", precisao: 94.9, mape: 5.1, campanhasValidadas: 3 },
    ],
    metricas: {
      precisaoMedia: 92.9,
      mapeMedia: 7.1,
      campanhasValidadas: 3,
      melhoriaMedia: 10.6,
    },
    modeloStatus: {
      versao: "v2.1-fine-tuned",
      ultimoTreinamento: "2024-11-01",
      precisaoAtual: 94.9,
      proximoTreinamento: "2024-11-15",
    },
  });

  const [novaValidacao, setNovaValidacao] = useState({
    nome: "",
    conversoes: "",
    receita: "",
    roi: "",
    cpa: "",
  });

  const [showNovaValidacao, setShowNovaValidacao] = useState(false);

  const handleAdicionarValidacao = () => {
    if (novaValidacao.nome && novaValidacao.conversoes) {
      const conversoes = parseInt(novaValidacao.conversoes);
      const receita = parseFloat(novaValidacao.receita);
      const roi = parseFloat(novaValidacao.roi);
      const cpa = parseFloat(novaValidacao.cpa);

      // Simular previsão anterior (pega a última)
      const ultimaValidacao = resultados.validacoes[0];
      const erro = {
        conversoes: conversoes - ultimaValidacao.previsto.conversoes,
        receita: receita - ultimaValidacao.previsto.receita,
        roi: roi - ultimaValidacao.previsto.roi,
        cpa: cpa - ultimaValidacao.previsto.cpa,
      };

      const mape =
        Math.abs(erro.conversoes / ultimaValidacao.previsto.conversoes) * 100;
      const precisao = Math.max(0, 100 - mape);

      const novaVal: ValidacaoCampanha = {
        id: Math.random().toString(),
        nome: novaValidacao.nome,
        dataCampanha: new Date().toISOString().split("T")[0],
        previsto: ultimaValidacao.previsto,
        real: { conversoes, receita, roi, cpa },
        erro,
        mape,
        precisao,
        status:
          precisao > 95
            ? "excelente"
            : precisao > 90
              ? "bom"
              : precisao > 85
                ? "aceitavel"
                : "ruim",
      };

      setResultados((prev) => ({
        ...prev,
        validacoes: [novaVal, ...prev.validacoes],
      }));

      // Simular fine-tuning
      toast.loading("Fine-tuning do modelo em progresso...");
      setTimeout(() => {
        setResultados((prev) => ({
          ...prev,
          metricas: {
            precisaoMedia: (prev.metricas.precisaoMedia + novaVal.precisao) / 2,
            mapeMedia: (prev.metricas.mapeMedia + novaVal.mape) / 2,
            campanhasValidadas: prev.metricas.campanhasValidadas + 1,
            melhoriaMedia:
              (prev.metricas.melhoriaMedia +
                (novaVal.precisao - prev.metricas.precisaoMedia)) /
              2,
          },
          modeloStatus: {
            ...prev.modeloStatus,
            versao: `v${parseFloat(prev.modeloStatus.versao.split("v")[1]) + 0.1}-fine-tuned`,
            ultimoTreinamento: new Date().toISOString().split("T")[0],
            precisaoAtual: novaVal.precisao,
          },
        }));
        toast.success("Modelo atualizado com sucesso!");
      }, 2000);

      setNovaValidacao({ nome: "", conversoes: "", receita: "", roi: "", cpa: "" });
      setShowNovaValidacao(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excelente":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "bom":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "aceitavel":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "ruim":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excelente":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "bom":
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case "aceitavel":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "ruim":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
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
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Simulador ABM - Fase 4
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Validação & Aprendizado Contínuo
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowNovaValidacao(!showNovaValidacao)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Validação
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Principais */}
          <Tabs
            value={abaAtiva}
            onValueChange={(v) => setAbaAtiva(v as "validacoes" | "evolucao" | "modelo")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-200 dark:bg-gray-800">
              <TabsTrigger value="validacoes" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Validações
              </TabsTrigger>
              <TabsTrigger value="evolucao" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                <LineChart className="w-4 h-4 mr-2" />
                Evolução
              </TabsTrigger>
              <TabsTrigger value="modelo" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                <Brain className="w-4 h-4 mr-2" />
                Modelo
              </TabsTrigger>
            </TabsList>

            {/* TAB: VALIDAÇÕES */}
            <TabsContent value="validacoes" className="space-y-6">
              {showNovaValidacao && (
                <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 p-6">
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-4">
                    Adicionar Resultado Real de Campanha
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome da campanha"
                      value={novaValidacao.nome}
                      onChange={(e) =>
                        setNovaValidacao({ ...novaValidacao, nome: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <input
                        type="number"
                        placeholder="Conversões"
                        value={novaValidacao.conversoes}
                        onChange={(e) =>
                          setNovaValidacao({
                            ...novaValidacao,
                            conversoes: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Receita"
                        value={novaValidacao.receita}
                        onChange={(e) =>
                          setNovaValidacao({
                            ...novaValidacao,
                            receita: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="ROI"
                        value={novaValidacao.roi}
                        onChange={(e) =>
                          setNovaValidacao({
                            ...novaValidacao,
                            roi: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="CPA"
                        value={novaValidacao.cpa}
                        onChange={(e) =>
                          setNovaValidacao({
                            ...novaValidacao,
                            cpa: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAdicionarValidacao}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                      >
                        Validar & Fine-Tune
                      </Button>
                      <Button
                        onClick={() => setShowNovaValidacao(false)}
                        variant="outline"
                        className="flex-1 border-gray-300 dark:border-gray-700"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Métricas Gerais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Precisão Média</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {resultados.metricas.precisaoMedia.toFixed(1)}%
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">MAPE Médio</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {resultados.metricas.mapeMedia.toFixed(1)}%
                      </p>
                    </div>
                    <Percent className="w-8 h-8 text-blue-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Campanhas Validadas</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {resultados.metricas.campanhasValidadas}
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Melhoria Média</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                        +{resultados.metricas.melhoriaMedia.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                </Card>
              </div>

              {/* Lista de Validações */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Histórico de Validações
                </h3>
                <div className="space-y-4">
                  {resultados.validacoes.map((validacao) => (
                    <div
                      key={validacao.id}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          {getStatusIcon(validacao.status)}
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              {validacao.nome}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {validacao.dataCampanha}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(validacao.status)}>
                          {validacao.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            Conversões
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {validacao.real.conversoes}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              (Prev: {validacao.previsto.conversoes})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {validacao.erro.conversoes < 0 ? (
                              <ArrowDown className="w-3 h-3 text-red-600" />
                            ) : (
                              <ArrowUp className="w-3 h-3 text-green-600" />
                            )}
                            <span
                              className={`text-xs font-bold ${
                                validacao.erro.conversoes < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {validacao.erro.conversoes > 0 ? "+" : ""}
                              {validacao.erro.conversoes}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            Receita
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              R$ {(validacao.real.receita / 1000).toFixed(1)}k
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              (Prev: {(validacao.previsto.receita / 1000).toFixed(1)}k)
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            ROI
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              +{validacao.real.roi}%
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              (Prev: +{validacao.previsto.roi}%)
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            MAPE
                          </p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                            {validacao.mape.toFixed(1)}%
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            Precisão
                          </p>
                          <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">
                            {validacao.precisao.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* TAB: EVOLUÇÃO */}
            <TabsContent value="evolucao" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Evolução de Precisão do Modelo
                </h3>

                {/* Gráfico Simulado */}
                <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-end justify-around">
                  {resultados.evolucaoPrecisao.map((ponto, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg transition-all hover:opacity-80"
                        style={{ width: "40px", height: `${ponto.precisao * 2}px` }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {ponto.data}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {ponto.precisao.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tabela de Evolução */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Data
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Precisão
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          MAPE
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Campanhas
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Melhoria
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.evolucaoPrecisao.map((ponto, idx) => {
                        const melhoriaAnterior =
                          idx > 0
                            ? ponto.precisao - resultados.evolucaoPrecisao[idx - 1].precisao
                            : 0;
                        return (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                              {ponto.data}
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-green-600 dark:text-green-400">
                              {ponto.precisao.toFixed(1)}%
                            </td>
                            <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                              {ponto.mape.toFixed(1)}%
                            </td>
                            <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                              {ponto.campanhasValidadas}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {melhoriaAnterior > 0 ? (
                                  <ArrowUp className="w-4 h-4 text-green-600" />
                                ) : melhoriaAnterior < 0 ? (
                                  <ArrowDown className="w-4 h-4 text-red-600" />
                                ) : null}
                                <span
                                  className={`font-bold ${
                                    melhoriaAnterior > 0
                                      ? "text-green-600"
                                      : melhoriaAnterior < 0
                                        ? "text-red-600"
                                        : "text-gray-600"
                                  }`}
                                >
                                  {melhoriaAnterior > 0 ? "+" : ""}
                                  {melhoriaAnterior.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Insights */}
                <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    📈 <strong>Tendência:</strong> Precisão aumentando consistentemente! Modelo
                    melhorou {(resultados.evolucaoPrecisao[resultados.evolucaoPrecisao.length - 1].precisao - resultados.evolucaoPrecisao[0].precisao).toFixed(1)}% desde o primeiro treinamento.
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* TAB: MODELO */}
            <TabsContent value="modelo" className="space-y-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800 p-6">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-6">
                  Status do Modelo de IA
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400">Versão Atual</p>
                      <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mt-1">
                        {resultados.modeloStatus.versao}
                      </p>
                    </div>
                    <Brain className="w-12 h-12 text-emerald-500 opacity-20" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Último Treinamento</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                        {resultados.modeloStatus.ultimoTreinamento}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Próximo Treinamento</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                        {resultados.modeloStatus.proximoTreinamento}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Precisão Atual</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                        style={{ width: `${resultados.modeloStatus.precisaoAtual}%` }}
                      />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-3">
                      {resultados.modeloStatus.precisaoAtual.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </Card>

              {/* Recomendações */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Recomendações de Otimização
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Precisão excelente (94.9%):</strong> Modelo está bem calibrado. Continue
                      validando campanhas para manter a qualidade.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Tendência positiva:</strong> Precisão aumentou 10.6% em média. Modelo
                      está aprendendo com cada validação.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Próximo passo:</strong> Adicionar mais validações de campanhas com
                      diferentes públicos e canais para melhorar generalização.
                    </span>
                  </li>
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

