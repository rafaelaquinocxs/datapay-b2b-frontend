import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Laboratorio() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'generator',
      title: '1️⃣ Gerador de Dados Sintéticos',
      description: 'Cria datasets sintéticos realistas baseado em dados reais',
      icon: '🧬',
      color: 'bg-purple-50',
    },
    {
      id: 'simulator',
      title: '2️⃣ Simulador de Campanhas',
      description: 'Testa campanhas em dados sintéticos antes de executar',
      icon: '🎯',
      color: 'bg-blue-50',
    },
    {
      id: 'tester',
      title: '3️⃣ Testador de Insights',
      description: 'Valida insights em dados sintéticos',
      icon: '💡',
      color: 'bg-yellow-50',
    },
    {
      id: 'validator',
      title: '4️⃣ Validador de Pesquisas',
      description: 'Prevê taxa de resposta de pesquisas',
      icon: '📋',
      color: 'bg-green-50',
    },
    {
      id: 'predictor',
      title: '5️⃣ Previsor de Resultados',
      description: 'Prevê resultados de ações antes de executar',
      icon: '🔮',
      color: 'bg-pink-50',
    },
    {
      id: 'history',
      title: '6️⃣ Histórico de Simulações',
      description: 'Veja todas as simulações e taxa de acerto da IA',
      icon: '📊',
      color: 'bg-indigo-50',
    },
  ];

  const simulationHistory = [
    { id: 1, type: 'Campanha', name: 'Retenção VIP', predicted: 'R$ 245k', actual: 'R$ 240k', accuracy: '98%', status: '✅' },
    { id: 2, type: 'Insight', name: 'Ciclo de Vida', predicted: '2.1x', actual: '2.0x', accuracy: '95%', status: '✅' },
    { id: 3, type: 'Pesquisa', name: 'NPS', predicted: '78%', actual: '82%', accuracy: '96%', status: '✅' },
    { id: 4, type: 'Ação', name: 'Email Marketing', predicted: '45%', actual: '42%', accuracy: '93%', status: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🧪</span>
            <h1 className="text-4xl font-bold text-gray-900">Laboratório</h1>
          </div>
          <p className="text-lg text-gray-600">
            Teste, simule e valide tudo antes de executar no mundo real
          </p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Dados Sintéticos</p>
                <p className="text-3xl font-bold text-purple-600">100k</p>
                <p className="text-xs text-gray-500 mt-2">clientes gerados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Simulações</p>
                <p className="text-3xl font-bold text-blue-600">47</p>
                <p className="text-xs text-gray-500 mt-2">este mês</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Taxa de Acerto</p>
                <p className="text-3xl font-bold text-green-600">89%</p>
                <p className="text-xs text-gray-500 mt-2">da IA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Últimas Simulações</p>
                <p className="text-3xl font-bold text-pink-600">3h</p>
                <p className="text-xs text-gray-500 mt-2">atrás</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Ferramentas</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className={`${tool.color} border-2 hover:shadow-lg transition-shadow cursor-pointer`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription className="mt-2">{tool.description}</CardDescription>
                      </div>
                      <span className="text-3xl">{tool.icon}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => {
                        setSelectedTool(tool.id);
                        setShowModal(true);
                      }}
                      className="w-full"
                    >
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            {/* Simulation History */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Simulações</CardTitle>
                <CardDescription>Taxa de acerto: 89% (35/39 simulações)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                        <th className="text-left py-3 px-4 font-semibold">Nome</th>
                        <th className="text-left py-3 px-4 font-semibold">Previsão</th>
                        <th className="text-left py-3 px-4 font-semibold">Real</th>
                        <th className="text-left py-3 px-4 font-semibold">Acerto</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {simulationHistory.map((sim) => (
                        <tr key={sim.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{sim.type}</td>
                          <td className="py-3 px-4">{sim.name}</td>
                          <td className="py-3 px-4 font-semibold">{sim.predicted}</td>
                          <td className="py-3 px-4 font-semibold">{sim.actual}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-green-50">{sim.accuracy}</Badge>
                          </td>
                          <td className="py-3 px-4">{sim.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {tools.find((t) => t.id === selectedTool)?.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {tools.find((t) => t.id === selectedTool)?.description}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTool === 'generator' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipo de Dados</label>
                      <select className="w-full border rounded px-3 py-2">
                        <option>Clientes</option>
                        <option>Transações</option>
                        <option>Interações</option>
                        <option>Respostas de Pesquisa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quantidade</label>
                      <select className="w-full border rounded px-3 py-2">
                        <option>10.000</option>
                        <option>100.000</option>
                        <option>1.000.000</option>
                        <option>10.000.000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Características</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" /> Idade
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" /> Localização
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" /> Histórico de Compra
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" /> Comportamento Online
                        </label>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Gerar Dados Sintéticos
                    </Button>
                  </div>
                )}

                {selectedTool === 'simulator' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome da Campanha</label>
                      <Input placeholder="Ex: Retenção VIP" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        placeholder="Descreva a campanha..."
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Simular Campanha
                    </Button>
                  </div>
                )}

                {selectedTool === 'tester' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição do Insight</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        placeholder="Descreva o insight a testar..."
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                      Testar Insight
                    </Button>
                  </div>
                )}

                {selectedTool === 'validator' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição da Pesquisa</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        placeholder="Descreva a pesquisa..."
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Validar Pesquisa
                    </Button>
                  </div>
                )}

                {selectedTool === 'predictor' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição da Ação</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        placeholder="Descreva a ação..."
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Prever Resultados
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
