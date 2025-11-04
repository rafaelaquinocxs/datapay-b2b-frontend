import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Lock,
  Brain,
  BarChart3,
  Shield,
  Users,
  Zap,
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Heart,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({ nome: "", email: "", empresa: "", cargo: "", telefone: "", mensagem: "" });
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");

  const handleLogin = (provider: string) => {
    console.log(`Login com ${provider}`);
    // Redirecionar para rota de signin
    window.location.href = `/api/oauth/signin/${provider.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">DataPay</h1>
                <p className="text-xs text-gray-500">Enterprise</p>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            <a href="#solucao" className="text-gray-600 hover:text-purple-600 font-medium">Solução</a>
            <a href="#laboratorio" className="text-gray-600 hover:text-purple-600 font-medium">Laboratório</a>
            <a href="#integracao" className="text-gray-600 hover:text-purple-600 font-medium">Integração</a>
            <a href="#proposito" className="text-gray-600 hover:text-purple-600 font-medium">Propósito</a>
          </nav>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLoginModal(true)}
              className="hidden md:flex"
            >
              Entrar
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
              onClick={() => setShowDemoModal(true)}
            >
              Solicitar Demonstração
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">O Cofre Digital</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
                de Dados da sua Empresa
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              O DataPay é uma plataforma de inteligência que une tecnologia e propósito. Com IA Sintética e governança automatizada, transformamos dados dispersos em insights acionáveis, sem abrir mão da privacidade nem da ética.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
                onClick={() => setShowDemoModal(true)}
              >
                Comece Agora <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-2"
                onClick={() => setShowExpertModal(true)}
              >
                Falar com Especialista
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-purple-600">500+</p>
                <p className="text-gray-600">Empresas em crescimento</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">90%</p>
                <p className="text-gray-600">Satisfação de clientes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">24/7</p>
                <p className="text-gray-600">Suporte dedicado</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <div className="text-center">
              <Lock className="w-24 h-24 text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Segurança e Confiança</p>
            </div>
          </div>
        </div>
      </section>

      {/* O Desafio */}
      <section id="solucao" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">O Desafio das Grandes Empresas</h2>
          <p className="text-xl text-gray-600 mb-12">
            Grandes empresas têm dados em abundância — mas falta clareza, integração e confiança para agir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border-2 border-red-200">
              <div className="text-4xl mb-4">🔸</div>
              <h3 className="text-xl font-bold mb-2">Bases Dispersas</h3>
              <p className="text-gray-600">Dados espalhados em múltiplos sistemas sem integração real.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-orange-200">
              <div className="text-4xl mb-4">🔸</div>
              <h3 className="text-xl font-bold mb-2">Campanhas sem Previsibilidade</h3>
              <p className="text-gray-600">Decisões baseadas em intuição, não em dados confiáveis.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-yellow-200">
              <div className="text-4xl mb-4">🔸</div>
              <h3 className="text-xl font-bold mb-2">Custos Altos e Resultados Incertos</h3>
              <p className="text-gray-600">Impossível medir ROI real e otimizar investimentos.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-purple-200">
              <div className="text-4xl mb-4">🔸</div>
              <h3 className="text-xl font-bold mb-2">Dúvidas sobre LGPD e Privacidade</h3>
              <p className="text-gray-600">Risco de exposição de dados e não conformidade regulatória.</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-purple-600 to-green-500 text-white p-12 rounded-2xl text-center">
            <p className="text-2xl font-bold mb-4">O DataPay nasceu para resolver isso</p>
            <p className="text-lg opacity-90">Com uma visão mais humana sobre o poder dos dados.</p>
            <Button
              className="mt-6 bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => setShowDemoModal(true)}
            >
              Solicitar Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Solução */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">A Solução DataPay</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
              <Brain className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">IA Sintética</h3>
              <p className="text-gray-700">Previsões baseadas em comportamento real, sem uso de dados pessoais. Teste cenários antes de investir.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Governança Inteligente</h3>
              <p className="text-gray-700">Integração segura com seus sistemas, dentro da LGPD. Rastreabilidade total e compliance garantido.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Painéis Executivos</h3>
              <p className="text-gray-700">Clareza total sobre performance, engajamento e ROI. Dashboards inteligentes e em tempo real.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-xl">
              <Users className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Suporte Consultivo</h3>
              <p className="text-gray-700">Acompanhamento humano com especialistas em dados e marketing. Orientação estratégica contínua.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
              onClick={() => setShowDemoModal(true)}
            >
              Entenda Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Laboratório */}
      <section id="laboratorio" className="bg-gradient-to-br from-purple-100 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-purple-600 font-bold text-lg mb-2">Inteligência é quando os números fazem sentido para as pessoas.</p>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Teste Antes de Investir</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No Laboratório de IA Sintética do DataPay, você pode prever resultados antes de investir. Nossa IA cria simulações comportamentais seguras, que mostram quais campanhas, canais e mensagens terão melhor desempenho — tudo sem usar dados reais de clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Reduza Custos</h3>
              <p className="text-gray-600">Reduza custos de mídia em até 30% com previsões precisas.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Aumente Precisão</h3>
              <p className="text-gray-600">Aumente a precisão das decisões com IA baseada em dados reais.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-purple-500">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Elimine Riscos</h3>
              <p className="text-gray-600">Elimine riscos de privacidade com IA Sintética segura.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-6">Tecnologia que protege, prevê e potencializa.</p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
              onClick={() => setShowDemoModal(true)}
            >
              Veja como funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Integração */}
      <section id="integracao" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Conectado ao seu Ecossistema</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            O DataPay se conecta facilmente aos sistemas que você já usa, garantindo segurança, rastreabilidade e escalabilidade. Um ambiente único para governar e transformar dados com ética e performance.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-2xl mb-12">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg mb-2 inline-block">
                  <p className="font-bold text-gray-900">SAP</p>
                </div>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg mb-2 inline-block">
                  <p className="font-bold text-blue-600">Salesforce</p>
                </div>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg mb-2 inline-block">
                  <p className="font-bold text-purple-600">Power BI</p>
                </div>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-600 to-green-500 p-4 rounded-lg mb-2 inline-block">
                  <p className="font-bold text-white">DataPay</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full py-6 text-lg border-2"
            onClick={() => setShowExpertModal(true)}
          >
            Saiba Mais
          </Button>
        </div>
      </section>

      {/* Propósito */}
      <section id="proposito" className="bg-gradient-to-br from-purple-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 text-center">
            Ética, Inovação e Propósito
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Acreditamos que dados são mais do que números — são histórias sobre pessoas. Por isso, criamos um ecossistema que respeita a privacidade e transforma informação em impacto real para empresas e consumidores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl text-center">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Inovação Aberta</h3>
              <p className="text-gray-600">Participação em programas de deep tech e inovação.</p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Economia Ética</h3>
              <p className="text-gray-600">Compromisso com a economia ética de dados.</p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">100% Nacional</h3>
              <p className="text-gray-600">Desenvolvimento e inovação 100% brasileira.</p>
            </div>
          </div>

          <div className="text-center bg-white p-12 rounded-2xl">
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text mb-6">
              "O futuro dos dados é humano. E começa aqui."
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
              onClick={() => setShowDemoModal(true)}
            >
              Conheça a DataPay
            </Button>
          </div>
        </div>
      </section>

      {/* Diagnóstico */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Descubra o Potencial dos Seus Dados
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              O Diagnóstico Executivo DataPay é uma análise personalizada do seu ecossistema de dados. Em poucos dias, você descobre:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Sua maturidade em governança</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Pontos de risco e de oportunidade</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Como a IA Sintética pode reduzir custos</span>
              </li>
            </ul>
            <Button
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
              onClick={() => setShowDemoModal(true)}
            >
              Agendar Diagnóstico Gratuito
            </Button>
            <p className="text-gray-600 mt-4 italic">Um olhar humano sobre o poder dos seus dados.</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <div className="text-center">
              <BarChart3 className="w-24 h-24 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Análise Personalizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-purple-600 to-green-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Transformar Seus Dados?</h2>
          <p className="text-xl mb-8 opacity-90">
            Conecte-se agora e comece a gerar insights que impulsionam crescimento real. Sua primeira análise é gratuita.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={() => setShowDemoModal(true)}
            >
              Comece Agora
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              onClick={() => setShowExpertModal(true)}
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">DataPay</h3>
              <p className="text-gray-400 text-sm">O Cofre Digital de Dados. Inteligência, segurança e propósito em cada decisão.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Solução</a></li>
                <li><a href="#" className="hover:text-white">Laboratório</a></li>
                <li><a href="#" className="hover:text-white">Integração</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Diagnóstico</a></li>
                <li><a href="#" className="hover:text-white">Inovação</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 DataPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Entrar na Plataforma</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleLogin("Google")}
            >
              Entrar com Google
            </Button>
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800"
              onClick={() => handleLogin("Apple")}
            >
              Entrar com Apple
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => handleLogin("Microsoft")}
            >
              Entrar com Microsoft
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Demonstração</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              value={demoFormData.nome}
              onChange={(e) => setDemoFormData({...demoFormData, nome: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Seu email profissional"
              value={demoFormData.email}
              onChange={(e) => setDemoFormData({...demoFormData, email: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Sua empresa"
              value={demoFormData.empresa}
              onChange={(e) => setDemoFormData({...demoFormData, empresa: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Seu cargo"
              value={demoFormData.cargo}
              onChange={(e) => setDemoFormData({...demoFormData, cargo: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Telefone (opcional)"
              value={demoFormData.telefone}
              onChange={(e) => setDemoFormData({...demoFormData, telefone: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <textarea
              placeholder="Mensagem (opcional)"
              value={demoFormData.mensagem}
              onChange={(e) => setDemoFormData({...demoFormData, mensagem: e.target.value})}
              rows={3}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            {demoMessage && (
              <p className={`text-sm ${demoMessage.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
                {demoMessage}
              </p>
            )}
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
              onClick={async () => {
                if (!demoFormData.nome || !demoFormData.email || !demoFormData.empresa || !demoFormData.cargo) {
                  setDemoMessage("Por favor, preencha todos os campos obrigatórios");
                  return;
                }
                const emailDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'aol.com'];
                const emailDomain = demoFormData.email.split('@')[1]?.toLowerCase();
                if (emailDomains.includes(emailDomain)) {
                  setDemoMessage("Por favor, use um email profissional (domínio da empresa)");
                  return;
                }
                setDemoLoading(true);
                try {
                  const response = await fetch("/api/trpc/demo.solicitar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ input: demoFormData }),
                  });
                  if (response.ok) {
                    setDemoMessage("Solicitação enviada com sucesso! Entraremos em contato em breve.");
                    setTimeout(() => {
                      setShowDemoModal(false);
                      setDemoFormData({ nome: "", email: "", empresa: "", cargo: "", telefone: "", mensagem: "" });
                      setDemoMessage("");
                    }, 2000);
                  } else {
                    setDemoMessage("Erro ao enviar solicitação. Tente novamente.");
                  }
                } catch (error) {
                  setDemoMessage("Erro ao enviar solicitação. Tente novamente.");
                } finally {
                  setDemoLoading(false);
                }
              }}
              disabled={demoLoading}
            >
              {demoLoading ? "Enviando..." : "Solicitar Demonstração"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expert Modal */}
      <Dialog open={showExpertModal} onOpenChange={setShowExpertModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Falar com um Especialista</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Um especialista DataPay entrará em contato com você em breve para entender melhor suas necessidades.
            </p>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Seu email profissional"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Seu telefone"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
              onClick={() => {
                setShowExpertModal(false);
              }}
            >
              Solicitar Contato
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Expert Button */}
      <button
        onClick={() => setShowExpertModal(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
        title="Falar com Especialista"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}

