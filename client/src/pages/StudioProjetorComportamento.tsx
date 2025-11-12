import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  LineChart,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function StudioProjetorComportamento() {
  const [timeframe, setTimeframe] = useState("6m");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Projetor de Comportamento</h1>
            <p className="text-gray-600 mt-1">
              A IA mais avançada para simular comportamento de consumo
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
              <LineChart className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Configurar Projeção</h2>
            </div>

            <div className="space-y-6">
              {/* Behavior Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Tipo de Comportamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Compra", desc: "Padrão de compra" },
                    { name: "Navegação", desc: "Jornada do cliente" },
                    { name: "Retenção", desc: "Churn prediction" },
                    { name: "Recomendação", desc: "Cross-sell/Upsell" },
                  ].map((type, idx) => (
                    <button
                      key={idx}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all text-left"
                    >
                      <p className="font-semibold text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Market Segment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Segmento de Mercado
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>E-commerce</option>
                  <option>Varejo Físico</option>
                  <option>Serviços</option>
                  <option>SaaS</option>
                  <option>Outro</option>
                </select>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Período de Projeção
                </label>
                <div className="flex gap-2">
                  {["3m", "6m", "12m", "24m"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeframe(period)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        timeframe === period
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:border-green-600"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variables */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Variáveis Externas
                </label>
                <div className="space-y-2">
                  {[
                    "Sazonalidade",
                    "Tendências de mercado",
                    "Concorrência",
                    "Fatores econômicos",
                  ].map((var_name, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span className="text-gray-700">{var_name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white border-0 hover:opacity-90 py-6 text-lg font-semibold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Gerar Projeção
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right - Results Preview */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Projeção de 6 Meses
            </h3>
            <div className="space-y-4">
              {[
                { label: "Crescimento Esperado", value: "+32%", color: "text-green-600" },
                { label: "Taxa de Retenção", value: "78%", color: "text-blue-600" },
                { label: "Ticket Médio", value: "+18%", color: "text-green-600" },
                { label: "Confiança da Projeção", value: "94%", color: "text-purple-600" },
              ].map((metric, idx) => (
                <div key={idx}>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Oportunidades
            </h3>
            <div className="space-y-3">
              {[
                "Pico de demanda em março",
                "Segmento 30-40 em crescimento",
                "Oportunidade de upsell",
                "Risco de churn em Q4",
              ].map((opp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{opp}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-blue-50 border border-blue-200 p-6">
            <h3 className="font-bold text-gray-900 mb-3">Metodologia</h3>
            <p className="text-sm text-gray-700">
              Usa machine learning com dados de bilhões de comportamentos para criar projeções
              altamente precisas de comportamento de consumo.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

