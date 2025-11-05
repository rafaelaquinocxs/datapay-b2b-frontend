import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Filter,
  Zap,
  TrendingUp,
  Users,
  BarChart3,
  MessageSquare,
  Gauge,
  Smile,
  Briefcase,
  AlertCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface Survey {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  categoria: string;
  segmento: string;
  estado: string;
  respostasColetadas: number;
  taxaResposta: number;
  recompensaAtiva: boolean;
  recompensaValor?: number;
}

export default function Pesquisas() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const empresaId = usuario?.id || 1;
  const [gerando, setGerando] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [showModelos, setShowModelos] = useState(false);

  const pesquisas: Survey[] = [
    {
      id: 1,
      titulo: "NPS - Net Promoter Score",
      descricao: "Medir lealdade e satisfação geral",
      tipo: "nps",
      categoria: "clientes",
      segmento: "vip",
      estado: "ativo",
      respostasColetadas: 1250,
      taxaResposta: 68,
      recompensaAtiva: true,
      recompensaValor: 10,
    },
    {
      id: 2,
      titulo: "Satisfação com Atendimento",
      descricao: "Avaliar qualidade do suporte",
      tipo: "satisfacao",
      categoria: "clientes",
      segmento: "todos",
      estado: "ativo",
      respostasColetadas: 890,
      taxaResposta: 72,
      recompensaAtiva: false,
    },
    {
      id: 3,
      titulo: "Clima Organizacional",
      descricao: "Avaliação de satisfação dos funcionários",
      tipo: "clima",
      categoria: "funcionarios",
      segmento: "todos",
      estado: "ativo",
      respostasColetadas: 245,
      taxaResposta: 85,
      recompensaAtiva: true,
      recompensaValor: 50,
    },
    {
      id: 4,
      titulo: "Feedback de Novo Produto",
      descricao: "Coletar opinião sobre novo lançamento",
      tipo: "produto",
      categoria: "produto",
      segmento: "early_adopters",
      estado: "rascunho",
      respostasColetadas: 0,
      taxaResposta: 0,
      recompensaAtiva: false,
    },
    {
      id: 5,
      titulo: "Compliance LGPD",
      descricao: "Validar conformidade de dados",
      tipo: "custom",
      categoria: "compliance",
      segmento: "todos",
      estado: "ativo",
      respostasColetadas: 1500,
      taxaResposta: 92,
      recompensaAtiva: false,
    },
  ];

  const modelos = [
    {
      id: 1,
      nome: "NPS Padrão",
      descricao: "Template de NPS com 3 perguntas",
      icon: Gauge,
      cor: "bg-blue-100",
    },
    {
      id: 2,
      nome: "Satisfação CSAT",
      descricao: "Avaliação rápida em 2 perguntas",
      icon: Smile,
      cor: "bg-green-100",
    },
    {
      id: 3,
      nome: "Clima Organizacional",
      descricao: "Pesquisa de satisfação interna",
      icon: Briefcase,
      cor: "bg-purple-100",
    },
    {
      id: 4,
      nome: "Feedback de Produto",
      descricao: "Coletar insights sobre features",
      icon: MessageSquare,
      cor: "bg-orange-100",
    },
  ];

  const CATEGORIAS = [
    { id: "clientes", nome: "Clientes" },
    { id: "funcionarios", nome: "Funcionários" },
    { id: "produto", nome: "Produto" },
    { id: "compliance", nome: "Compliance" },
  ];

  const filteredPesquisas = pesquisas.filter(
    (p) =>
      (filtroCategoria === "" || p.categoria === filtroCategoria) &&
      (p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        p.descricao.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleGerarSugestoes = async () => {
    setGerando(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("3 pesquisas sugeridas com base em sua empresa!");
    setGerando(false);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesquisas</h1>
          <p className="text-gray-600 mt-1">
            Crie pesquisas, colete feedback e gere insights com IA
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowModelos(!showModelos)}
            variant="outline"
          >
            <Zap className="w-4 h-4 mr-2" />
            Modelos
          </Button>
          <Button
            onClick={handleGerarSugestoes}
            disabled={gerando}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {gerando ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Sugerir
              </>
            )}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Pesquisa
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pesquisas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFiltroCategoria(filtroCategoria === cat.id ? "" : cat.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filtroCategoria === cat.id
                  ? "bg-purple-600 text-white ring-2 ring-offset-2 ring-purple-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Modelos Rápidos */}
      {showModelos && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Modelos Rápidos</h2>
          <div className="grid grid-cols-4 gap-4">
            {modelos.map((modelo) => {
              const Icon = modelo.icon;
              return (
                <Card
                  key={modelo.id}
                  className={`p-6 cursor-pointer hover:shadow-lg transition-all ${modelo.cor}`}
                >
                  <Icon className="w-8 h-8 text-gray-900 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">{modelo.nome}</h3>
                  <p className="text-sm text-gray-700 mb-4">{modelo.descricao}</p>
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                    Usar
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* KPI Dashboard */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Pesquisas Ativas</p>
          <p className="text-3xl font-bold text-purple-600">4</p>
          <p className="text-xs text-purple-600 mt-2">↑ 1 nova esta semana</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Taxa Média Resposta</p>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">76%</span>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">↑ 5% vs mês anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Respostas Coletadas</p>
          <p className="text-3xl font-bold text-green-600">3.885</p>
          <p className="text-xs text-green-600 mt-2">↑ 500 esta semana</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Recompensas Ativas</p>
          <p className="text-3xl font-bold text-orange-600">2</p>
          <p className="text-xs text-orange-600 mt-2">60 DataCoins distribuídos</p>
        </Card>
      </div>

      {/* Pesquisas */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Minhas Pesquisas</h2>
        {filteredPesquisas.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma pesquisa encontrada
            </h3>
            <p className="text-gray-600">
              Crie uma nova pesquisa ou use um modelo rápido
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPesquisas.map((pesquisa) => (
              <Card
                key={pesquisa.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {pesquisa.titulo}
                      </h3>
                      <Badge
                        className={
                          pesquisa.estado === "ativo"
                            ? "bg-green-100 text-green-900"
                            : pesquisa.estado === "rascunho"
                            ? "bg-gray-100 text-gray-900"
                            : "bg-yellow-100 text-yellow-900"
                        }
                      >
                        {pesquisa.estado === "ativo" && "Ativo"}
                        {pesquisa.estado === "rascunho" && "Rascunho"}
                        {pesquisa.estado === "pausado" && "Pausado"}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-3">{pesquisa.descricao}</p>

                    <div className="grid grid-cols-5 gap-3 text-sm mb-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span>
                          <strong>Tipo:</strong> {pesquisa.tipo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>
                          <strong>Respostas:</strong> {pesquisa.respostasColetadas}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span>
                          <strong>Taxa:</strong> {pesquisa.taxaResposta}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Badge className="bg-blue-100 text-blue-900">
                          {pesquisa.categoria}
                        </Badge>
                      </div>
                      {pesquisa.recompensaAtiva && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <span>
                            <strong>+{pesquisa.recompensaValor} DC</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {pesquisa.recompensaAtiva && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-xs text-orange-600 font-semibold mb-1">
                          Recompensa Ativa
                        </p>
                        <p className="text-sm text-orange-900">
                          Respondentes ganham {pesquisa.recompensaValor} DataCoins
                        </p>
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                </div>

                {/* Ações */}
                <div className="flex gap-2 pt-4 border-t flex-wrap">
                  <Button size="sm" variant="outline">
                    Responder
                  </Button>
                  <Button size="sm" variant="outline">
                    Resultados
                  </Button>
                  <Button size="sm" variant="outline">
                    Agendar
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Editar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
