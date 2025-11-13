import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Database,
  Brain,
  Zap,
  ArrowRight,
  BarChart3,
  Users,
  Sparkles,
  CheckCircle,
  Lightbulb,
  Target,
  Rocket,
  Shield,
  Clock,
  BookOpen,
  Eye,
} from "lucide-react";

export default function Inicio() {
  const [, setLocation] = useLocation();
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const usuarioJson = localStorage.getItem("usuario");
    if (usuarioJson) {
      setUsuario(JSON.parse(usuarioJson));
    }
  }, []);

  // Seções de valor - educação sobre como usar o sistema
  const secoeValor = [
    {
      titulo: "Guia Rápido: Como Começar",
      descricao: "Entenda os 3 pilares do DataPay em 5 minutos",
      icon: Lightbulb,
      color: "from-purple-600 to-purple-400",
      items: [
        {
          numero: "1",
          titulo: "Conectar",
          descricao: "Integre suas fontes de dados (SAP, Salesforce, CSV, APIs)",
          icon: Database,
        },
        {
          numero: "2",
          titulo: "Analisar",
          descricao: "Deixe a IA gerar insights automáticos e recomendações",
          icon: Brain,
        },
        {
          numero: "3",
          titulo: "Executar",
          descricao: "Implemente ações inteligentes e acompanhe o ROI em tempo real",
          icon: Rocket,
        },
      ],
    },
    {
      titulo: "Recursos Principais",
      descricao: "Ferramentas poderosas para transformar dados em ação",
      icon: Sparkles,
      color: "from-pink-600 to-pink-400",
      items: [
        {
          titulo: "Visão 360",
          descricao: "Visualize todos os seus dados conectados em um único lugar",
          icon: Eye,
          path: "/visao-360",
        },
        {
          titulo: "DataPay Studio",
          descricao: "Crie dados sintéticos, simule campanhas e projete comportamentos",
          icon: Zap,
          path: "/studio-loading",
        },
        {
          titulo: "Inteligência de Dados",
          descricao: "Análises profundas com IA, benchmarks e copiloto inteligente",
          icon: Brain,
          path: "/analise-ia",
        },
      ],
    },
    {
      titulo: "Casos de Uso",
      descricao: "Veja como empresas estão transformando dados em resultados",
      icon: Target,
      color: "from-cyan-600 to-cyan-400",
      items: [
        {
          titulo: "Otimizar Campanhas",
          descricao: "Teste estratégias com dados sintéticos antes de investir",
          icon: TrendingUp,
        },
        {
          titulo: "Validar Pesquisas",
          descricao: "Simule resultados de pesquisas e surveys com precisão",
          icon: Users,
        },
        {
          titulo: "Prever Comportamento",
          descricao: "Projete tendências de consumo e antecipe decisões do mercado",
          icon: Brain,
        },
      ],
    },
    {
      titulo: "Segurança e Conformidade",
      descricao: "Seus dados estão protegidos com os mais altos padrões",
      icon: Shield,
      color: "from-green-600 to-green-400",
      items: [
        {
          titulo: "LGPD Compliant",
          descricao: "Conformidade total com a Lei Geral de Proteção de Dados",
          icon: CheckCircle,
        },
        {
          titulo: "Criptografia End-to-End",
          descricao: "Seus dados são criptografados em trânsito e em repouso",
          icon: Shield,
        },
        {
          titulo: "Auditoria Completa",
          descricao: "Rastreie todas as ações e acessos aos seus dados",
          icon: Clock,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Bem-vindo ao DataPay, {usuario?.nome?.split(" ")[0]}!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Transforme seus dados em inteligência acionável. Conecte, analise e execute estratégias baseadas em dados com confiança.
          </p>
        </div>

        {/* Seções de Valor */}
        <div className="space-y-16">
          {secoeValor.map((secao, idx) => {
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

                {/* Seção Items Grid */}
                <div className="grid md:grid-cols-3 gap-6">
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
              Conecte sua primeira fonte de dados e veja como o DataPay pode transformar sua estratégia em minutos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setLocation("/conectar-dados")}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-3"
              >
                <Database className="w-5 h-5 mr-2" />
                Conectar Dados
              </Button>
              <Button
                onClick={() => setLocation("/studio-loading")}
                className="bg-purple-700 text-white hover:bg-purple-800 font-semibold px-6 py-3"
              >
                <Zap className="w-5 h-5 mr-2" />
                Explorar Studio
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 p-6 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex gap-4">
            <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Dica: Comece com o Guia Rápido</h3>
              <p className="text-blue-800 text-sm">
                Se é sua primeira vez usando o DataPay, recomendamos começar com a seção "Guia Rápido: Como Começar" acima. Ela vai te guiar através dos 3 pilares principais do sistema em apenas 5 minutos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

