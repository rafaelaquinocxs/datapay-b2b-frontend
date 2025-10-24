import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  Play,
  BarChart,
  Gift,
  Sparkles,
} from "lucide-react";

const pesquisasAtivas = [
  {
    id: 1,
    titulo: "Qual sabor de refrigerante você prefere?",
    objetivo: "Identificar preferências para parceria Coca-Cola",
    respostas: 3240,
    meta: 5000,
    progresso: 65,
    recompensa: "50 pontos + cupom R$ 5",
    status: "ativa",
    criadaEm: "Há 3 dias",
  },
  {
    id: 2,
    titulo: "Por que você não foi aos últimos jogos?",
    objetivo: "Entender motivos de ausência para campanha de retenção",
    respostas: 1820,
    meta: 3000,
    progresso: 61,
    recompensa: "100 pontos + ingresso desconto",
    status: "ativa",
    criadaEm: "Há 5 dias",
  },
  {
    id: 3,
    titulo: "Qual setor do estádio você prefere?",
    objetivo: "Dados para upsell de ingressos premium",
    respostas: 4580,
    meta: 5000,
    progresso: 92,
    recompensa: "30 pontos",
    status: "ativa",
    criadaEm: "Há 1 semana",
  },
];

const pesquisasConcluidas = [
  {
    id: 4,
    titulo: "Qual produto você mais compra no estádio?",
    respostas: 5000,
    insights: "Cerveja lidera com 45%, seguida de refrigerante (32%)",
    impacto: "Gerou ação de parceria com Ambev",
  },
];

export default function Pesquisas() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesquisas Gamificadas</h1>
          <p className="text-gray-500 mt-1">
            Preencha gaps de informação com perguntas inteligentes
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          <Plus className="w-4 h-4" />
          Criar Nova Pesquisa
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Play className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pesquisas Ativas</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Respostas Coletadas</p>
              <p className="text-3xl font-bold text-gray-900">9.6k</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Taxa de Resposta</p>
              <p className="text-3xl font-bold text-gray-900">73%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pontos Distribuídos</p>
              <p className="text-3xl font-bold text-gray-900">482k</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pesquisas Ativas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Pesquisas Ativas
        </h2>

        <div className="space-y-6">
          {pesquisasAtivas.map((pesquisa) => (
            <Card
              key={pesquisa.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pesquisa.titulo}
                    </h3>
                    <Badge className="bg-green-100 text-green-700">
                      <Play className="w-3 h-3 mr-1" />
                      Ativa
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{pesquisa.objetivo}</p>
                </div>
              </div>

              {/* Progresso */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progresso de Respostas
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {pesquisa.respostas} / {pesquisa.meta}
                  </span>
                </div>
                <Progress value={pesquisa.progresso} className="h-3" />
                <p className="text-xs text-gray-500 mt-1">
                  {pesquisa.progresso}% da meta atingida
                </p>
              </div>

              {/* Recompensa */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Gift className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Recompensa por resposta</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {pesquisa.recompensa}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Criada {pesquisa.criadaEm}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart className="w-4 h-4 mr-2" />
                    Ver Resultados
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Editar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pesquisas Concluídas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Pesquisas Concluídas
        </h2>

        <div className="space-y-4">
          {pesquisasConcluidas.map((pesquisa) => (
            <Card
              key={pesquisa.id}
              className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pesquisa.titulo}
                    </h3>
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Concluída
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {pesquisa.respostas} respostas coletadas
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Insight Gerado</p>
                        <p className="text-sm font-medium text-gray-900">
                          {pesquisa.insights}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Impacto</p>
                        <p className="text-sm font-medium text-gray-900">
                          {pesquisa.impacto}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  Ver Relatório Completo
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                IA Sugeriu 3 Novas Pesquisas
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Baseadas nos gaps identificados na análise dos seus dados
              </p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Ver Sugestões da IA
          </Button>
        </div>
      </Card>
    </div>
  );
}

