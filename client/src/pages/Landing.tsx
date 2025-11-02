import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, Menu, X, CheckCircle2, ArrowRight, Zap, Brain, BarChart3, TrendingUp, Users, Shield, Database } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setLocation("/dashboard");
      return;
    }
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid profile email")}&state=${Math.random().toString(36).substring(7)}`;
    window.location.href = authUrl;
  };

  const handleAppleLogin = () => {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
    if (!clientId) {
      setLocation("/dashboard");
      return;
    }
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const authUrl = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid profile email")}&state=${Math.random().toString(36).substring(7)}`;
    window.location.href = authUrl;
  };

  const handleMicrosoftLogin = () => {
    const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID;
    if (!clientId) {
      setLocation("/dashboard");
      return;
    }
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid profile email")}&state=${Math.random().toString(36).substring(7)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Premium */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DataPay</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#pilares" className="text-gray-600 hover:text-gray-900 font-medium">Solução</a>
              <a href="#laboratorio" className="text-gray-600 hover:text-gray-900 font-medium">Laboratório</a>
              <a href="#beneficios" className="text-gray-600 hover:text-gray-900 font-medium">Benefícios</a>
              <a href="#casos" className="text-gray-600 hover:text-gray-900 font-medium">Casos de Sucesso</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowLoginModal(true)}
                className="hidden sm:inline-flex"
              >
                Entrar
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
                onClick={() => setLocation("/dashboard")}
              >
                Peça uma Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section Premium */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white pt-20 pb-32">
        {/* Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-200 to-transparent rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transforme Seus Dados em <span className="bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">Vantagem Competitiva</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  DataPay é a plataforma completa que organiza, estrutura e transforma seus dados em decisões estratégicas que impulsionam crescimento real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white text-lg h-14 px-8"
                  onClick={() => setLocation("/dashboard")}
                >
                  Comece Agora
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8"
                >
                  Diagnóstico Gratuito
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-gray-600">Empresas em crescimento</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">90%</p>
                  <p className="text-gray-600">Satisfação de clientes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">24/7</p>
                  <p className="text-gray-600">Suporte dedicado</p>
                </div>
              </div>
            </div>

            {/* Right Image - Executivo */}
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

      {/* Os 3 Pilares - Seções Detalhadas */}
      <section id="pilares" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Os 3 Pilares do DataPay</h2>
            <p className="text-xl text-gray-600">Tudo que você precisa para transformar dados em resultados</p>
          </div>

          {/* Pilar 1: Organização */}
          <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-purple-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-purple-600 font-semibold">Pilar 1</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900">Organização & Estruturação de Dados</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Centralize dados de múltiplas fontes, estruture com inteligência e mantenha tudo validado e atualizado em tempo real.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Base de Conhecimento Versionada</p>
                    <p className="text-gray-600 text-sm">Rastreie todas as mudanças e versões</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Validação Automática de Dados</p>
                    <p className="text-gray-600 text-sm">Qualidade garantida em cada atualização</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Conformidade LGPD Garantida</p>
                    <p className="text-gray-600 text-sm">Segurança e privacidade em primeiro lugar</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-3xl p-12 h-96 flex items-center justify-center border-2 border-purple-200">
              <div className="text-center">
                <Database size={64} className="text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Organização Inteligente de Dados</p>
              </div>
            </div>
          </div>

          {/* Pilar 2: Insights */}
          <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-12 h-96 flex items-center justify-center border-2 border-green-200 order-2 md:order-1">
              <div className="text-center">
                <Brain size={64} className="text-green-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Inteligência Artificial Aplicada</p>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center gap-3 bg-green-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-green-600 font-semibold">Pilar 2</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900">Insights Inteligentes & Ações Estratégicas</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Extraia insights automáticos com IA, identifique oportunidades e planeje ações estratégicas para aumentar vendas e resultados.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Análise Automática com IA</p>
                    <p className="text-gray-600 text-sm">Descubra padrões e oportunidades</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Benchmarks por Setor</p>
                    <p className="text-gray-600 text-sm">Compare com a mediana do seu segmento</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Recomendações Acionáveis</p>
                    <p className="text-gray-600 text-sm">Próximos passos claros para crescimento</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Pilar 3: Laboratório */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-blue-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-blue-600 font-semibold">Pilar 3</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900">Laboratório de Dados Sintéticos</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Simule cenários, teste campanhas e preveja comportamento de consumo com 85% de precisão antes de executar.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Gerador de Dados Sintéticos</p>
                    <p className="text-gray-600 text-sm">Crie datasets realistas para testes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Simulador de Campanhas</p>
                    <p className="text-gray-600 text-sm">Teste estratégias antes de lançar</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Previsor de Resultados</p>
                    <p className="text-gray-600 text-sm">Estime ROI e receita futura</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-12 h-96 flex items-center justify-center border-2 border-blue-200">
              <div className="text-center">
                <Zap size={64} className="text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Simulações Precisas em Tempo Real</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratório Detalhado */}
      <section id="laboratorio" className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Laboratório de Dados Sintéticos</h2>
            <p className="text-xl text-gray-600">Teste, simule e preveja antes de executar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "📊", title: "Gerador de Dados", desc: "1k-10M registros com sazonalidade real" },
              { icon: "🎯", title: "Simulador", desc: "Teste campanhas em cenários reais" },
              { icon: "🔮", title: "Previsor", desc: "Estime ROI e resultados futuros" },
              { icon: "✅", title: "Validador", desc: "Verifique insights antes de usar" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por Que Escolher */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Por Que Escolher DataPay?</h2>
            <p className="text-xl text-gray-600">Benefícios comprovados para seu negócio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <Zap size={32} />, title: "Implementação Rápida", desc: "Conecte em dias, não meses. Integração simples com seus sistemas." },
              { icon: <TrendingUp size={32} />, title: "Resultados Mensuráveis", desc: "Acompanhe ROI e impacto real de cada ação em relatórios detalhados." },
              { icon: <Users size={32} />, title: "Suporte Dedicado", desc: "Equipe especializada pronta para ajudar na implementação e otimização." },
              { icon: <Shield size={32} />, title: "Tecnologia de Ponta", desc: "IA avançada, segurança garantida e infraestrutura escalável." },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <div className="text-purple-600 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Transformar Seus Dados?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Comece agora e veja a diferença que dados bem estruturados podem fazer no seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg h-14 px-8"
              onClick={() => setLocation("/dashboard")}
            >
              Acessar Plataforma
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg h-14 px-8"
              onClick={() => setShowLoginModal(true)}
            >
              Peça uma Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">DataPay</h3>
              <p className="text-sm">Transformando dados em resultados.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Recursos</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
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
            <DialogTitle className="text-2xl font-bold">Bem-vindo de volta!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-6">
            <p className="text-gray-600 text-center mb-6">Escolha sua forma preferida de entrar</p>
            
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-lg">G</text>
              </svg>
              Google
            </button>

            <button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-lg">🍎</text>
              </svg>
              Apple
            </button>

            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-lg">⊞</text>
              </svg>
              Microsoft
            </button>

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
              className="w-full px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition font-semibold text-gray-700"
            >
              Continuar sem login
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

