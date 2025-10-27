import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap } from "lucide-react";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="p-8 space-y-8">
      {/* Header Card */}
      <Card className="p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">142</h1>
            <p className="text-purple-100 mt-1">Leads Inteligentes</p>
          </div>
        </div>
      </Card>

      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bem-vindo ao DataPay Enterprise
        </h2>
        <p className="text-gray-600">
          Sua plataforma de Customer Data Platform para grandes corporações
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Perfis Unificados
            </h3>
            <Badge className="bg-green-100 text-green-700">Ativo</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-900">2.4M</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">+15.2%</span>
            <span className="text-sm text-gray-500">vs mês anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Taxa de Conversão
            </h3>
            <Badge className="bg-blue-100 text-blue-700">Otimizado</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-900">18.7%</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">+3.1%</span>
            <span className="text-sm text-gray-500">vs mês anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CLV Médio</h3>
            <Badge className="bg-purple-100 text-purple-700">Premium</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-900">R$ 3.2k</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">+25.4%</span>
            <span className="text-sm text-gray-500">vs mês anterior</span>
          </div>
        </Card>
      </div>

      {/* Navigation Hint */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Explore as funcionalidades do DataPay Enterprise
          </h3>
          <p className="text-sm text-gray-600">
            Use o menu lateral para navegar entre Visão Geral, Conectores,
            Inteligência e Segmentação
          </p>
        </div>
      </Card>
    </div>
  );
}
