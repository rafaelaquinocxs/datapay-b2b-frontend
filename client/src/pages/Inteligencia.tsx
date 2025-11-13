import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function Inteligencia() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Mapa de Inteligência</h1>
            <p className="text-purple-100 mt-1">
              Análise neural do comportamento do cliente
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-purple-100">
            IA processando • 94.2% precisão
          </span>
        </div>
      </div>

      {/* Análise Comportamental */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Análise Comportamental
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Dados em tempo real processados por IA
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Pico de Engajamento */}
          <Card className="p-6 border-l-4 border-purple-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Pico de Engajamento
                  </h3>
                  <p className="text-sm text-gray-500">
                    Sextas-feiras 18h-21h
                  </p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-700">alta</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Atividade neste período</span>
                <span className="font-semibold text-gray-900">3.2x</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-gray-500">
                85% mais ativa neste período
              </p>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Ver detalhes
            </Button>
          </Card>

          {/* Card 2: Produto em Alta */}
          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Produto em Alta</h3>
                  <p className="text-sm text-gray-500">
                    Tênis esportivos femininos
                  </p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">muito alta</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Crescimento exponencial</span>
                <span className="font-semibold text-gray-900">240%</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-gray-500">
                87% confiança na previsão
              </p>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Ver detalhes
            </Button>
          </Card>
        </div>
      </div>

      {/* Predições da IA */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Predições da IA
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Predição 1: Compra Iminente */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-green-600">87%</span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Compra Iminente</h3>
            <p className="text-sm text-gray-600 mb-4">Próximas 48h</p>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500">
                Baseado em 47 interações recentes
              </p>
              <Badge variant="outline" className="text-xs">
                alta
              </Badge>
            </div>

            <Button
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Ver detalhes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Predição 2: Engajamento Máximo */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-purple-600">94%</span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              Engajamento Máximo
            </h3>
            <p className="text-sm text-gray-600 mb-4">Sex 19h-21h</p>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500">
                Horário histórico de maior atividade
              </p>
              <Badge variant="outline" className="text-xs">
                muito alta
              </Badge>
            </div>

            <Button
              size="sm"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Ver detalhes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Predição 3: Interesse Crescente */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-blue-600">76%</span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              Interesse Crescente
            </h3>
            <p className="text-sm text-gray-600 mb-4">Próxima semana</p>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500">
                Tendência identificada em fitness
              </p>
              <Badge variant="outline" className="text-xs">
                média
              </Badge>
            </div>

            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ver detalhes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>

      {/* Métricas Preditivas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Métricas Preditivas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Métrica 1: Propensão de Compra */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Propensão de Compra</p>
                <p className="text-2xl font-bold text-gray-900">73%</p>
              </div>
            </div>
            <Progress value={73} className="h-2 mb-2" />
            <p className="text-xs text-gray-500">
              32.4k clientes com alta propensão
            </p>
          </Card>

          {/* Métrica 2: Risco de Churn */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Risco de Churn</p>
                <p className="text-2xl font-bold text-gray-900">8.3%</p>
              </div>
            </div>
            <Progress value={8} className="h-2 mb-2" />
            <p className="text-xs text-gray-500">
              12.8k clientes em risco identificados
            </p>
          </Card>

          {/* Métrica 3: Ticket Médio Potencial */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ticket Médio Potencial</p>
                <p className="text-2xl font-bold text-gray-900">R$ 3.2k</p>
              </div>
            </div>
            <Progress value={85} className="h-2 mb-2" />
            <p className="text-xs text-gray-500">
              +25% vs ticket médio atual
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

