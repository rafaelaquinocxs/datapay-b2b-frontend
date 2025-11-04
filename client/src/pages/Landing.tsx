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
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { APP_LOGO, APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Estados de Login
  const [loginData, setLoginData] = useState({ email: "", senha: "" });
  const [loginLoading, setLoginLoading] = useState(false);

  // Estados de Registro
  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaConfirm: "",
    empresa: "",
    cargo: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  // Estados de Demo
  const [demoFormData, setDemoFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    cargo: "",
    telefone: "",
    mensagem: "",
  });
  const [demoLoading, setDemoLoading] = useState(false);

  // Funções de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const resultado = await trpc.auth.login.mutate({
        email: loginData.email,
        senha: loginData.senha,
      });

      if (resultado.sucesso) {
        // Salvar token no localStorage
        localStorage.setItem("token", resultado.usuario.token);
        localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

        toast.success("Login realizado com sucesso!");
        setShowLoginModal(false);
        setLoginData({ email: "", senha: "" });

        // Redirecionar para dashboard
        setTimeout(() => {
          setLocation("/meus-dados");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoginLoading(false);
    }
  };

  // Funções de Registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.senha !== registerData.senhaConfirm) {
      toast.error("As senhas não coincidem");
      return;
    }

    setRegisterLoading(true);

    try {
      const resultado = await trpc.auth.registro.mutate({
        nome: registerData.nome,
        email: registerData.email,
        senha: registerData.senha,
        empresa: registerData.empresa,
        cargo: registerData.cargo,
      });

      if (resultado.sucesso) {
        // Salvar token no localStorage
        localStorage.setItem("token", resultado.usuario.token);
        localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

        toast.success("Conta criada com sucesso!");
        setShowRegisterModal(false);
        setRegisterData({
          nome: "",
          email: "",
          senha: "",
          senhaConfirm: "",
          empresa: "",
          cargo: "",
        });

        // Redirecionar para dashboard
        setTimeout(() => {
          setLocation("/meus-dados");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setRegisterLoading(false);
    }
  };

  // Funções de Demo
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);

    try {
      // Validar email profissional
      const emailProfissional = !["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com", "aol.com"].some(
        (domain) => demoFormData.email.endsWith(domain)
      );

      if (!emailProfissional) {
        toast.error("Por favor, use um email profissional (corporativo)");
        setDemoLoading(false);
        return;
      }

      const resultado = await trpc.demo.solicitar.mutate({
        nome: demoFormData.nome,
        email: demoFormData.email,
        empresa: demoFormData.empresa,
        cargo: demoFormData.cargo,
        telefone: demoFormData.telefone,
        mensagem: demoFormData.mensagem,
      });

      if (resultado.sucesso) {
        toast.success("Demonstração solicitada com sucesso! Entraremos em contato em breve.");
        setShowDemoModal(false);
        setDemoFormData({
          nome: "",
          email: "",
          empresa: "",
          cargo: "",
          telefone: "",
          mensagem: "",
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao solicitar demonstração");
    } finally {
      setDemoLoading(false);
    }
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
            <a href="#solucao" className="text-gray-600 hover:text-purple-600 font-medium">
              Solução
            </a>
            <a href="#laboratorio" className="text-gray-600 hover:text-purple-600 font-medium">
              Laboratório
            </a>
            <a href="#integracao" className="text-gray-600 hover:text-purple-600 font-medium">
              Integração
            </a>
            <a href="#proposito" className="text-gray-600 hover:text-purple-600 font-medium">
              Propósito
            </a>
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
              variant="outline"
              onClick={() => setShowRegisterModal(true)}
              className="hidden md:flex"
            >
              Registrar
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
              O DataPay é uma plataforma de inteligência que une tecnologia e propósito. Com IA Sintética e governança
              automatizada, transformamos dados dispersos em insights acionáveis, sem abrir mão da privacidade nem da
              ética.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
                onClick={() => setShowDemoModal(true)}
              >
                Solicitar Demonstração <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg"
                onClick={() => window.open('https://wa.me/5554992560212?text=Quero%20saber%20mais%20sobre%20o%20DataPay', '_blank')}
              >
                Falar com Especialista
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <div className="text-center">
              <Lock className="w-24 h-24 text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Segurança e Confiança</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Login */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Entrar na Plataforma</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginData.senha}
                  onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              {loginLoading ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Não tem conta?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Registre-se aqui
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Registro */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Conta</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                value={registerData.nome}
                onChange={(e) => setRegisterData({ ...registerData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="seu@empresa.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
              <input
                type="text"
                value={registerData.empresa}
                onChange={(e) => setRegisterData({ ...registerData, empresa: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Sua empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
              <input
                type="text"
                value={registerData.cargo}
                onChange={(e) => setRegisterData({ ...registerData, cargo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Seu cargo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={registerData.senha}
                  onChange={(e) => setRegisterData({ ...registerData, senha: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={registerData.senhaConfirm}
                  onChange={(e) => setRegisterData({ ...registerData, senhaConfirm: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={registerLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              {registerLoading ? "Criando conta..." : "Criar Conta"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Já tem conta?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Faça login aqui
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Demo */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solicitar Demonstração</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleDemoSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={demoFormData.nome}
                onChange={(e) => setDemoFormData({ ...demoFormData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
              <input
                type="email"
                value={demoFormData.email}
                onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="seu@empresa.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
              <input
                type="text"
                value={demoFormData.empresa}
                onChange={(e) => setDemoFormData({ ...demoFormData, empresa: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Sua empresa"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
              <input
                type="text"
                value={demoFormData.cargo}
                onChange={(e) => setDemoFormData({ ...demoFormData, cargo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Seu cargo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                value={demoFormData.telefone}
                onChange={(e) => setDemoFormData({ ...demoFormData, telefone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea
                value={demoFormData.mensagem}
                onChange={(e) => setDemoFormData({ ...demoFormData, mensagem: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Conte-nos sobre seus desafios..."
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={demoLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              {demoLoading ? "Enviando..." : "Solicitar Demonstração"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Seção O Desafio */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">O Desafio das Grandes Corporações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "Bases Dispersas", desc: "Dados espalhados em múltiplos sistemas sem integração" },
              { icon: Zap, title: "Campanhas sem Previsibilidade", desc: "Falta de insights para decisões estratégicas" },
              { icon: BarChart3, title: "Custos Altos", desc: "ROI incerto em projetos de dados" },
              { icon: Shield, title: "Riscos de LGPD", desc: "Compliance complexo e exposição de dados" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border-l-4 border-purple-600">
                <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Como DataPay Transforma Seus Dados</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: "1", title: "Conectar", desc: "Integre seus dados de qualquer fonte" },
              { num: "2", title: "Sintetizar", desc: "IA cria dados seguros e realistas" },
              { num: "3", title: "Analisar", desc: "Insights profundos sem riscos" },
              { num: "4", title: "Decidir", desc: "Decisões baseadas em dados" },
              { num: "5", title: "Escalar", desc: "Crescimento sustentável e seguro" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">{item.num}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Laboratório */}
      <section id="laboratorio" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Laboratório de Dados Sintéticos</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Teste antes de investir. Simule cenários, reduza custos e aumente a precisão sem expor dados reais.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "Reduza Custos", desc: "Simule campanhas com dados sintéticos" },
              { icon: BarChart3, title: "Aumente Precisão", desc: "Testes sem risco de falhas" },
              { icon: Shield, title: "Elimine Riscos", desc: "Zero exposição de dados reais" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                <item.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Integração */}
      <section id="integracao" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Integrado com Seus Sistemas</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            {['SAP', 'Salesforce', 'Power BI', 'Tableau', 'Google Analytics', 'AWS'].map((system) => (
              <div key={system} className="bg-gray-100 px-6 py-3 rounded-lg font-medium text-gray-700">{system}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Propósito */}
      <section id="proposito" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Nosso Propósito</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Ética", desc: "Dados humanizados, não explorados" },
              { icon: Zap, title: "Inovação", desc: "Tecnologia a serviço do bem" },
              { icon: Globe, title: "Desenvolvimento 100% Nacional", desc: "Soberania de dados brasileiros" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Diagnóstico */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Transformar Seus Dados?</h2>
          <p className="text-xl text-gray-600 mb-8">Receba uma análise executiva gratuita de como DataPay pode impactar sua empresa</p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white px-8 py-6 text-lg"
            onClick={() => setShowDemoModal(true)}
          >
            Solicitar Diagnóstico <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Seções restantes da Landing Page */}
      <section id="solucao" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">A Solução DataPay</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "IA Sintética", desc: "Dados seguros sem expor informações reais" },
              { icon: Shield, title: "Governança Inteligente", desc: "Compliance automático com LGPD" },
              { icon: BarChart3, title: "Painéis Executivos", desc: "Decisões baseadas em dados" },
              { icon: Users, title: "Suporte Consultivo", desc: "Especialistas ao seu lado" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-600 transition">
                <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">DataPay</h4>
              <p className="text-gray-400 text-sm">Transformando dados em decisões estratégicas.</p>
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
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 DataPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

