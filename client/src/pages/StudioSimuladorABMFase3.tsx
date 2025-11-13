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
  Users,
  Zap,
  DollarSign,
  TrendingUp,
  Settings,
  Eye,
  Download,
  Share2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Brain,
  Sparkles,
  Copy,
  Trash2,
  Plus,
  ArrowRight,
  Percent,
  Target,
  Maximize2,
  Lock,
  Unlock,
  CreditCard,
  Flame,
} from "lucide-react";

interface Cenario {
  id: string;
  nome: string;
  descricao: string;
  orcamentoTotal: number;
  agentes: number;
  conversoes: number;
  receita: number;
  roi: number;
  sentimento: number;
  engajamento: number;
  dataCriacao: string;
}

interface PlanoMoneticacao {
  nome: string;
  preco: number;
  simulacoesPermitidas: number;
  agentesMaximos: number;
  recursosPremium: string[];
  ativo: boolean;
}

interface ResultadosFase3 {
  cenarios: Cenario[];
  vencedorABTest: Cenario | null;
  planoAtual: PlanoMoneticacao;
  planosDisponiveis: PlanoMoneticacao[];
  metricas: {
    simulacoesRealizadas: number;
    receita: number;
    roi: number;
    custoPorSimulacao: number;
  };
}

export default function StudioSimuladorABMFase3() {
  const [abaPrincipal, setAbaPrincipal] = useState<"abtest" | "cenarios" | "monetizacao">("abtest");
  const [resultados, setResultados] = useState<ResultadosFase3>({
    cenarios: [
      {
        id: "1",
        nome: "Cenário Base",
        descricao: "Configuração padrão com todos os canais",
        orcamentoTotal: 16000,
        agentes: 10000,
        conversoes: 1570,
        receita: 235500,
        roi: 1371,
        sentimento: 0.85,
        engajamento: 0.80,
        dataCriacao: "2024-11-12",
      },
      {
        id: "2",
        nome: "Cenário Agressivo",
        descricao: "Foco em Instagram com orçamento aumentado",
        orcamentoTotal: 25000,
        agentes: 15000,
        conversoes: 2850,
        receita: 427500,
        roi: 1610,
        sentimento: 0.88,
        engajamento: 0.83,
        dataCriacao: "2024-11-12",
      },
      {
        id: "3",
        nome: "Cenário Conservador",
        descricao: "Apenas Email e Outdoor com orçamento reduzido",
        orcamentoTotal: 8000,
        agentes: 5000,
        conversoes: 620,
        receita: 93000,
        roi: 1062,
        sentimento: 0.82,
        engajamento: 0.78,
        dataCriacao: "2024-11-12",
      },
    ],
    vencedorABTest: null,
    planoAtual: {
      nome: "Starter",
      preco: 99,
      simulacoesPermitidas: 10,
      agentesMaximos: 10000,
      recursosPremium: [],
      ativo: true,
    },
    planosDisponiveis: [
      {
        nome: "Starter",
        preco: 99,
        simulacoesPermitidas: 10,
        agentesMaximos: 10000,
        recursosPremium: ["Simulação básica", "Até 10k agentes"],
        ativo: true,
      },
      {
        nome: "Professional",
        preco: 299,
        simulacoesPermitidas: 50,
        agentesMaximos: 100000,
        recursosPremium: [
          "Simulação com LLM",
          "Até 100k agentes",
          "A/B Testing",
          "Análise de cenários",
        ],
        ativo: false,
      },
      {
        nome: "Enterprise",
        preco: 999,
        simulacoesPermitidas: 500,
        agentesMaximos: 1000000,
        recursosPremium: [
          "Tudo do Professional",
          "Até 1M agentes",
          "API acesso",
          "Suporte prioritário",
          "Integração customizada",
        ],
        ativo: false,
      },
    ],
    metricas: {
      simulacoesRealizadas: 8,
      receita: 1800000,
      roi: 1347,
      custoPorSimulacao: 99,
    },
  });

  const [novoNomeCenario, setNovoNomeCenario] = useState("");
  const [showNovosCenarios, setShowNovosCenarios] = useState(false);

  const handleExecutarABTest = () => {
    toast.success("A/B Test iniciado! Comparando cenários...");
    setTimeout(() => {
      const vencedor = resultados.cenarios.reduce((prev, current) =>
        current.roi > prev.roi ? current : prev
      );
      setResultados((prev) => ({ ...prev, vencedorABTest: vencedor }));
      toast.success(`Vencedor: ${vencedor.nome} com ROI de +${vencedor.roi}%`);
    }, 2000);
  };

  const handleDuplicarCenario = (cenario: Cenario) => {
    const novoCenario: Cenario = {
      ...cenario,
      id: Math.random().toString(),
      nome: `${cenario.nome} (Cópia)`,
      dataCriacao: new Date().toISOString().split("T")[0],
    };
    setResultados((prev) => ({
      ...prev,
      cenarios: [...prev.cenarios, novoCenario],
    }));
    toast.success("Cenário duplicado com sucesso!");
  };

  const handleDeletarCenario = (id: string) => {
    setResultados((prev) => ({
      ...prev,
      cenarios: prev.cenarios.filter((c) => c.id !== id),
    }));
    toast.success("Cenário deletado!");
  };

  const handleUpgradePlano = (plano: PlanoMoneticacao) => {
    setResultados((prev) => ({
      ...prev,
      planoAtual: plano,
      planosDisponiveis: prev.planosDisponiveis.map((p) => ({
        ...p,
        ativo: p.nome === plano.nome,
      })),
    }));
    toast.success(`Plano atualizado para ${plano.nome}!`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Simulador ABM - Fase 3
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Otimização, A/B Testing e Monetização
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleExecutarABTest}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Executar A/B Test
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Principais */}
          <Tabs
            value={abaPrincipal}
            onValueChange={(v) => setAbaPrincipal(v as "abtest" | "cenarios" | "monetizacao")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-200 dark:bg-gray-800">
              <TabsTrigger value="abtest" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Flame className="w-4 h-4 mr-2" />
                A/B Test
              </TabsTrigger>
              <TabsTrigger value="cenarios" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <Target className="w-4 h-4 mr-2" />
                Cenários
              </TabsTrigger>
              <TabsTrigger value="monetizacao" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                <CreditCard className="w-4 h-4 mr-2" />
                Planos
              </TabsTrigger>
            </TabsList>

            {/* TAB: A/B TEST */}
            <TabsContent value="abtest" className="space-y-6">
              {resultados.vencedorABTest ? (
                <>
                  {/* Resultado do Vencedor */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                        <div>
                          <h3 className="text-2xl font-bold text-green-900 dark:text-green-300">
                            Vencedor: {resultados.vencedorABTest.nome}
                          </h3>
                          <p className="text-green-700 dark:text-green-400 mt-1">
                            {resultados.vencedorABTest.descricao}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-700 dark:text-green-400">ROI Máximo</p>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-300">
                          +{resultados.vencedorABTest.roi}%
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Comparação de Cenários */}
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Comparação de Cenários
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Cenário
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Orçamento
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Conversões
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Receita
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              ROI
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Sentimento
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultados.cenarios.map((cenario) => (
                            <tr
                              key={cenario.id}
                              className={`border-b border-gray-200 dark:border-gray-800 ${
                                resultados.vencedorABTest?.id === cenario.id
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                              }`}
                            >
                              <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                {cenario.nome}
                                {resultados.vencedorABTest?.id === cenario.id && (
                                  <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    Vencedor
                                  </Badge>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {cenario.orcamentoTotal.toLocaleString("pt-BR")}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {cenario.conversoes}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {(cenario.receita / 1000).toFixed(1)}k
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-green-600 dark:text-green-400">
                                +{cenario.roi}%
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {(cenario.sentimento * 100).toFixed(0)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  {/* Insights */}
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 p-6">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-4">
                      💡 Insights do A/B Test
                    </h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                      <li>
                        • O cenário vencedor ({resultados.vencedorABTest.nome}) gerou{" "}
                        <strong>
                          {(
                            ((resultados.vencedorABTest.roi -
                              resultados.cenarios[0].roi) /
                              resultados.cenarios[0].roi) *
                            100
                          ).toFixed(0)}
                          %
                        </strong>{" "}
                        mais ROI que o cenário base
                      </li>
                      <li>
                        • Sentimento médio: <strong>{(resultados.vencedorABTest.sentimento * 100).toFixed(0)}%</strong> (excelente
                        engajamento)
                      </li>
                      <li>
                        • Recomendação: Implemente este cenário em produção para maximizar conversões
                      </li>
                    </ul>
                  </Card>
                </>
              ) : (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Nenhum A/B Test executado
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Clique em "Executar A/B Test" para comparar os cenários
                  </p>
                </Card>
              )}
            </TabsContent>

            {/* TAB: CENÁRIOS */}
            <TabsContent value="cenarios" className="space-y-6">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Cenários Salvos ({resultados.cenarios.length})
                  </h3>
                  <Button
                    onClick={() => setShowNovosCenarios(!showNovosCenarios)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Cenário
                  </Button>
                </div>

                {showNovosCenarios && (
                  <div className="mb-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg space-y-3">
                    <input
                      type="text"
                      placeholder="Nome do novo cenário"
                      value={novoNomeCenario}
                      onChange={(e) => setNovoNomeCenario(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          if (novoNomeCenario) {
                            const novoCenario: Cenario = {
                              id: Math.random().toString(),
                              nome: novoNomeCenario,
                              descricao: "Novo cenário personalizado",
                              orcamentoTotal: 16000,
                              agentes: 10000,
                              conversoes: 1570,
                              receita: 235500,
                              roi: 1371,
                              sentimento: 0.85,
                              engajamento: 0.80,
                              dataCriacao: new Date().toISOString().split("T")[0],
                            };
                            setResultados((prev) => ({
                              ...prev,
                              cenarios: [...prev.cenarios, novoCenario],
                            }));
                            setNovoNomeCenario("");
                            setShowNovosCenarios(false);
                            toast.success("Cenário criado!");
                          }
                        }}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      >
                        Criar
                      </Button>
                      <Button
                        onClick={() => setShowNovosCenarios(false)}
                        variant="outline"
                        className="flex-1 border-gray-300 dark:border-gray-700"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {resultados.cenarios.map((cenario) => (
                    <div
                      key={cenario.id}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {cenario.nome}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {cenario.descricao}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDuplicarCenario(cenario)}
                            variant="outline"
                            size="sm"
                            className="border-gray-300 dark:border-gray-700"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeletarCenario(cenario.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            Orçamento
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                            R$ {(cenario.orcamentoTotal / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            Conversões
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                            {cenario.conversoes}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            ROI
                          </p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                            +{cenario.roi}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                            Criado em
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                            {cenario.dataCriacao}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* TAB: MONETIZAÇÃO */}
            <TabsContent value="monetizacao" className="space-y-6">
              {/* Plano Atual */}
              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-900 dark:text-cyan-300">
                      Plano Atual: {resultados.planoAtual.nome}
                    </h3>
                    <p className="text-cyan-700 dark:text-cyan-400 mt-1">
                      {resultados.planoAtual.simulacoesPermitidas} simulações/mês • Até{" "}
                      {resultados.planoAtual.agentesMaximos.toLocaleString()} agentes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cyan-700 dark:text-cyan-400">Custo Mensal</p>
                    <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-300">
                      R$ {resultados.planoAtual.preco}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Planos Disponíveis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resultados.planosDisponiveis.map((plano) => (
                  <Card
                    key={plano.nome}
                    className={`border-2 p-6 transition-all ${
                      plano.ativo
                        ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {plano.nome}
                      </h4>
                      {plano.ativo && (
                        <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                          Ativo
                        </Badge>
                      )}
                    </div>

                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        R$ {plano.preco}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        por mês
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {plano.simulacoesPermitidas} simulações/mês
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Até {plano.agentesMaximos.toLocaleString()} agentes
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {plano.recursosPremium.map((recurso) => (
                        <div key={recurso} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {recurso}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleUpgradePlano(plano)}
                      disabled={plano.ativo}
                      className={`w-full ${
                        plano.ativo
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      }`}
                    >
                      {plano.ativo ? "Plano Atual" : "Fazer Upgrade"}
                    </Button>
                  </Card>
                ))}
              </div>

              {/* Métricas de Uso */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Métricas de Uso
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Simulações Realizadas</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {resultados.metricas.simulacoesRealizadas}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      de {resultados.planoAtual.simulacoesPermitidas} permitidas
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receita Gerada</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                      R$ {(resultados.metricas.receita / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ROI Médio</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      +{resultados.metricas.roi}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Custo/Simulação</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      R$ {resultados.metricas.custoPorSimulacao}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

