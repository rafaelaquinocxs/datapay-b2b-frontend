import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useLocation } from "wouter";
import {
  TrendingUp,
  Users,
  Target,
  Zap,
  ArrowRight,
  BarChart3,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function Dashboard() {
  const empresa = { nome: "Jaime", email: "jaime@empresa.com" }; // Mock para apresenta\u00e7\u00e3o
  const [, setLocation] = useLocation();

  const cards = [
    {
      title: "Meus Dados",
      description: "Conecte e gerencie suas fontes de dados",
      icon: BarChart3,
      color: "bg-blue-500",
      route: "/meus-dados",
    },
    {
      title: "Análise da IA",
      description: "Insights e gaps identificados",
      icon: TrendingUp,
      color: "bg-purple-500",
      route: "/analise-ia",
    },
    {
      title: "Pesquisas",
      description: "Crie pesquisas gamificadas",
      icon: MessageSquare,
      color: "bg-green-500",
      route: "/pesquisas",
    },
    {
      title: "Ações Inteligentes",
      description: "Campanhas sugeridas pela IA",
      icon: Zap,
      color: "bg-orange-500",
      route: "/acoes-inteligentes",
    },
    {
      title: "Resultados",
      description: "ROI e performance das ações",
      icon: Target,
      color: "bg-pink-500",
      route: "/resultados",
    },
    {
      title: "Relatórios",
      description: "Visualize seus diagnósticos",
      icon: FileText,
      color: "bg-indigo-500",
      route: "/relatorios",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo de volta, {empresa?.email?.split("@")[0] || empresa?.nome || "Usuário"}! 👋
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo da sua plataforma DataPay
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Fontes de Dados</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pesquisas Ativas</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ações Sugeridas</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Como Funciona */}
      <Card className="p-8 mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          Como a Plataforma Funciona
        </h2>
        <p className="text-gray-600 mb-6">
          Siga este fluxo de trabalho para transformar seus dados em a\u00e7\u00f5es que geram lucro:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Conecte seus Dados</h3>
            <p className="text-sm text-gray-600">
              Base de Conhecimento + Meus Dados
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-purple-400 hidden md:block" />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gere Insights com IA</h3>
            <p className="text-sm text-gray-600">
              An\u00e1lise da IA identifica gaps e oportunidades
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-purple-400 hidden md:block" />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Colete Mais Dados</h3>
            <p className="text-sm text-gray-600">
              Formul\u00e1rios Inteligentes + Pesquisas
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-purple-400 hidden md:block" />
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-3">
              4
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Execute Campanhas</h3>
            <p className="text-sm text-gray-600">
              A\u00e7\u00f5es Inteligentes sugeridas pela IA
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-purple-400 hidden md:block" />
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mb-3">
              5
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mea ROI</h3>
            <p className="text-sm text-gray-600">
              Resultados + Relat\u00f3rios
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Comece agora:</strong> Adicione informa\u00e7\u00f5es da sua empresa na Base de Conhecimento e conecte suas fontes de dados em Meus Dados.
            </span>
          </p>
        </div>
      </Card>

      {/* M\u00f3dulos */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          M\u00f3dulos da Plataforma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setLocation(card.route)}
              >
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-purple-600 hover:text-purple-700 hover:bg-transparent"
                >
                  Acessar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Comece Agora</h3>
            <p className="text-gray-600 mb-4">
              Para aproveitar ao máximo o DataPay, comece conectando suas fontes de dados.
            </p>
            <Button
              onClick={() => setLocation("/meus-dados")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Conectar Dados
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

