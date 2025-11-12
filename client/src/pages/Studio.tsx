import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, BarChart3, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import StudioLayout from "@/components/StudioLayout";
import StudioLoadingAnimation from "@/components/StudioLoadingAnimation";

export default function Studio() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento do Studio
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const tools = [
    {
      id: "gerador",
      title: "🧪 Gerador de Dados",
      description: "Crie datasets sintéticos realistas com parâmetros customizáveis",
      features: ["Até 10M registros", "Múltiplas regiões", "Sazonalidade", "Calibração real"],
      icon: Lightbulb,
      color: "from-purple-600 to-purple-400",
      path: "/laboratorio/gerador",
    },
    {
      id: "simulador",
      title: "🎯 Simulador",
      description: "Simule campanhas e veja o ROI estimado antes de executar",
      features: ["Cenários múltiplos", "ROI em tempo real", "Análise de risco", "Comparação"],
      icon: TrendingUp,
      color: "from-pink-600 to-pink-400",
      path: "/laboratorio/simulador",
    },
    {
      id: "testador",
      title: "🔬 Testador",
      description: "Valide seus dados e campanhas com testes automatizados",
      features: ["Testes A/B", "Validação de dados", "Qualidade", "Relatórios"],
      icon: BarChart3,
      color: "from-cyan-600 to-cyan-400",
      path: "/laboratorio/testador",
    },
    {
      id: "validador",
      title: "✅ Validador",
      description: "Garanta a qualidade e conformidade dos seus dados",
      features: ["LGPD compliance", "Integridade", "Duplicatas", "Anomalias"],
      icon: CheckCircle2,
      color: "from-green-600 to-green-400",
      path: "/laboratorio/validador",
    },
  ];

  return (
    <StudioLayout>
      <StudioLoadingAnimation isLoading={isLoading} />
      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-12 transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              DataPay Studio
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ambiente completo para gerar, simular e validar dados sintéticos com IA
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {[
              { label: "Ferramentas", value: "4" },
              { label: "Datasets", value: "∞" },
              { label: "Acurácia", value: "94%" },
              { label: "ROI", value: "+300%" },
            ].map((stat) => (
              <Card key={stat.label} className="bg-gray-800/50 border-gray-700 p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden group"
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${tool.color}`} />

                  <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {tool.description}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 space-y-2">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.color}`} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => navigate(tool.path)}
                      className={`w-full bg-gradient-to-r ${tool.color} text-white border-0 hover:opacity-90 transition-all group-hover:gap-2`}
                    >
                      Acessar
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-7xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/50 p-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  O que é DataPay Studio?
                </h3>
                <p className="text-gray-300">
                  Um ambiente integrado para transformar dados em ações inteligentes. Gere dados sintéticos realistas, simule campanhas com ROI, valide qualidade e tome decisões baseadas em dados antes de executar qualquer ação no mercado.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </StudioLayout>
  );
}

