import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Sparkles,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const insights = [
  {
    id: 1,
    titulo: "Pico de Vendas no Intervalo",
    descricao:
      "30% das vendas de refrigerante acontecem no intervalo do jogo (15min). Oportunidade de parceria com fornecedores.",
    impacto: "Alto",
    impactoCor: "bg-green-100 text-green-700",
    potencialLucro: "R$ 45k/mês",
    icon: TrendingUp,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    acao: "Criar parceria Coca-Cola",
  },
  {
    id: 2,
    titulo: "Sócios Inativos há 60+ dias",
    descricao:
      "2.3k sócios não comparecem há mais de 60 dias. Risco de cancelamento alto. Taxa de retenção pode cair 15%.",
    impacto: "Crítico",
    impactoCor: "bg-red-100 text-red-700",
    potencialLucro: "R$ 120k em risco",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    acao: "Campanha de reativação",
  },
  {
    id: 3,
    titulo: "Compra de Camisetas Pós-Vitória",
    descricao:
      "Vendas de camisetas aumentam 180% nas 2h após vitórias. Estoque atual insuficiente para demanda.",
    impacto: "Alto",
    impactoCor: "bg-green-100 text-green-700",
    potencialLucro: "R$ 28k/mês",
    icon: ShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    acao: "Ajustar estoque dinâmico",
  },
];

const gaps = [
  {
    id: 1,
    pergunta: "Qual sabor de refrigerante você mais gosta?",
    motivo:
      "Sabendo o sabor preferido, podemos criar combos personalizados no intervalo e aumentar vendas em 40%.",
    potencial: "R$ 18k/mês",
    icon: ShoppingCart,
  },
  {
    id: 2,
    pergunta: "Por que você não foi aos últimos 3 jogos?",
    motivo:
      "Entender motivos de ausência permite criar ações de retenção personalizadas e reduzir churn em 25%.",
    potencial: "R$ 30k/mês",
    icon: Users,
  },
  {
    id: 3,
    pergunta: "Qual setor do estádio você prefere?",
    motivo:
      "Dados de preferência de setor permitem upsell de ingressos premium e aumentar ticket médio em 35%.",
    potencial: "R$ 22k/mês",
    icon: DollarSign,
  },
];

export default function AnaliseIA() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Análise da IA</h1>
            <p className="text-purple-100 mt-1">
              12 insights identificados • 3 gaps de informação
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-purple-100">
            IA processando em tempo real • 94.2% precisão
          </span>
        </div>
      </div>

      {/* Insights Identificados */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Insights Identificados
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Oportunidades de lucro encontradas nos seus dados
            </p>
          </div>
          <Badge className="bg-purple-100 text-purple-700 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            12 novos insights
          </Badge>
        </div>

        <div className="space-y-6">
          {insights.map((insight) => {
            const Icon = insight.icon;

            return (
              <Card
                key={insight.id}
                className="p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl ${insight.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-7 h-7 ${insight.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {insight.titulo}
                        </h3>
                        <Badge className={insight.impactoCor}>
                          {insight.impacto}
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {insight.descricao}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-500">Potencial de Lucro</p>
                      <p className="text-lg font-bold text-green-600">
                        {insight.potencialLucro}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ação Sugerida</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {insight.acao}
                      </p>
                    </div>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Ver Ação Completa
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Gaps de Informação */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Gaps de Informação Identificados
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Dados que estão faltando para completar o quebra-cabeça
            </p>
          </div>
          <Badge className="bg-orange-100 text-orange-700 px-4 py-2">
            <AlertCircle className="w-4 h-4 mr-2" />
            3 gaps críticos
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {gaps.map((gap) => {
            const Icon = gap.icon;

            return (
              <Card
                key={gap.id}
                className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    Gap Crítico
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  "{gap.pergunta}"
                </h3>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {gap.motivo}
                </p>

                <div className="mb-4 p-3 bg-white rounded-lg border border-orange-200">
                  <p className="text-xs text-gray-500">Potencial de Lucro</p>
                  <p className="text-xl font-bold text-green-600">
                    {gap.potencial}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-300 hover:bg-orange-100"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Criar Pesquisa
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <Card className="p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Potencial Total Identificado</h3>
              <p className="text-purple-100 mt-1">
                Soma de todos os insights e gaps
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">R$ 263k</p>
            <p className="text-purple-100 text-sm">por mês</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

