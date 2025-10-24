import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

const acoesRecomendadas = [
  {
    id: 1,
    titulo: "Parceria Inter + Coca-Cola no Intervalo",
    tipo: "Parceria Estratégica",
    tipoCor: "bg-purple-100 text-purple-700",
    descricao:
      "Combo personalizado de refrigerante + snack no intervalo, baseado nas preferências coletadas. Oferta exclusiva via app.",
    baseadoEm: "Insight: 30% mais vendas no intervalo + Pesquisa: sabor preferido",
    potencialLucro: "R$ 45k/mês",
    roi: "320%",
    implementacao: "2 semanas",
    status: "recomendada",
    prioridade: "Alta",
    icon: Sparkles,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    acoes: [
      "Negociar parceria com Coca-Cola",
      "Criar combos personalizados no app",
      "Configurar notificação push 10min antes do intervalo",
      "Oferta limitada: 15min de duração",
    ],
  },
  {
    id: 2,
    titulo: "Campanha de Reativação de Sócios Inativos",
    tipo: "Retenção",
    tipoCor: "bg-orange-100 text-orange-700",
    descricao:
      "Oferta personalizada para 2.3k sócios inativos: ingresso gratuito + desconto 50% em produtos. Segmentação por motivo de ausência.",
    baseadoEm: "Insight: 2.3k sócios inativos + Pesquisa: motivos de ausência",
    potencialLucro: "R$ 120k recuperados",
    roi: "280%",
    implementacao: "1 semana",
    status: "recomendada",
    prioridade: "Crítica",
    icon: Users,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    acoes: [
      "Segmentar por motivo de ausência",
      "Criar 3 ofertas personalizadas",
      "Enviar email + SMS + notificação app",
      "Acompanhar taxa de conversão em tempo real",
    ],
  },
  {
    id: 3,
    titulo: "Upsell de Ingressos Premium Pós-Vitória",
    tipo: "Upsell",
    tipoCor: "bg-green-100 text-green-700",
    descricao:
      "Oferecer upgrade para setores premium nas 2h após vitórias, quando engajamento está 180% maior. Desconto progressivo.",
    baseadoEm: "Insight: 180% mais vendas pós-vitória + Pesquisa: setor preferido",
    potencialLucro: "R$ 28k/mês",
    roi: "410%",
    implementacao: "3 dias",
    status: "recomendada",
    prioridade: "Alta",
    icon: TrendingUp,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    acoes: [
      "Configurar trigger automático pós-vitória",
      "Criar oferta de upgrade com desconto progressivo",
      "Notificação push personalizada",
      "Limite de tempo: 2h após o jogo",
    ],
  },
];

const acoesEmAndamento = [
  {
    id: 4,
    titulo: "Combo Cerveja + Petisco no Estádio",
    progresso: 65,
    resultadoParcial: "R$ 12k em 5 dias",
    previsao: "R$ 38k no mês",
  },
];

export default function AcoesInteligentes() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Ações Inteligentes</h1>
            <p className="text-purple-100 mt-1">
              8 campanhas recomendadas pela IA • Potencial de R$ 263k/mês
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-purple-100">
            IA gerando novas ações em tempo real
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ações Recomendadas</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Potencial Total</p>
              <p className="text-3xl font-bold text-gray-900">R$ 263k</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ROI Médio</p>
              <p className="text-3xl font-bold text-gray-900">337%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Em Andamento</p>
              <p className="text-3xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ações Recomendadas */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Ações Recomendadas pela IA
        </h2>

        <div className="space-y-6">
          {acoesRecomendadas.map((acao) => {
            const Icon = acao.icon;

            return (
              <Card
                key={acao.id}
                className="p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-14 h-14 rounded-xl ${acao.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-7 h-7 ${acao.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {acao.titulo}
                        </h3>
                        <Badge className={acao.tipoCor}>{acao.tipo}</Badge>
                        <Badge
                          className={
                            acao.prioridade === "Crítica"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {acao.prioridade}
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {acao.descricao}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="italic">{acao.baseadoEm}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Potencial de Lucro</p>
                    <p className="text-lg font-bold text-green-600">
                      {acao.potencialLucro}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ROI Estimado</p>
                    <p className="text-lg font-bold text-blue-600">{acao.roi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Implementação</p>
                    <p className="text-lg font-bold text-gray-900">
                      {acao.implementacao}
                    </p>
                  </div>
                </div>

                {/* Passos de Implementação */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Passos para Implementar:
                  </p>
                  <div className="space-y-2">
                    {acao.acoes.map((passo, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{passo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">
                    Ver Detalhes Completos
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Ativar Ação
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Ações em Andamento */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Ações em Andamento
        </h2>

        <div className="space-y-4">
          {acoesEmAndamento.map((acao) => (
            <Card
              key={acao.id}
              className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {acao.titulo}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Resultado parcial: {acao.resultadoParcial}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <Zap className="w-3 h-3 mr-1" />
                  Ativa
                </Badge>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Progresso do Mês
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {acao.progresso}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${acao.progresso}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Previsão de atingir: <strong>{acao.previsao}</strong>
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

