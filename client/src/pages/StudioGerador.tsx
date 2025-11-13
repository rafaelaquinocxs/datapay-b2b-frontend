import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Database,
  Plus,
  Settings,
  Download,
  Eye,
  Zap,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { useDatasets } from "@/hooks/useStudio";
import { toast } from "sonner";

export default function StudioGerador() {
  const [activeTab, setActiveTab] = useState("config");
  const { datasets, isLoading, generateDataset, listDatasets } = useDatasets();
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tipo: "clientes" as const,
    quantidade: 100000,
    regiao: "Brasil",
    sazonalidade: "Sazonal",
  });

  // Carregar datasets ao montar
  useEffect(() => {
    listDatasets();
  }, []);

  const handleGenerateDataset = async () => {
    if (!formData.nome.trim()) {
      toast.error("Por favor, insira um nome para o dataset");
      return;
    }

    await generateDataset({
      nome: formData.nome,
      descricao: formData.descricao,
      tipo: formData.tipo,
      quantidade: formData.quantidade,
      regiao: formData.regiao,
      sazonalidade: formData.sazonalidade,
    });

    // Limpar formulário
    setFormData({
      nome: "",
      descricao: "",
      tipo: "clientes",
      quantidade: 100000,
      regiao: "Brasil",
      sazonalidade: "Sazonal",
    });
  };

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
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Nome do Dataset
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Clientes Brasileiros 2024"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Descrição (Opcional)
                  </label>
                  <textarea
                    placeholder="Descreva o propósito deste dataset..."
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 h-20"
                  />
                </div>

                {/* Dataset Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Tipo de Dataset
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "clientes", name: "Clientes", desc: "Dados de clientes" },
                      { id: "transacoes", name: "Transações", desc: "Histórico de vendas" },
                      { id: "comportamento", name: "Comportamento", desc: "Padrões de uso" },
                      { id: "pesquisa", name: "Pesquisa", desc: "Respostas de survey" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, tipo: type.id as any })}
                        className={`p-4 border-2 rounded-lg transition-all text-left ${
                          formData.tipo === type.id
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-600 hover:bg-purple-50"
                        }`}
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
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    {(formData.quantidade / 1000000).toFixed(1)} milhões de registros
                  </p>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Região/País
                  </label>
                  <select
                    value={formData.regiao}
                    onChange={(e) => setFormData({ ...formData, regiao: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  >
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
                    {["Nenhuma", "Sazonal", "Cíclica", "Tendência"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, sazonalidade: opt })}
                        className={`flex-1 px-4 py-2 border rounded-lg transition-all text-sm font-medium ${
                          formData.sazonalidade === opt
                            ? "border-purple-600 bg-purple-50 text-purple-900"
                            : "border-gray-300 hover:border-purple-600 hover:bg-purple-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleGenerateDataset}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white border-0 hover:opacity-90 py-6 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Gerando Dataset...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Gerar Dataset
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right - Features & Datasets */}
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

            {/* Datasets List */}
            {datasets.length > 0 && (
              <Card className="bg-white border-0 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  Meus Datasets ({datasets.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {datasets.map((dataset) => (
                    <div key={dataset.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-semibold text-gray-900">{dataset.nome}</p>
                      <p className="text-gray-600 text-xs">
                        {dataset.quantidade.toLocaleString()} registros • {dataset.tipo}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Status: <span className="text-green-600 font-semibold">{dataset.status}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

