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
  Sparkles,
  Heart,
  Network,
  Smile,
  Frown,
  Meh,
  Percent,
  RefreshCw,
} from "lucide-react";

interface ConteudoGerado {
  id: string;
  titulo: string;
  descricao: string;
  sentimentoPrevisto: number; // 0-1
  engajamentoPrevisto: number; // 0-1
}

interface RespostaEmocional {
  entusiasmado: number;
  neutro: number;
  desinteressado: number;
}

interface ResultadosFase2 {
  statusSimulacao: "nao_iniciada" | "rodando" | "concluida" | "erro";
  progresso: number;
  conteudosGerados: ConteudoGerado[];
  respostasEmocionais: RespostaEmocional;
  influenciaRede: {
    alcanceOrganicoAumentado: number;
    conversoesPorInfluencia: number;
  };
  metricas: {
    conversoes: number;
    receita: number;
    roi: number;
    custoPorAquisicao: number;
    taxaConversao: number;
    sentimentoMedio: number;
    engajamentoMedio: number;
  };
  resultadosPorCanal: {
    canal: string;
    impressoes: number;
    cliques: number;
    conversoes: number;
    custo: number;
    receita: number;
    roi: number;
    sentimento: number;
    engajamento: number;
  }[];
}

export default function StudioSimuladorABMFase2() {
  const [abaPrincipal, setAbaPrincipal] = useState<"configuracao" | "resultados">("configuracao");
  const [abaConfiguracao, setAbaConfiguracao] = useState<"briefing" | "rede">("briefing");

  const [briefing, setBriefing] = useState(
    "Campanha de verão para produtos de moda. Foco em jovens adultos (18-35) que buscam estilo e qualidade. Mensagem: inovação, sustentabilidade e inclusão."
  );

  const [resultados, setResultados] = useState<ResultadosFase2>({
    statusSimulacao: "nao_iniciada",
    progresso: 0,
    conteudosGerados: [],
    respostasEmocionais: { entusiasmado: 0, neutro: 0, desinteressado: 0 },
    influenciaRede: { alcanceOrganicoAumentado: 0, conversoesPorInfluencia: 0 },
    metricas: {
      conversoes: 0,
      receita: 0,
      roi: 0,
      custoPorAquisicao: 0,
      taxaConversao: 0,
      sentimentoMedio: 0,
      engajamentoMedio: 0,
    },
    resultadosPorCanal: [],
    tempoExecucao: 0,
  });

  const handleGerarConteudo = async () => {
    setResultados((prev) => ({ ...prev, statusSimulacao: "rodando", progresso: 0 }));

    // Simular geração de conteúdo com LLM
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const conteudosGerados: ConteudoGerado[] = [
      {
        id: "1",
        titulo: "Verão com Estilo Sustentável",
        descricao:
          "Descubra nossa coleção de verão feita com materiais eco-friendly. Conforto, qualidade e consciência ambiental em cada peça.",
        sentimentoPrevisto: 0.85,
        engajamentoPrevisto: 0.78,
      },
      {
        id: "2",
        titulo: "Moda Inclusiva para Todos",
        descricao:
          "Celebramos a diversidade com tamanhos e estilos para todos os corpos. Sua beleza merece ser celebrada.",
        sentimentoPrevisto: 0.9,
        engajamentoPrevisto: 0.82,
      },
      {
        id: "3",
        titulo: "Inovação em Cada Detalhe",
        descricao:
          "Tecnologia e design se encontram em nossas peças. Conforto inteligente para o seu dia a dia.",
        sentimentoPrevisto: 0.8,
        engajamentoPrevisto: 0.75,
      },
    ];

    setResultados((prev) => ({
      ...prev,
      progresso: 40,
      conteudosGerados,
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular análise de resposta emocional
    const respostasEmocionais: RespostaEmocional = {
      entusiasmado: 52,
      neutro: 35,
      desinteressado: 13,
    };

    setResultados((prev) => ({
      ...prev,
      progresso: 70,
      respostasEmocionais,
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular influência de rede social
    const influenciaRede = {
      alcanceOrganicoAumentado: 45000,
      conversoesPorInfluencia: 320,
    };

    setResultados((prev) => ({
      ...prev,
      progresso: 100,
      influenciaRede,
    }));

    // Calcular métricas finais
    const conversoes = 1250 + influenciaRede.conversoesPorInfluencia;
    const receita = conversoes * 150;
    const custo = 16000;
    const roi = ((receita - custo) / custo) * 100;

    const resultadosPorCanal = [
      {
        canal: "Email",
        impressoes: 100000,
        cliques: 3000,
        conversoes: 450,
        custo: 5000,
        receita: 67500,
        roi: 1250,
        sentimento: 0.85,
        engajamento: 0.78,
      },
      {
        canal: "Instagram",
        impressoes: 160000,
        cliques: 4800,
        conversoes: 720,
        custo: 8000,
        receita: 108000,
        roi: 1250,
        sentimento: 0.9,
        engajamento: 0.82,
      },
      {
        canal: "Influenciadores",
        impressoes: 45000,
        cliques: 2700,
        conversoes: 320,
        custo: 3000,
        receita: 48000,
        roi: 1500,
        sentimento: 0.92,
        engajamento: 0.88,
      },
    ];

    const sentimentoMedio =
      conteudosGerados.reduce((sum, c) => sum + c.sentimentoPrevisto, 0) /
      conteudosGerados.length;
    const engajamentoMedio =
      conteudosGerados.reduce((sum, c) => sum + c.engajamentoPrevisto, 0) /
      conteudosGerados.length;

    setResultados({
      statusSimulacao: "concluida",
      progresso: 100,
      conteudosGerados,
      respostasEmocionais,
      influenciaRede,
      metricas: {
        conversoes,
        receita,
        roi,
        custoPorAquisicao: custo / conversoes,
        taxaConversao: (conversoes / 12500) * 100,
        sentimentoMedio,
        engajamentoMedio,
      },
      resultadosPorCanal,
      tempoExecucao: 45,
    });

    toast.success("Simulação com LLM concluída com sucesso!");
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
      conteudosGerados: [],
      respostasEmocionais: { entusiasmado: 0, neutro: 0, desinteressado: 0 },
      influenciaRede: { alcanceOrganicoAumentado: 0, conversoesPorInfluencia: 0 },
      metricas: {
        conversoes: 0,
        receita: 0,
        roi: 0,
        custoPorAquisicao: 0,
        taxaConversao: 0,
        sentimentoMedio: 0,
        engajamentoMedio: 0,
      },
      resultadosPorCanal: [],
      tempoExecucao: 0,
    });
    setAbaPrincipal("configuracao");
    toast.info("Simulação resetada");
  };

  const getSentimentoIcon = (valor: number) => {
    if (valor > 0.7) return <Smile className="w-5 h-5 text-green-600" />;
    if (valor > 0.4) return <Meh className="w-5 h-5 text-yellow-600" />;
    return <Frown className="w-5 h-5 text-red-600" />;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Simulador ABM - Fase 2
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Com Inteligência Artificial e Modelagem de Rede Social
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
                    onClick={handleGerarConteudo}
                    disabled={resultados.statusSimulacao === "rodando"}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {resultados.statusSimulacao === "nao_iniciada"
                      ? "Gerar com IA"
                      : "Regenerar"}
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
              <TabsTrigger value="configuracao" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Briefing & IA
              </TabsTrigger>
              <TabsTrigger value="resultados" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Resultados
              </TabsTrigger>
            </TabsList>

            {/* TAB: CONFIGURAÇÃO */}
            <TabsContent value="configuracao" className="space-y-6">
              <Tabs
                value={abaConfiguracao}
                onValueChange={(v) => setAbaConfiguracao(v as "briefing" | "rede")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-800">
                  <TabsTrigger value="briefing" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
                    <Brain className="w-4 h-4 mr-2" />
                    Briefing IA
                  </TabsTrigger>
                  <TabsTrigger value="rede" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
                    <Network className="w-4 h-4 mr-2" />
                    Rede Social
                  </TabsTrigger>
                </TabsList>

                {/* Sub-aba: Briefing */}
                <TabsContent value="briefing" className="space-y-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-pink-600" />
                      Briefing para Geração de Conteúdo
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                          Descreva sua campanha (para a IA gerar conteúdo otimizado)
                        </label>
                        <textarea
                          value={briefing}
                          onChange={(e) => setBriefing(e.target.value)}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Descreva os objetivos, público-alvo, tom de voz, valores da marca..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                            Número de Variações
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            defaultValue="3"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                            Modelo LLM
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <option>GPT-4.1-mini</option>
                            <option>Gemini-2.5-flash</option>
                            <option>Claude-3.5-sonnet</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
                        <p className="text-sm text-pink-700 dark:text-pink-300">
                          💡 A IA analisará seu briefing e gerará conteúdos otimizados com análise de sentimento
                          e engajamento previsto para cada variação.
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Sub-aba: Rede Social */}
                <TabsContent value="rede" className="space-y-6">
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Network className="w-5 h-5 text-pink-600" />
                      Configuração de Rede Social
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                          Densidade da Rede (Influência Social)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="65"
                          className="w-full"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Quanto maior, mais influência social na propagação de conteúdo
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                          Tipo de Influenciadores
                        </label>
                        <div className="space-y-2">
                          {[
                            { label: "Macro (100k+ seguidores)", value: "macro" },
                            { label: "Micro (10k-100k seguidores)", value: "micro" },
                            { label: "Nano (1k-10k seguidores)", value: "nano" },
                          ].map((tipo) => (
                            <label key={tipo.value} className="flex items-center gap-3 cursor-pointer">
                              <input type="checkbox" defaultChecked className="w-4 h-4" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {tipo.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
                        <p className="text-sm text-pink-700 dark:text-pink-300">
                          🌐 A rede social será modelada com grafos para simular propagação orgânica de
                          conteúdo através de influenciadores e conexões entre agentes.
                        </p>
                      </div>
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
                    Configure o briefing e clique em "Gerar com IA" para ver os resultados
                  </p>
                </Card>
              ) : resultados.statusSimulacao === "rodando" ? (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
                  <Loader2 className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-spin" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Gerando conteúdo com IA...
                  </h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-4">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all"
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Sentimento Médio</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {(resultados.metricas.sentimentoMedio * 100).toFixed(0)}%
                          </p>
                        </div>
                        {getSentimentoIcon(resultados.metricas.sentimentoMedio)}
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Engajamento Médio</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {(resultados.metricas.engajamentoMedio * 100).toFixed(0)}%
                          </p>
                        </div>
                        <Heart className="w-8 h-8 text-red-500 opacity-20" />
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Alcance Orgânico</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {(resultados.influenciaRede.alcanceOrganicoAumentado / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <Network className="w-8 h-8 text-purple-500 opacity-20" />
                      </div>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ROI com IA</p>
                          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                            +{resultados.metricas.roi.toFixed(0)}%
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
                      </div>
                    </Card>
                  </div>

                  {/* Conteúdos Gerados */}
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Conteúdos Gerados pela IA
                    </h3>
                    <div className="space-y-4">
                      {resultados.conteudosGerados.map((conteudo) => (
                        <div
                          key={conteudo.id}
                          className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 dark:text-white">
                                {conteudo.titulo}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {conteudo.descricao}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Sentimento:</span>
                              <div className="flex items-center gap-1">
                                {getSentimentoIcon(conteudo.sentimentoPrevisto)}
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                  {(conteudo.sentimentoPrevisto * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Engajamento:</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {(conteudo.engajamentoPrevisto * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Respostas Emocionais */}
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Distribuição de Respostas Emocionais
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <Smile className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Entusiasmado</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {resultados.respostasEmocionais.entusiasmado}%
                        </p>
                      </div>
                      <div className="text-center">
                        <Meh className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Neutro</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {resultados.respostasEmocionais.neutro}%
                        </p>
                      </div>
                      <div className="text-center">
                        <Frown className="w-12 h-12 text-red-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Desinteressado</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {resultados.respostasEmocionais.desinteressado}%
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Performance por Canal */}
                  <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Performance por Canal (com IA)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Canal
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
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                              Engajamento
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultados.resultadosPorCanal.map((canal) => (
                            <tr
                              key={canal.canal}
                              className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                              <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                {canal.canal}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {canal.conversoes}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {(canal.receita / 1000).toFixed(1)}k
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-green-600 dark:text-green-400">
                                +{canal.roi.toFixed(0)}%
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {getSentimentoIcon(canal.sentimento)}
                                  <span className="text-sm font-bold">
                                    {(canal.sentimento * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                                {(canal.engajamento * 100).toFixed(0)}%
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
                      Exportar Relatório
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

