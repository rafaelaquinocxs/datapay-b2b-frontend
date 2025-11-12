import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Search,
  Sparkles,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Trash2,
  Download,
  Eye,
  Plus,
  Zap,
  Users,
  Target,
  Brain,
  ChevronRight,
  X,
  Filter,
  ArrowRight,
} from "lucide-react";

interface Pesquisa {
  id: number;
  titulo: string;
  descricao: string;
  status: "rascunho" | "rodando" | "concluida" | "erro";
  progresso: number;
  dataCriacao: string;
  dataInicio?: string;
  dataFim?: string;
  respostas?: number;
  taxaResposta?: number;
}

interface Resultado {
  id: number;
  pesquisaId: number;
  titulo: string;
  respondentes: number;
  taxaResposta: number;
  insights: string[];
  dataConclusao: string;
}

const MENU_SUGESTOES = [
  { icon: "👥", label: "Perfil Demográfico", descricao: "Idade, gênero, localização" },
  { icon: "💰", label: "Comportamento de Compra", descricao: "Frequência, ticket médio, preferências" },
  { icon: "⭐", label: "Satisfação", descricao: "NPS, satisfação, recomendação" },
  { icon: "🎯", label: "Preferências de Produto", descricao: "Produtos favoritos, wishlist" },
  { icon: "📱", label: "Canais de Comunicação", descricao: "Email, SMS, push, redes sociais" },
  { icon: "🔄", label: "Retenção", descricao: "Churn, reativação, loyalty" },
  { icon: "💡", label: "Inovação", descricao: "Novos produtos, features" },
  { icon: "🌟", label: "Experiência", descricao: "Jornada do cliente, pain points" },
];

export default function PesquisasInteligentes() {
  const [abaAtiva, setAbaAtiva] = useState<"descoberta" | "pesquisas" | "analytics">("descoberta");
  const [busca, setBusca] = useState("");
  const [sugestoesVisivel, setSugestoesVisivel] = useState(false);
  const [pesquisasCriadas, setPesquisasCriadas] = useState<Pesquisa[]>([
    {
      id: 1,
      titulo: "Satisfação de Clientes Q4 2024",
      descricao: "Pesquisa de NPS e satisfação geral",
      status: "rodando",
      progresso: 65,
      dataCriacao: "2024-11-10",
      dataInicio: "2024-11-10",
      respostas: 1250,
      taxaResposta: 35,
    },
    {
      id: 2,
      titulo: "Preferências de Produto - Novo Lançamento",
      descricao: "Feedback sobre novo produto",
      status: "concluida",
      progresso: 100,
      dataCriacao: "2024-11-05",
      dataInicio: "2024-11-05",
      dataFim: "2024-11-09",
      respostas: 2840,
      taxaResposta: 48,
    },
  ]);
  const [resultados, setResultados] = useState<Resultado[]>([
    {
      id: 1,
      pesquisaId: 2,
      titulo: "Preferências de Produto - Novo Lançamento",
      respondentes: 2840,
      taxaResposta: 48,
      insights: [
        "78% dos clientes estão interessados no novo produto",
        "Preço ideal está entre R$ 199 e R$ 299",
        "Preferem comprar via e-commerce",
      ],
      dataConclusao: "2024-11-09",
    },
  ]);

  const pesquisasFiltradas = pesquisasCriadas.filter((p) =>
    p.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionarSugestao = (sugestao: typeof MENU_SUGESTOES[0]) => {
    setBusca((prev) => prev + (prev ? " + " : "") + sugestao.label);
    setSugestoesVisivel(false);
  };

  const handleCriarPesquisa = () => {
    if (!busca.trim()) {
      toast.error("Descreva o que deseja saber sobre seus clientes");
      return;
    }

    const novaPesquisa: Pesquisa = {
      id: Math.max(...pesquisasCriadas.map((p) => p.id), 0) + 1,
      titulo: busca,
      descricao: "Pesquisa criada via IA",
      status: "rascunho",
      progresso: 0,
      dataCriacao: new Date().toISOString().split("T")[0],
    };

    setPesquisasCriadas([...pesquisasCriadas, novaPesquisa]);
    toast.success("Pesquisa criada! Você pode disparar agora.");
    setBusca("");
    setSugestoesVisivel(false);
  };

  const handleDisparar = (id: number) => {
    setPesquisasCriadas(
      pesquisasCriadas.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "rodando",
              dataInicio: new Date().toISOString().split("T")[0],
              progresso: 10,
            }
          : p
      )
    );
    toast.success("Pesquisa disparada!");
  };

  const getStatusColor = (status: string) => {
    const cores: Record<string, string> = {
      rascunho: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      rodando: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      concluida: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      erro: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return cores[status] || "";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      rascunho: "Rascunho",
      rodando: "Rodando",
      concluida: "Concluída",
      erro: "Erro",
    };
    return labels[status] || status;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pesquisas Inteligentes</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Coordene pesquisas sobre seus clientes com IA</p>
              </div>
            </div>
          </div>

          {/* Abas */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
            {[
              { id: "descoberta", label: "Descoberta", icon: Sparkles },
              { id: "pesquisas", label: "Pesquisas", icon: Search },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map((aba) => {
              const Icon = aba.icon;
              const isActive = abaAtiva === aba.id;
              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaAtiva(aba.id as any)}
                  className={`px-6 py-4 font-medium flex items-center gap-2 transition-all border-b-2 ${
                    isActive
                      ? "border-purple-500 text-purple-600 dark:text-purple-400"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {aba.label}
                </button>
              );
            })}
          </div>

          {/* Conteúdo das Abas */}
          {abaAtiva === "descoberta" && (
            <div className="space-y-8">
              {/* Campo de Busca Principal */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={busca}
                      onChange={(e) => {
                        setBusca(e.target.value);
                        setSugestoesVisivel(e.target.value.length > 0);
                      }}
                      onFocus={() => setSugestoesVisivel(true)}
                      placeholder="O que você quer saber sobre seus clientes?"
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    {busca && (
                      <button
                        onClick={() => setBusca("")}
                        className="absolute right-4 top-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    )}
                  </div>

                  {/* Sugestões de Menu */}
                  {sugestoesVisivel && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-50">
                      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase px-2 mb-3">
                          Sugestões de Pesquisa
                        </p>
                        {MENU_SUGESTOES.map((sugestao, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAdicionarSugestao(sugestao)}
                            className="w-full text-left p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl flex-shrink-0">{sugestao.icon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                  {sugestao.label}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                  {sugestao.descricao}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex-shrink-0 mt-1" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags de Seleção */}
                {busca && (
                  <div className="flex flex-wrap gap-2">
                    {busca.split(" + ").map((tag, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Botão de Criar */}
                {busca && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCriarPesquisa}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 text-lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Criar Pesquisa
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setBusca("")}
                      className="border-gray-300 dark:border-gray-700"
                    >
                      Limpar
                    </Button>
                  </div>
                )}
              </div>

              {/* Pesquisas Recentes */}
              {pesquisasCriadas.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pesquisas Recentes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pesquisasCriadas.slice(-4).map((pesquisa) => (
                      <Card
                        key={pesquisa.id}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {pesquisa.titulo}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {pesquisa.descricao}
                              </p>
                            </div>
                            <Badge className={getStatusColor(pesquisa.status)}>
                              {getStatusLabel(pesquisa.status)}
                            </Badge>
                          </div>

                          {pesquisa.status !== "rascunho" && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{pesquisa.progresso}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                                  style={{ width: `${pesquisa.progresso}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {pesquisa.respostas && (
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {pesquisa.respostas} respostas
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {pesquisa.taxaResposta}% taxa
                              </div>
                            </div>
                          )}

                          {pesquisa.status === "rascunho" && (
                            <Button
                              onClick={() => handleDisparar(pesquisa.id)}
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Disparar Pesquisa
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {abaAtiva === "pesquisas" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {pesquisasFiltradas.length} Pesquisas
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {pesquisasFiltradas.map((pesquisa) => (
                  <Card
                    key={pesquisa.id}
                    className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {pesquisa.titulo}
                          </h4>
                          <Badge className={getStatusColor(pesquisa.status)}>
                            {getStatusLabel(pesquisa.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {pesquisa.descricao}
                        </p>

                        {pesquisa.status !== "rascunho" && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Progresso
                              </p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                {pesquisa.progresso}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Respostas
                              </p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                {pesquisa.respostas || 0}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Taxa
                              </p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                {pesquisa.taxaResposta || 0}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Início
                              </p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                {pesquisa.dataInicio}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        {pesquisa.status === "rascunho" ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleDisparar(pesquisa.id)}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        ) : pesquisa.status === "rodando" ? (
                          <>
                            <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-700">
                              <Pause className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-700">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-700">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-700">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {pesquisa.status !== "rascunho" && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                            style={{ width: `${pesquisa.progresso}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "analytics" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {resultados.length} Resultados Disponíveis
              </h3>

              {resultados.length === 0 ? (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-16 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Nenhum resultado disponível
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Conclua pesquisas para ver os resultados aqui
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {resultados.map((resultado) => (
                    <Card
                      key={resultado.id}
                      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                              {resultado.titulo}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {resultado.respondentes} respondentes
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {resultado.taxaResposta}% taxa de resposta
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {resultado.dataConclusao}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar
                          </Button>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Principais Insights
                          </h5>
                          <ul className="space-y-2">
                            {resultado.insights.map((insight, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Análise Completa
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

