import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Target,
  MoreVertical,
  Download,
  Send,
} from "lucide-react";

const segmentos = [
  {
    id: 1,
    nome: "Alta Propensão de Compra",
    descricao: "Clientes com 70%+ de probabilidade de compra nas próximas 48h",
    tamanho: "32.4k",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badge: "Alta Conversão",
    badgeColor: "bg-green-100 text-green-700",
    crescimento: "+18%",
    crescimentoPositivo: true,
  },
  {
    id: 2,
    nome: "Risco de Churn",
    descricao: "Clientes com baixo engajamento e risco de cancelamento",
    tamanho: "12.8k",
    icon: AlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: "Ação Urgente",
    badgeColor: "bg-orange-100 text-orange-700",
    crescimento: "-5%",
    crescimentoPositivo: true,
  },
  {
    id: 3,
    nome: "Alto Valor (VIPs)",
    descricao: "Clientes com CLV acima de R$ 10k e alta frequência de compra",
    tamanho: "8.2k",
    icon: Target,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "Premium",
    badgeColor: "bg-purple-100 text-purple-700",
    crescimento: "+12%",
    crescimentoPositivo: true,
  },
  {
    id: 4,
    nome: "Novos Clientes (30 dias)",
    descricao: "Clientes que fizeram a primeira compra nos últimos 30 dias",
    tamanho: "24.1k",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "Onboarding",
    badgeColor: "bg-blue-100 text-blue-700",
    crescimento: "+32%",
    crescimentoPositivo: true,
  },
];

export default function Segmentacao() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Segmentação</h1>
          <p className="text-gray-500 mt-1">
            Crie e gerencie audiências inteligentes para suas campanhas
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Criar Segmento
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Segmentos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Perfis Segmentados</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1.8M</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Taxa de Conversão</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">24.3%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Campanhas Ativas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Send className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Segmentos Principais */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Segmentos Principais
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {segmentos.map((segmento) => {
            const Icon = segmento.icon;

            return (
              <Card
                key={segmento.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl ${segmento.iconBg} flex items-center justify-center`}
                    >
                      <Icon className={`w-7 h-7 ${segmento.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {segmento.nome}
                      </h3>
                      <Badge className={segmento.badgeColor}>
                        {segmento.badge}
                      </Badge>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {segmento.descricao}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-500">Tamanho</p>
                      <p className="text-xl font-bold text-gray-900">
                        {segmento.tamanho}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Crescimento</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp
                          className={`w-4 h-4 ${
                            segmento.crescimentoPositivo
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                        <p
                          className={`text-sm font-semibold ${
                            segmento.crescimentoPositivo
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {segmento.crescimento}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Exportar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Ativar
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Criação Rápida de Segmento */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Plus className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Criação Rápida de Segmento
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Use nossos templates pré-configurados ou crie do zero com o
                construtor visual
              </p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Começar Agora
          </Button>
        </div>
      </Card>

      {/* Templates de Segmentação */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Templates de Segmentação
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-lg transition-all hover:border-purple-300 cursor-pointer group">
            <div className="flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Compradores Frequentes
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Clientes com 3+ compras nos últimos 90 dias
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600"
              >
                Usar Template
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all hover:border-purple-300 cursor-pointer group">
            <div className="flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Clientes Inativos
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Sem compras nos últimos 60 dias
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600"
              >
                Usar Template
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all hover:border-purple-300 cursor-pointer group">
            <div className="flex flex-col space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Carrinho Abandonado
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Produtos no carrinho há mais de 24h
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600"
              >
                Usar Template
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

