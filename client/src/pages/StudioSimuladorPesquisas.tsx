import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  BarChart3,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Zap,
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function StudioSimuladorPesquisas() {
  const [questions, setQuestions] = useState([
    { id: 1, text: "Qual é sua satisfação com nosso produto?" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Simulador de Pesquisas</h1>
            <p className="text-gray-600 mt-1">
              Projete resultados de surveys antes de executar
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
              <BarChart3 className="w-6 h-6 text-cyan-600" />
              <h2 className="text-2xl font-bold text-gray-900">Configurar Pesquisa</h2>
            </div>

            <div className="space-y-6">
              {/* Survey Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Tipo de Pesquisa
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Satisfação", desc: "NPS/CSAT" },
                    { name: "Mercado", desc: "Pesquisa de mercado" },
                    { name: "Produto", desc: "Feedback de produto" },
                    { name: "Comportamento", desc: "Padrões de uso" },
                  ].map((type, idx) => (
                    <button
                      key={idx}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-cyan-600 hover:bg-cyan-50 transition-all text-left"
                    >
                      <p className="font-semibold text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Tamanho da Amostra
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">Aproximadamente 1.000 respondentes</p>
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Perguntas
                  </label>
                  <Button className="bg-cyan-600 text-white hover:bg-cyan-700 border-0 text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div key={q.id} className="p-4 border border-gray-300 rounded-lg">
                      <p className="text-gray-900 font-medium">{q.text}</p>
                      <p className="text-xs text-gray-600 mt-2">Tipo: Escala Likert (1-5)</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demographics */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Segmentação
                </label>
                <div className="space-y-2">
                  {["Por idade", "Por gênero", "Por região", "Por renda"].map((seg, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-gray-700">{seg}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-white border-0 hover:opacity-90 py-6 text-lg font-semibold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Simular Pesquisa
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right - Results Preview */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-600" />
              Resultado Estimado
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Satisfação Média</p>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-cyan-600">4.2</div>
                  <div className="text-sm text-gray-600">/5.0</div>
                </div>
              </div>
              <div className="pt-4 border-t border-cyan-200">
                <p className="text-sm text-gray-600 mb-2">Distribuição de Respostas</p>
                <div className="space-y-2">
                  {[
                    { label: "Muito Satisfeito", pct: 45 },
                    { label: "Satisfeito", pct: 35 },
                    { label: "Neutro", pct: 15 },
                    { label: "Insatisfeito", pct: 5 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-semibold text-gray-900">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-2 rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Recomendações
            </h3>
            <div className="space-y-3">
              {[
                "Viés detectado em 2 perguntas",
                "Recomenda-se aumentar amostra",
                "Segmento 25-35 mais responsivo",
                "Considere adicionar pergunta aberta",
              ].map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

