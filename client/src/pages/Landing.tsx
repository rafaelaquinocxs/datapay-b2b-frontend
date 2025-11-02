import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Users,
  Sparkles,
  Database,
  Brain,
  Microscope,
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid profile email")}&state=${Math.random().toString(36).substring(7)}`;
    window.location.href = authUrl;
  };

  const handleAppleLogin = () => {
    const clientId = process.env.REACT_APP_APPLE_CLIENT_ID || "";
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const authUrl = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid profile email")}&state=${Math.random().toString(36).substring(7)}`;
    window.location.href = authUrl;
  };

  const handleMicrosoftLogin = () => {
    const clientId = process.env.REACT_APP_MICROSOFT_CLIENT_ID || "";
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("openid profile email")}&state=${Math.random().toString(36).substring(7)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DataPay</h1>
              <p className="text-xs text-gray-500">Enterprise</p>
            </div>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transforme Seus Dados em <span className="bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">Vantagem Competitiva</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              DataPay é a plataforma completa que organiza, estrutura e transforma seus dados em decisões estratégicas que impulsionam crescimento real.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-xl transition text-lg"
              >
                Comece Agora
              </button>
              <button
                onClick={() => setLocation("/diagnostico")}
                className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-purple-600 transition text-lg"
              >
                Diagnóstico Gratuito
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-green-200 rounded-2xl blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <Database className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Organização de Dados</p>
                    <p className="text-sm text-gray-600">Centraliza todas as suas fontes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Brain className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Insights com IA</p>
                    <p className="text-sm text-gray-600">Análises inteligentes automáticas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Microscope className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Simulações Precisas</p>
                    <p className="text-sm text-gray-600">Teste antes de executar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Os 3 Pilares */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Os 3 Pilares do DataPay</h3>
            <p className="text-xl text-gray-600">Tudo que você precisa para transformar dados em resultados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Organização & Estruturação</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Centralize dados de múltiplas fontes, estruture com inteligência e mantenha tudo validado e atualizado em tempo real.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Base de Conhecimento versionada</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Validação automática de dados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Conformidade LGPD garantida</span>
                </li>
              </ul>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Insights Inteligentes</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Extraia insights automáticos com IA, identifique oportunidades e planeje ações estratégicas para crescimento.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Análise automática com IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Benchmarks por setor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Recomendações acionáveis</span>
                </li>
              </ul>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
                <Microscope className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Laboratório de Dados</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Simule cenários, teste campanhas e preveja resultados com 85% de precisão antes de executar.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Gerador de dados sintéticos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Simulador de campanhas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Previsor de resultados</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Por Que Escolher DataPay?</h3>
          <p className="text-xl text-gray-600">Benefícios comprovados para seu negócio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Implementação Rápida</h4>
              <p className="text-gray-600">Comece em dias, não meses. Integração simples com seus sistemas existentes.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Resultados Mensuráveis</h4>
              <p className="text-gray-600">Acompanhe ROI e impacto real de cada ação com relatórios detalhados.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Suporte Dedicado</h4>
              <p className="text-gray-600">Equipe especializada pronta para ajudar na implementação e otimização.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Sparkles className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Tecnologia de Ponta</h4>
              <p className="text-gray-600">IA avançada, segurança garantida e infraestrutura escalável.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-purple-600 to-green-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Pronto para Transformar Seus Dados?</h3>
          <p className="text-xl text-white/90 mb-8">Comece agora e veja a diferença que dados bem estruturados podem fazer.</p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition text-lg"
          >
            Acessar Plataforma
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="font-bold">DataPay</span>
              </div>
              <p className="text-gray-400">Transformando dados em resultados.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition">Preços</a></li>
                <li><a href="#" className="hover:text-white transition">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Termos</a></li>
                <li><a href="#" className="hover:text-white transition">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DataPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <button
              onClick={() => setShowLoginModal(false)}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao DataPay</h2>
            <p className="text-gray-600 mb-8">Escolha como deseja entrar</p>

            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition font-semibold text-gray-900"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Entrar com Google
              </button>

              <button
                onClick={handleAppleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition font-semibold text-gray-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 13.5c-.91 2.92.37 5.65 2.85 6.75.9.37 2.54.37 3.56.04 1.02-.33 1.97-.98 2.54-1.9.57-.92.85-2.04.85-3.39 0-1.35-.28-2.47-.85-3.39-.57-.92-1.52-1.57-2.54-1.9-1.02-.33-2.66-.33-3.56.04-2.48 1.1-3.76 3.83-2.85 6.75zm-5.05-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
                </svg>
                Entrar com Apple
              </button>

              <button
                onClick={handleMicrosoftLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition font-semibold text-gray-900"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24z"/>
                  <path fill="#7FBA00" d="M24 24H12.6V12.6H24V24z"/>
                  <path fill="#00A4EF" d="M11.4 11.4H0V0h11.4v11.4z"/>
                  <path fill="#FFB900" d="M24 11.4H12.6V0H24v11.4z"/>
                </svg>
                Entrar com Microsoft
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm mt-6">
              Ao entrar, você concorda com nossos <a href="#" className="text-purple-600 hover:underline">Termos de Serviço</a> e <a href="#" className="text-purple-600 hover:underline">Política de Privacidade</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

