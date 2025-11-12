import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Database, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Eye,
  Lock,
  Rocket,
  BarChart3,
  Users,
  Brain
} from "lucide-react";

export default function StudioInicio() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 blur-3xl" />
          
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Bem-vindo ao DataPay Studio</span>
              </div>
              
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Dados Sintéticos Inteligentes
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Crie, simule e valide dados realistas sem comprometer a privacidade. Transforme sua estratégia de dados com inteligência artificial.
              </p>
            </div>

            {/* What are Synthetic Data Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {/* Left: Explanation */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">O que são Dados Sintéticos?</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Dados sintéticos são informações artificialmente geradas que replicam as características estatísticas e comportamentais de dados reais, mantendo a privacidade e segurança.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/30">
                    <Lock className="w-6 h-6 text-purple-400 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">100% Privado</h3>
                    <p className="text-xs text-gray-400">Sem dados reais expostos</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-br from-pink-600/20 to-pink-600/5 border border-pink-500/30">
                    <Zap className="w-6 h-6 text-pink-400 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">Instantâneo</h3>
                    <p className="text-xs text-gray-400">Gerado em segundos</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30">
                    <BarChart3 className="w-6 h-6 text-cyan-400 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">Realista</h3>
                    <p className="text-xs text-gray-400">Padrões de dados reais</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30">
                    <Shield className="w-6 h-6 text-green-400 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">Seguro</h3>
                    <p className="text-xs text-gray-400">LGPD compliant</p>
                  </div>
                </div>
              </div>

              {/* Right: Visual Example */}
              <div className="space-y-6">
                <div className="p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700">
                  <h3 className="font-semibold mb-6 text-lg">Exemplo de Geração</h3>
                  
                  {/* Before and After */}
                  <div className="space-y-6">
                    {/* Input */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Você configura:</p>
                      <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-600">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tipo de Dados:</span>
                            <span className="text-purple-400 font-semibold">Clientes E-commerce</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Volume:</span>
                            <span className="text-pink-400 font-semibold">100.000 registros</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Região:</span>
                            <span className="text-cyan-400 font-semibold">Brasil</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30">
                        <ArrowRight className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Você recebe:</p>
                      <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-600">
                        <div className="space-y-2 text-xs font-mono text-green-400">
                          <div>{"{"}</div>
                          <div className="ml-4">id: "USR-001",</div>
                          <div className="ml-4">nome: "Maria Silva",</div>
                          <div className="ml-4">email: "maria.silva@email.com",</div>
                          <div className="ml-4">cidade: "São Paulo",</div>
                          <div className="ml-4">compras: 15,</div>
                          <div className="ml-4">ticket_medio: 245.50</div>
                          <div>{"}"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Configure",
                    description: "Defina o tipo de dados, volume e características",
                    icon: Database,
                    color: "from-purple-600 to-purple-400"
                  },
                  {
                    step: "2",
                    title: "Gere",
                    description: "IA cria dados realistas em segundos",
                    icon: Sparkles,
                    color: "from-pink-600 to-pink-400"
                  },
                  {
                    step: "3",
                    title: "Simule",
                    description: "Teste campanhas e estratégias",
                    icon: Brain,
                    color: "from-cyan-600 to-cyan-400"
                  },
                  {
                    step: "4",
                    title: "Otimize",
                    description: "Tome decisões baseadas em dados",
                    icon: Rocket,
                    color: "from-green-600 to-green-400"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 h-full">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm text-gray-400 mb-2">Passo {item.step}</div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      
                      {/* Arrow between steps */}
                      {idx < 3 && (
                        <div className="hidden md:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                          <div className="p-1 rounded-full bg-gray-800 border border-gray-700">
                            <ArrowRight className="w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">Casos de Uso</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Simular Campanhas",
                    description: "Teste diferentes estratégias de marketing antes de executar",
                    icon: BarChart3,
                    benefits: ["ROI estimado", "Análise de risco", "Comparação de cenários"]
                  },
                  {
                    title: "Validar Pesquisas",
                    description: "Valide hipóteses e testes A/B com dados sintéticos",
                    icon: Users,
                    benefits: ["Testes rápidos", "Sem custo", "Resultados confiáveis"]
                  },
                  {
                    title: "Projetar Comportamento",
                    description: "Projete tendências de consumo e comportamento futuro",
                    icon: Brain,
                    benefits: ["Previsões precisas", "Análise de trends", "Decisões inteligentes"]
                  }
                ].map((useCase, idx) => {
                  const Icon = useCase.icon;
                  return (
                    <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                      <div className="space-y-2">
                        {useCase.benefits.map((benefit, bidx) => (
                          <div key={bidx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-6 py-12 px-6 rounded-xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 border border-purple-500/30">
              <h2 className="text-3xl font-bold">Pronto para Começar?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Escolha uma ferramenta abaixo e comece a criar, simular e otimizar seus dados com inteligência artificial.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-6">
                  <Database className="w-5 h-5 mr-2" />
                  Gerar Dados
                </Button>
                <Button className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-6">
                  <Zap className="w-5 h-5 mr-2" />
                  Simular Campanha
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

