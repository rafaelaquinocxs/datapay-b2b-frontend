import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Zap,
  Filter,
  Search,
  Plus,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Users,
  BarChart3,
  BookOpen,
  Clock,
  Send,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface SmartForm {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: "critico" | "alto" | "operacional";
  categoria: string;
  impactoEstimado: string;
  kpiPrincipal: string;
  nPerguntas: number;
  estado: string;
  taxaResposta?: number;
}

export default function FormulariosInteligentes() {
  const [gerando, setGerando] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [showTemplates, setShowTemplates] = useState(false);

  const formularios: SmartForm[] = [
    {
      id: 1,
      titulo: "NPS - Net Promoter Score",
      descricao: "Medir satisfação e lealdade dos clientes",
      prioridade: "critico",
      categoria: "clientes_ativos",
      impactoEstimado: "Aumentar retenção em até 15%",
      kpiPrincipal: "NPS",
      nPerguntas: 5,
      estado: "ativo",
      taxaResposta: 68,
    },
    {
      id: 2,
      titulo: "Auditoria LGPD",
      descricao: "Validar conformidade com regulamentações de dados",
      prioridade: "critico",
      categoria: "compliance",
      impactoEstimado: "Reduzir riscos regulatórios",
      kpiPrincipal: "Compliance",
      nPerguntas: 12,
      estado: "ativo",
      taxaResposta: 92,
    },
    {
      id: 3,
      titulo: "Feedback de Produto",
      descricao: "Coletar sugestões para melhorias",
      prioridade: "alto",
      categoria: "produtos",
      impactoEstimado: "Reduzir churn em até 12%",
      kpiPrincipal: "Churn",
      nPerguntas: 8,
      estado: "ativo",
      taxaResposta: 45,
    },
    {
      id: 4,
      titulo: "Reativação de Clientes",
      descricao: "Entender razões de inatividade",
      prioridade: "alto",
      categoria: "clientes_inativos",
      impactoEstimado: "Recuperar até 8% de clientes",
      kpiPrincipal: "Reativação",
      nPerguntas: 6,
      estado: "rascunho",
      taxaResposta: 0,
    },
    {
      id: 5,
      titulo: "Satisfação de Suporte",
      descricao: "Avaliar qualidade do atendimento",
      prioridade: "operacional",
      categoria: "clientes_ativos",
      impactoEstimado: "Melhorar CSAT em 5%",
      kpiPrincipal: "CSAT",
      nPerguntas: 4,
      estado: "ativo",
      taxaResposta: 71,
    },
  ];

  const templates = [
    {
      id: 1,
      nome: "NPS Padrão",
      categoria: "nps",
      descricao: "Template validado de NPS com 5 perguntas",
      taxaSucesso: "78%",
    },
    {
      id: 2,
      nome: "Satisfação CSAT",
      categoria: "satisfacao",
      descricao: "Avaliação de satisfação em 4 perguntas",
      taxaSucesso: "85%",
    },
    {
      id: 3,
      nome: "Auditoria LGPD",
      categoria: "lgpd",
      descricao: "Checklist completo de conformidade LGPD",
      taxaSucesso: "92%",
    },
    {
      id: 4,
      nome: "Feedback de Produto",
      categoria: "feedback",
      descricao: "Coletar insights sobre features",
      taxaSucesso: "68%",
    },
  ];

  const CATEGORIAS = [
    { id: "clientes_ativos", nome: "Clientes Ativos", cor: "bg-green-100 text-green-900" },
    { id: "clientes_inativos", nome: "Clientes Inativos", cor: "bg-red-100 text-red-900" },
    { id: "produtos", nome: "Produtos", cor: "bg-blue-100 text-blue-900" },
    { id: "compliance", nome: "Compliance", cor: "bg-purple-100 text-purple-900" },
  ];

  const getPrioridadeIcon = (prioridade: string) => {
    switch (prioridade) {
      case "critico":
        return "🔴";
      case "alto":
        return "🟡";
      case "operacional":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getPrioridadeLabel = (prioridade: string) => {
    switch (prioridade) {
      case "critico":
        return "Crítico (Regulatório)";
      case "alto":
        return "Alto Impacto";
      case "operacional":
        return "Operacional";
      default:
        return "Normal";
    }
  };

  const getPrioridadeCor = (prioridade: string) => {
    switch (prioridade) {
      case "critico":
        return "bg-red-100 text-red-900";
      case "alto":
        return "bg-yellow-100 text-yellow-900";
      case "operacional":
        return "bg-green-100 text-green-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  const filteredFormularios = formularios.filter(
    (f) =>
      (filtroCategoria === "" || f.categoria === filtroCategoria) &&
      (f.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        f.descricao.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleGerarSugestoes = async () => {
    setGerando(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("5 formulários sugeridos com base em sua empresa!");
    setGerando(false);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formulários Inteligentes</h1>
          <p className="text-gray-600 mt-1">
            Crie, agende e monitore formulários com IA
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowTemplates(!showTemplates)}
            variant="outline"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Biblioteca
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
                Gerar Sugestões
              </>
            )}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Formulário
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
              placeholder="Buscar formulários..."
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
                  ? `${cat.cor} ring-2 ring-offset-2 ring-purple-600`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Biblioteca de Templates */}
      {showTemplates && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Biblioteca de Templates</h2>
          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{template.nome}</h3>
                    <p className="text-sm text-gray-600">{template.descricao}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-900">
                    Taxa: {template.taxaSucesso}
                  </Badge>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Usar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* KPI Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total de Formulários</p>
          <p className="text-3xl font-bold text-gray-900">{formularios.length}</p>
          <p className="text-xs text-green-600 mt-2">↑ 2 novos esta semana</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Taxa Média de Resposta</p>
          <p className="text-3xl font-bold text-blue-600">69%</p>
          <p className="text-xs text-blue-600 mt-2">↑ 5% vs mês anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Respostas Coletadas</p>
          <p className="text-3xl font-bold text-purple-600">12.450</p>
          <p className="text-xs text-purple-600 mt-2">↑ 1.200 esta semana</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Impacto Estimado</p>
          <p className="text-3xl font-bold text-green-600">R$ 2.3M</p>
          <p className="text-xs text-green-600 mt-2">Potencial de receita</p>
        </Card>
      </div>

      {/* Formulários */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Meus Formulários</h2>
        {filteredFormularios.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum formulário encontrado
            </h3>
            <p className="text-gray-600">
              Crie um novo formulário ou use a biblioteca de templates
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredFormularios.map((form) => (
              <Card
                key={form.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getPrioridadeIcon(form.prioridade)}</span>
                      <h3 className="text-lg font-bold text-gray-900">{form.titulo}</h3>
                      <Badge className={getPrioridadeCor(form.prioridade)}>
                        {getPrioridadeLabel(form.prioridade)}
                      </Badge>
                      <Badge
                        className={
                          form.estado === "ativo"
                            ? "bg-green-100 text-green-900"
                            : form.estado === "rascunho"
                            ? "bg-gray-100 text-gray-900"
                            : "bg-yellow-100 text-yellow-900"
                        }
                      >
                        {form.estado === "ativo" && "Ativo"}
                        {form.estado === "rascunho" && "Rascunho"}
                        {form.estado === "pausado" && "Pausado"}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-3">{form.descricao}</p>

                    {/* KPI Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-xs text-blue-600 font-semibold mb-1">
                        Impacto Esperado
                      </p>
                      <p className="text-sm text-blue-900">{form.impactoEstimado}</p>
                    </div>

                    <div className="grid grid-cols-5 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span>
                          <strong>KPI:</strong> {form.kpiPrincipal}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <AlertCircle className="w-4 h-4 text-purple-600" />
                        <span>
                          <strong>Perguntas:</strong> {form.nPerguntas}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>
                          <strong>Resposta:</strong> {form.taxaResposta || 0}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span>
                          <strong>Agendado</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <span>
                          <strong>Ativo</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                </div>

                {/* Ações */}
                <div className="flex gap-2 pt-4 border-t flex-wrap">
                  <Button size="sm" variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    Responder
                  </Button>
                  <Button size="sm" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Agendar
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatório
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
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
