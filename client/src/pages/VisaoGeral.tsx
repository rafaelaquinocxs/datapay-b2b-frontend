import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function VisaoGeral() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Visão Geral 360º</h1>
        <p className="text-gray-500 mt-1">
          Panorama completo dos seus dados e insights em tempo real
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Total de Perfis */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Perfis Unificados
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2.4M</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  +15.2%
                </span>
                <span className="text-sm text-gray-500">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* KPI 2: Taxa de Conversão */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Taxa de Conversão
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">18.7%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+3.1%</span>
                <span className="text-sm text-gray-500">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* KPI 3: CLV Médio */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">CLV Médio</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ 3.2k</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  +25.4%
                </span>
                <span className="text-sm text-gray-500">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* KPI 4: Risco de Churn */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Risco de Churn</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8.3%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">-2.1%</span>
                <span className="text-sm text-gray-500">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Status dos Conectores */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Status dos Conectores
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Última sincronização há 5 minutos
            </p>
          </div>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Conector 1: Salesforce */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">SF</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Salesforce</p>
                <p className="text-xs text-gray-500">1.2M registros</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>

          {/* Conector 2: VTEX */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-bold text-sm">VX</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">VTEX</p>
                <p className="text-xs text-gray-500">850k registros</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>

          {/* Conector 3: TOTVS */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">TV</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">TOTVS Protheus</p>
                <p className="text-xs text-gray-500">2.1M registros</p>
              </div>
            </div>
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
              <Clock className="w-3 h-3 mr-1" />
              Sincronizando
            </Badge>
          </div>
        </div>
      </Card>

      {/* Insights de IA em Destaque */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Propensão de Compra */}
        <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Propensão de Compra</h3>
              <p className="text-purple-100 text-sm mt-1">
                Clientes com alta probabilidade de compra
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">87%</span>
                <span className="text-purple-200">de precisão</span>
              </div>
              <p className="text-sm text-purple-100 mt-2">
                32.4k clientes identificados com alta propensão
              </p>
            </div>

            <Button variant="secondary" size="sm" className="w-full">
              Ver Segmento Completo
            </Button>
          </div>
        </Card>

        {/* Card 2: Risco de Churn */}
        <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Alerta de Churn</h3>
              <p className="text-orange-100 text-sm mt-1">
                Clientes em risco de cancelamento
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">12.8k</span>
                <span className="text-orange-100">clientes em risco</span>
              </div>
              <p className="text-sm text-orange-100 mt-2">
                Ação imediata pode recuperar R$ 2.4M em receita
              </p>
            </div>

            <Button variant="secondary" size="sm" className="w-full">
              Criar Campanha de Retenção
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

