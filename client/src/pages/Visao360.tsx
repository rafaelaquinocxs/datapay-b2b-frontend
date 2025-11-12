import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Database,
  Eye,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Activity,
} from "lucide-react";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  status: "connected" | "pending" | "disconnected";
  dataPoints: number;
  lastSync: string;
  metrics: {
    label: string;
    value: string;
    trend: number;
  }[];
}

export default function Visao360() {
  const platforms: Platform[] = [
    {
      id: "salesforce",
      name: "Salesforce",
      icon: "🔵",
      color: "text-blue-400",
      gradient: "from-blue-600 to-blue-400",
      status: "connected",
      dataPoints: 15420,
      lastSync: "2 min atrás",
      metrics: [
        { label: "Clientes", value: "2,450", trend: 12 },
        { label: "Oportunidades", value: "1,280", trend: 8 },
        { label: "Receita Prevista", value: "R$ 4.2M", trend: 15 },
      ],
    },
    {
      id: "sap",
      name: "SAP",
      icon: "🟢",
      color: "text-green-400",
      gradient: "from-green-600 to-green-400",
      status: "connected",
      dataPoints: 28500,
      lastSync: "5 min atrás",
      metrics: [
        { label: "Transações", value: "8,920", trend: 5 },
        { label: "Fornecedores", value: "340", trend: 2 },
        { label: "Valor Estoque", value: "R$ 12.5M", trend: -3 },
      ],
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      icon: "📊",
      color: "text-orange-400",
      gradient: "from-orange-600 to-orange-400",
      status: "connected",
      dataPoints: 45230,
      lastSync: "1 min atrás",
      metrics: [
        { label: "Visitantes", value: "125K", trend: 22 },
        { label: "Conversões", value: "3,450", trend: 18 },
        { label: "Taxa Bounce", value: "32%", trend: -5 },
      ],
    },
    {
      id: "powerbi",
      name: "Power BI",
      icon: "📈",
      color: "text-yellow-400",
      gradient: "from-yellow-600 to-yellow-400",
      status: "connected",
      dataPoints: 12340,
      lastSync: "10 min atrás",
      metrics: [
        { label: "Dashboards", value: "24", trend: 3 },
        { label: "Relatórios", value: "156", trend: 7 },
        { label: "Usuários Ativos", value: "89", trend: 12 },
      ],
    },
    {
      id: "hubspot",
      name: "HubSpot",
      icon: "🎯",
      color: "text-pink-400",
      gradient: "from-pink-600 to-pink-400",
      status: "connected",
      dataPoints: 8920,
      lastSync: "15 min atrás",
      metrics: [
        { label: "Contatos", value: "5,230", trend: 9 },
        { label: "Deals", value: "420", trend: 14 },
        { label: "Emails Enviados", value: "12.4K", trend: 11 },
      ],
    },
    {
      id: "aws",
      name: "AWS",
      icon: "☁️",
      color: "text-amber-400",
      gradient: "from-amber-600 to-amber-400",
      status: "pending",
      dataPoints: 0,
      lastSync: "Nunca",
      metrics: [
        { label: "Instâncias", value: "-", trend: 0 },
        { label: "Armazenamento", value: "-", trend: 0 },
        { label: "Banda", value: "-", trend: 0 },
      ],
    },
  ];

  const totalDataPoints = platforms.reduce((sum, p) => sum + p.dataPoints, 0);
  const connectedPlatforms = platforms.filter((p) => p.status === "connected").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Visão 360</h1>
            <p className="text-gray-600 mt-1">
              Visualize todos os dados de suas plataformas conectadas em um único lugar
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Plataformas Conectadas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{connectedPlatforms}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pontos de Dados</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {(totalDataPoints / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Sincronizações Ativas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {platforms.filter((p) => p.status === "connected").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Integridade dos Dados</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">98%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className="bg-white border-0 shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            {/* Top gradient bar */}
            <div className={`h-1 bg-gradient-to-r ${platform.gradient}`} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{platform.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          platform.status === "connected"
                            ? "bg-green-500"
                            : platform.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                      <span className="text-xs text-gray-600 capitalize">
                        {platform.status === "connected"
                          ? "Conectado"
                          : platform.status === "pending"
                            ? "Pendente"
                            : "Desconectado"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sync Info */}
              {platform.status === "connected" && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Última sincronização: {platform.lastSync}</span>
                  </div>
                </div>
              )}

              {/* Metrics */}
              <div className="space-y-3 mb-6">
                {platform.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{metric.value}</span>
                      {metric.trend !== 0 && (
                        <span
                          className={`text-xs font-medium ${
                            metric.trend > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {metric.trend > 0 ? "+" : ""}
                          {metric.trend}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Points */}
              {platform.status === "connected" && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pontos de Dados</span>
                    <span className="font-semibold text-gray-900">
                      {platform.dataPoints.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <Button
                className={`w-full bg-gradient-to-r ${platform.gradient} text-white border-0 hover:opacity-90 transition-all flex items-center justify-center gap-2`}
              >
                {platform.status === "connected" ? (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    Ver Detalhes
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Conectar
                  </>
                )}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-8 mt-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              O que é a Visão 360?
            </h3>
            <p className="text-gray-700">
              A Visão 360 consolida dados de todas as suas plataformas conectadas em um único
              dashboard intuitivo. Visualize métricas em tempo real, acompanhe a saúde das
              integrações e tome decisões baseadas em dados de todas as fontes simultaneamente.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

