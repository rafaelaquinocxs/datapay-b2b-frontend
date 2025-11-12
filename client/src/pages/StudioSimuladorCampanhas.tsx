import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Target,
  BarChart3,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function StudioSimuladorCampanhas() {
  const [selectedScenario, setSelectedScenario] = useState("otimista");

  const scenarios = [
    {
      id: "pessimista",
      name: "Cenário Pessimista",
      description: "Pior caso possível",
      roi: "-15%",
      color: "from-red-600 to-red-400",
    },
    {
      id: "realista",
      name: "Cenário Realista",
      description: "Expectativa média",
      roi: "+45%",
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "otimista",
      name: "Cenário Otimista",
      description: "Melhor caso possível",
      roi: "+120%",
      color: "from-green-600 to-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-600 to-pink-400 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Simulador de Campanhas</h1>
            <p className="text-gray-600 mt-1">
              Teste estratégias e veja o ROI antes de investir
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Configuration */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-0 shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">Configurar Campanha</h2>
            </div>

            <div className="space-y-6">
              {/* Campaign Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Tipo de Campanha
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Email", icon: "📧" },
                    { name: "Social Media", icon: "📱" },
                    { name: "Anúncios", icon: "📢" },
                    { name: "SMS", icon: "💬" },
                  ].map((type, idx) => (
                    <button
                      key={idx}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-600 hover:bg-pink-50 transition-all text-left"
                    >
                      <p className="text-2xl mb-1">{type.icon}</p>
                      <p className="font-semibold text-gray-900">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Orçamento (R$)
                </label>
                <input
                  type="number"
                  placeholder="10000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Público-alvo
                </label>
                <div className="space-y-2">
                  {["18-25 anos", "26-35 anos", "36-50 anos", "50+ anos"].map((age, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-gray-700">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Duração (dias)
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* CTA */}
              <Button className="w-full bg-gradient-to-r from-pink-600 to-pink-400 text-white border-0 hover:opacity-90 py-6 text-lg font-semibold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Simular Campanha
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>

          {/* Scenarios */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cenários de Resultado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className={`bg-white border-2 shadow-sm p-6 cursor-pointer transition-all ${
                    selectedScenario === scenario.id
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <h4 className="font-bold text-gray-900 mb-1">{scenario.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${scenario.color} bg-clip-text text-transparent`}>
                    {scenario.roi}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Results Preview */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink-600" />
              Resultado Estimado
            </h3>
            <div className="space-y-4">
              {[
                { label: "Impressões", value: "2.5M" },
                { label: "Cliques", value: "125K" },
                { label: "Conversões", value: "4.5K" },
                { label: "ROI Estimado", value: "+45%" },
              ].map((metric, idx) => (
                <div key={idx}>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Insights
            </h3>
            <div className="space-y-3">
              {[
                "Melhor dia: Quinta-feira",
                "Melhor horário: 19h-21h",
                "Público mais responsivo: 26-35 anos",
                "Recomendação: Aumentar orçamento",
              ].map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

