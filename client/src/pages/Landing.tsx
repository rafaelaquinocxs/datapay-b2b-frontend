import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, Menu, X, CheckCircle2, ArrowRight, Zap, Brain, BarChart3, TrendingUp, Users, Shield, Database, Lock, Gauge } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (provider: string) => {
    const clientId = import.meta.env[`VITE_${provider.toUpperCase()}_CLIENT_ID`];
    if (!clientId) {
      setLocation("/dashboard");
      return;
    }
    console.log(`Login com ${provider}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="font-bold text-lg text-gray-900">DataPay</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#solucao" className="text-gray-700 hover:text-purple-600 font-medium">Solução</a>
            <a href="#como-funciona" className="text-gray-700 hover:text-purple-600 font-medium">Como Funciona</a>
            <a href="#laboratorio" className="text-gray-700 hover:text-purple-600 font-medium">Laboratório</a>
            <a href="#beneficios" className="text-gray-700 hover:text-purple-600 font-medium">Benefícios</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setShowLoginModal(true)}>Entrar</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white">
              Peça uma Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-green-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transforme Dados em <span className="bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">Decisões Estratégicas</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  DataPay é a plataforma completa que organiza, estrutura e transforma seus dados em ações inteligentes que impulsionam crescimento real. De empresas em crescimento a corporações de 50M+, nós entendemos seus desafios.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white text-lg h-14"
                  onClick={() => setShowLoginModal(true)}
                >
                  Comece Agora <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 border-2 border-gray-300 hover:border-purple-600"
                >
                  Agendar Demonstração
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <p className="text-sm text-gray-600">Empresas em crescimento</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">90%</div>
                  <p className="text-sm text-gray-600">Satisfação de clientes</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <p className="text-sm text-gray-600">Suporte dedicado</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-green-400 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-purple-100 to-green-100 rounded-3xl p-0 h-full overflow-hidden border-2 border-purple-200 shadow-2xl">
                <img 
                  src="/executivo-hero.jpg" 
                  alt="Executivo transformando dados em resultados"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <section id="solucao" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O Desafio dos Dados Desorganizados
            </h2>
            <p className="text-xl text-gray-600">
              Seus dados estão espalhados em múltiplos sistemas. Você não sabe quais insights importam. As decisões são baseadas em intuição, não em dados. E o tempo passa enquanto seus concorrentes avançam.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Dados Desorganizados", desc: "Informações espalhadas em múltiplos sistemas sem integração" },
              { icon: Brain, title: "Falta de Insights", desc: "Impossível identificar oportunidades e gaps nos dados" },
              { icon: TrendingUp, title: "Decisões Lentas", desc: "Processos manuais consomem tempo e recursos" },
              { icon: Gauge, title: "ROI Incerto", desc: "Impossível medir o impacto real das ações" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 transition">
                <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Como DataPay Transforma Seus Dados
            </h2>
            <p className="text-xl text-gray-600">
              Um fluxo de trabalho simples mas poderoso que leva você de dados desorganizados para decisões estratégicas em dias, não meses.
            </p>
          </div>

          {/* 5 Passos */}
          <div className="space-y-12">
            {[
              {
                num: "1",
                title: "Conecte Suas Fontes de Dados",
                desc: "Integre CRM, ERP, analytics, redes sociais e qualquer outra fonte. DataPay organiza tudo em um único lugar.",
                icon: Database
              },
              {
                num: "2",
                title: "Estruture e Valide",
                desc: "Nossa IA identifica gaps, valida consistência e estrutura seus dados automaticamente. Sem trabalho manual.",
                icon: Shield
              },
              {
                num: "3",
                title: "Gere Insights com IA",
                desc: "Análises automáticas identificam padrões, oportunidades e riscos que você nunca veria manualmente.",
                icon: Brain
              },
              {
                num: "4",
                title: "Teste Antes de Executar",
                desc: "Nosso Laboratório de Dados Sintéticos simula campanhas e prevê resultados com 85% de precisão.",
                icon: Zap
              },
              {
                num: "5",
                title: "Execute e Meça ROI",
                desc: "Implemente as ações recomendadas e acompanhe resultados em tempo real com dashboards inteligentes.",
                icon: TrendingUp
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-green-500 text-white font-bold text-2xl">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{step.desc}</p>
                  {i < 4 && <div className="h-12 w-1 bg-gradient-to-b from-purple-600 to-green-500 ml-8"></div>}
                </div>
              </div>
            ))}
          </div>

          {/* Screenshot da Plataforma */}
          <div className="mt-20 bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Veja a Plataforma em Ação</h3>
            <img 
              src="/dashboard-screenshot.webp" 
              alt="Dashboard DataPay"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Laboratório de Dados Sintéticos */}
      <section id="laboratorio" className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Laboratório de Dados Sintéticos
            </h2>
            <p className="text-xl text-gray-600">
              Teste campanhas, simule cenários e preveja resultados ANTES de gastar um real. Reduza riscos e maximize ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Simule Qualquer Cenário</h3>
                <p className="text-lg text-gray-600">
                  Gere dados sintéticos realistas baseados no seu histórico. Teste campanhas, mudanças de preço, segmentações - tudo sem risco.
                </p>
                <ul className="space-y-3">
                  {["Gerador de Dados com 1k-10M registros", "Simulador de Campanhas com ROI realista", "Previsor de Resultados com 85% de precisão"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="space-y-6">
                <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <div className="text-sm font-semibold text-purple-600 mb-2">GERADOR DE DADOS</div>
                  <p className="text-gray-700">Crie datasets sintéticos com sazonalidade, regiões e comportamentos realistas</p>
                </div>
                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="text-sm font-semibold text-green-600 mb-2">SIMULADOR</div>
                  <p className="text-gray-700">Teste campanhas e veja ROI, conversões e métricas antes de executar</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="text-sm font-semibold text-blue-600 mb-2">PREVISOR</div>
                  <p className="text-gray-700">Preveja comportamento de consumo e resultados futuros com IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por Que Escolher DataPay
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Implementação Rápida", desc: "Conecte seus dados e comece a gerar insights em dias, não meses." },
              { icon: Brain, title: "IA Avançada", desc: "Análises automáticas que identificam oportunidades que você nunca veria." },
              { icon: TrendingUp, title: "Resultados Mensuráveis", desc: "Acompanhe ROI em tempo real e tome decisões baseadas em dados." },
              { icon: Lock, title: "Segurança Garantida", desc: "Conformidade LGPD, criptografia end-to-end e backups automáticos." },
              { icon: Users, title: "Suporte Dedicado", desc: "Time de especialistas disponível 24/7 para ajudar seu sucesso." },
              { icon: Gauge, title: "Escalável", desc: "Cresce com seu negócio, de startups a empresas de 500M+." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
                <benefit.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-purple-600 to-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Transformar Seus Dados?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Conecte-se agora e comece a gerar insights que impulsionam crescimento real. Sua primeira análise é gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg h-14 font-bold"
              onClick={() => setShowLoginModal(true)}
            >
              Comece Agora <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg h-14 font-bold"
            >
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">D</div>
                <span className="font-bold text-white">DataPay</span>
              </div>
              <p className="text-sm">Transformando dados em decisões estratégicas.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Solução</a></li>
                <li><a href="#" className="hover:text-white">Laboratório</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 DataPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Bem-vindo de volta!</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-center mb-6">Escolha sua forma preferida de entrar</p>
          
          <div className="space-y-3">
            <button
              onClick={() => handleLogin("google")}
              className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="12" y="18" fontSize="20" textAnchor="middle" fill="currentColor">G</text>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleLogin("apple")}
              className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c-.91 0-1.74.46-2.24 1.14.5.5 1.05 1.06 1.05 2.36 0 1.3-.55 1.86-1.05 2.36.5.68 1.33 1.14 2.24 1.14 1.66 0 3-1.34 3-3s-1.34-3-3-3z"/>
              </svg>
              Apple
            </button>
            <button
              onClick={() => handleLogin("microsoft")}
              className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="8" height="8" fill="#F25022"/>
                <rect x="13" y="3" width="8" height="8" fill="#7FBA00"/>
                <rect x="3" y="13" width="8" height="8" fill="#00A4EF"/>
                <rect x="13" y="13" width="8" height="8" fill="#FFB900"/>
              </svg>
              Microsoft
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowLoginModal(false);
              setLocation("/dashboard");
            }}
            className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition"
          >
            Continuar sem login
          </button>

          <p className="text-xs text-gray-500 text-center mt-6">
            Ao continuar, você concorda com nossos <a href="#" className="underline hover:text-gray-700">Termos de Serviço</a> e <a href="#" className="underline hover:text-gray-700">Política de Privacidade</a>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

