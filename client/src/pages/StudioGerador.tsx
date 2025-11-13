import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Database,
  Plus,
  Settings,
  Download,
  Eye,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

export default function StudioGerador() {
  const [activeTab, setActiveTab] = useState("config");

  return (
    <PageTransition duration={300}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
            <Database className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gerador de Dados Sintéticos</h1>
            <p className="text-gray-600 mt-1">
              Crie datasets realistas sem usar dados pessoais
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Registros Máximos", value: "10M+", icon: "📊" },
          { label: "Regiões Suportadas", value: "150+", icon: "🌍" },
          { label: "Tempo de Geração", value: "<5min", icon: "⚡" },
          { label: "Taxa de Realismo", value: "99.8%", icon: "🎯" },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-white border-0 shadow-sm p-6">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Configuration */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-0 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Configurar Dataset</h2>
            </div>

            <div className="space-y-6">
              {/* Dataset Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Tipo de Dataset
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Clientes", desc: "Dados de clientes" },
                    { name: "Transações", desc: "Histórico de vendas" },
                    { name: "Comportamento", desc: "Padrões de uso" },
                    { name: "Pesquisa", desc: "Respostas de survey" },
                  ].map((type, idx) => (
                    <button
                      key={idx}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all text-left"
                    >
                      <p className="font-semibold text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Volume de Registros
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="100000"
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">Aproximadamente 1 milhão de registros</p>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Região/País
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Brasil</option>
                  <option>América Latina</option>
                  <option>Global</option>
                </select>
              </div>

              {/* Seasonality */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Sazonalidade
                </label>
                <div className="flex gap-3">
                  {["Nenhuma", "Sazonal", "Cíclica", "Tendência"].map((opt, idx) => (
                    <button
                      key={idx}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all text-sm font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white border-0 hover:opacity-90 py-6 text-lg font-semibold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Gerar Dataset
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right - Features */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recursos Inclusos</h3>
            <div className="space-y-3">
              {[
                "Múltiplas regiões",
                "Sazonalidade real",
                "Calibração automática",
                "Validação de dados",
                "Exportação em CSV/JSON",
                "Histórico de gerações",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              Exemplo de Saída
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
              <pre>{`{
  "id": "cust_8293",
  "name": "Maria Silva",
  "email": "maria@...",
  "region": "São Paulo",
  "created": "2024-01-15",
  "purchases": 12,
  "ltv": 4250.00
}`}</pre>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </PageTransition>
  );
}

