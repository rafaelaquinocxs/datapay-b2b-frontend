import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Brain,
  TrendingUp,
  Shield,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  BarChart3,
} from "lucide-react";
import { Link } from "wouter";

export default function StudioInicio() {
  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Gerador de Dados Sintéticos",
      description:
        "Crie datasets realistas sem usar dados pessoais. Perfeito para testes, treinamentos e simulações.",
      benefits: [
        "Até 10 milhões de registros",
        "Múltiplas regiões e contextos",
        "Sazonalidade e padrões reais",
        "Calibração com seus dados",
      ],
      path: "/studio/gerador",
      color: "from-purple-600 to-purple-400",
      icon_bg: "bg-purple-100",
      icon_color: "text-purple-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Simulador de Campanhas",
      description:
        "Teste estratégias de marketing antes de investir. Veja o ROI estimado em tempo real.",
      benefits: [
        "Cenários múltiplos",
        "ROI em tempo real",
        "Análise de risco",
        "Comparação de estratégias",
      ],
      path: "/studio/simulador-campanhas",
      color: "from-pink-600 to-pink-400",
      icon_bg: "bg-pink-100",
      icon_color: "text-pink-600",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Simulador de Pesquisas",
      description:
        "Projete resultados de pesquisas e surveys antes de executar. Otimize suas questões e públicos.",
      benefits: [
        "Previsão de respostas",
        "Análise de viés",
        "Otimização de perguntas",
        "Segmentação inteligente",
      ],
      path: "/studio/simulador-pesquisas",
      color: "from-cyan-600 to-cyan-400",
      icon_bg: "bg-cyan-100",
      icon_color: "text-cyan-600",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Projetor de Comportamento",
      description:
        "A IA mais avançada do mundo para simular comportamento de consumo. Antecipe tendências e decisões.",
      benefits: [
        "Comportamento de consumo",
        "Previsão de tendências",
        "Análise preditiva",
        "Inteligência de mercado",
      ],
      path: "/studio/projetor-comportamento",
      color: "from-green-600 to-green-400",
      icon_bg: "bg-green-100",
      icon_color: "text-green-600",
    },
  ];

  const syntethicDataBenefits = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Privacidade Total",
      description: "Zero exposição de dados pessoais ou sensíveis",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Velocidade",
      description: "Resultados em minutos, não em semanas",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Precisão",
      description: "Comportamentos realistas baseados em padrões reais",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Inteligência",
      description: "IA treinada em bilhões de comportamentos",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Lightbulb className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">DataPay Studio</h1>
            <p className="text-gray-600 mt-1">
              Transforme dados em inteligência com IA Sintética
            </p>
          </div>
        </div>
      </div>

      {/* O que é Dados Sintéticos */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-8 mb-12">
        <div className="flex gap-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              O que são Dados Sintéticos?
            </h2>
            <p className="text-gray-700 mb-4">
              Dados sintéticos são informações geradas por inteligência artificial que replicam
              comportamentos e padrões reais, mas sem usar dados pessoais ou sensíveis. Eles são
              indistinguíveis dos dados reais em termos de qualidade e utilidade, mas garantem
              100% de privacidade.
            </p>
            <p className="text-gray-700">
              No DataPay Studio, usamos a IA mais avançada do mundo para criar dados sintéticos
              que refletem exatamente o comportamento do seu mercado, seus clientes e suas
              campanhas — permitindo que você teste, simule e otimize antes de investir.
            </p>
          </div>
        </div>
      </Card>

      {/* Benefícios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {syntethicDataBenefits.map((benefit, idx) => (
          <Card key={idx} className="bg-white border-0 shadow-sm p-6 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 text-purple-600`}>
              {benefit.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </Card>
        ))}
      </div>

      {/* Como Funciona */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "1",
              title: "Configure",
              description: "Defina os parâmetros e contexto da simulação",
            },
            {
              step: "2",
              title: "Gere",
              description: "A IA cria dados sintéticos realistas em segundos",
            },
            {
              step: "3",
              title: "Simule",
              description: "Teste campanhas, pesquisas e comportamentos",
            },
            {
              step: "4",
              title: "Otimize",
              description: "Tome decisões baseadas em dados antes de investir",
            },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <Card className="bg-white border-0 shadow-sm p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Card>
              {idx < 3 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-purple-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ferramentas */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossas Ferramentas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.path}>
              <Card className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer h-full">
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${feature.color}`} />

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${feature.icon_bg} flex items-center justify-center mb-4 ${feature.icon_color} group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button className={`w-full bg-gradient-to-r ${feature.color} text-white border-0 hover:opacity-90 transition-all flex items-center justify-center gap-2 group/btn`}>
                    Acessar Ferramenta
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 p-12 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-purple-100 mb-8">
            Escolha uma ferramenta acima e comece a simular resultados com dados sintéticos.
            Todos os testes são confidenciais e não afetam seus dados reais.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 border-0 font-semibold">
              Explorar Ferramentas
            </Button>
            <Button className="bg-purple-700 text-white hover:bg-purple-800 border-0 font-semibold">
              Ver Documentação
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

