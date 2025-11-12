import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import {
  Sparkles,
  Database,
  TrendingUp,
  Brain,
  Zap,
  CheckCircle,
  ArrowRight,
  Shield,
  Lightbulb,
  Users,
  BarChart3,
  Target,
} from "lucide-react";

export default function StudioInicio() {
  const [, setLocation] = useLocation();

  const secoes = [
    {
      titulo: "O que são Dados Sintéticos?",
      descricao: "Dados gerados por IA que replicam padrões reais sem expor informações sensíveis",
      icon: Database,
      color: "from-purple-600 to-purple-400",
      items: [
        {
          titulo: "Realistas",
          descricao: "Mantêm a distribuição e padrões dos dados reais",
          icon: CheckCircle,
        },
        {
          titulo: "Privados",
          descricao: "Nenhuma informação pessoal ou sensível é exposta",
          icon: Shield,
        },
        {
          titulo: "Escaláveis",
          descricao: "Gere quantos registros precisar em segundos",
          icon: Zap,
        },
      ],
    },
    {
      titulo: "Como Funciona o DataPay Studio",
      descricao: "3 passos simples para transformar dados em inteligência",
      icon: Lightbulb,
      color: "from-pink-600 to-pink-400",
      items: [
        {
          numero: "1",
          titulo: "Configure",
          descricao: "Defina o tipo de dados, volume e parâmetros específicos",
          icon: Target,
        },
        {
          numero: "2",
          titulo: "Gere",
          descricao: "Deixe a IA criar dados sintéticos realistas em segundos",
          icon: Sparkles,
        },
        {
          numero: "3",
          titulo: "Simule",
          descricao: "Teste estratégias, campanhas e comportamentos com segurança",
          icon: TrendingUp,
        },
      ],
    },
    {
      titulo: "Ferramentas Disponíveis",
      descricao: "Tudo que você precisa para simular e validar estratégias",
      icon: Zap,
      color: "from-cyan-600 to-cyan-400",
      items: [
        {
          titulo: "Gerador de Dados",
          descricao: "Crie datasets sintéticos customizados com até 10M registros",
          icon: Database,
          path: "/studio/gerador",
        },
        {
          titulo: "Simulador de Campanhas",
          descricao: "Teste ROI de campanhas antes de investir recursos reais",
          icon: TrendingUp,
          path: "/studio/campanhas",
        },
        {
          titulo: "Simulador de Pesquisas",
          descricao: "Valide resultados de pesquisas com dados sintéticos realistas",
          icon: Users,
          path: "/studio/pesquisas",
        },
        {
          titulo: "Projetor de Comportamento",
          descricao: "Antecipe tendências e comportamentos de consumo futuros",
          icon: Brain,
          path: "/studio/comportamento",
        },
      ],
    },
    {
      titulo: "Casos de Uso Reais",
      descricao: "Como empresas estão usando dados sintéticos para inovar",
      icon: Target,
      color: "from-green-600 to-green-400",
      items: [
        {
          titulo: "E-commerce",
          descricao: "Teste estratégias de precificação e promoções sem risco",
          icon: BarChart3,
        },
        {
          titulo: "Marketing",
          descricao: "Simule campanhas multi-canal e otimize orçamento",
          icon: TrendingUp,
        },
        {
          titulo: "Pesquisa",
          descricao: "Valide hipóteses com amostras sintéticas antes de pesquisa real",
          icon: Users,
        },
      ],
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                DataPay Studio
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl">
              Ambiente completo para gerar dados sintéticos, simular estratégias e validar decisões com confiança. Sem risco, sem exposição de dados reais.
            </p>
          </div>

          {/* Seções */}
          <div className="space-y-16">
            {secoes.map((secao, idx) => {
              const SectionIcon = secao.icon;
              return (
                <div key={idx} className="space-y-8">
                  {/* Seção Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${secao.color} flex items-center justify-center`}>
                      <SectionIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{secao.titulo}</h2>
                      <p className="text-gray-600 mt-1">{secao.descricao}</p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className={`grid ${secao.items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
                    {secao.items.map((item, itemIdx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={itemIdx}
                          className="p-6 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                          onClick={() => item.path && setLocation(item.path)}
                        >
                          {/* Número ou Ícone */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${secao.color} flex items-center justify-center text-white font-bold`}>
                              {item.numero ? item.numero : <ItemIcon className="w-5 h-5" />}
                            </div>
                            {item.path && (
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                            )}
                          </div>

                          {/* Conteúdo */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {item.titulo}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.descricao}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-20 p-8 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-purple-100 mb-8 text-lg">
                Escolha uma ferramenta abaixo e comece a explorar o poder dos dados sintéticos em minutos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setLocation("/studio/gerador")}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-3"
                >
                  <Database className="w-5 h-5 mr-2" />
                  Gerar Dados
                </Button>
                <Button
                  onClick={() => setLocation("/studio/campanhas")}
                  className="bg-purple-700 text-white hover:bg-purple-800 font-semibold px-6 py-3"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Simular Campanha
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 p-6 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex gap-4">
              <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Dica: Comece com o Gerador</h3>
                <p className="text-blue-800 text-sm">
                  Se é sua primeira vez no Studio, recomendamos começar com o "Gerador de Dados". Ele vai te mostrar como criar dados sintéticos realistas em minutos, e você poderá usar esses dados para testar as outras ferramentas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

