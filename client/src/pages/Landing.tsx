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
  AlertCircle,
  TrendingUp,
  Database,
  Network,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  // Estados de Registro
  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaConfirm: "",
    empresa: "",
    cargo: "",
  });

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

  // Hooks de Mutação tRPC
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (resultado) => {
      if (resultado.sucesso) {
        localStorage.setItem("token", resultado.usuario.token);
        localStorage.setItem("usuario", JSON.stringify(resultado.usuario));
        toast.success("Login realizado com sucesso!");
        setShowLoginModal(false);
        setLoginData({ email: "", senha: "" });
        setTimeout(() => {
          setLocation("/inicio");
        }, 1000);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao fazer login");
    },
  });

  // Funções de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: loginData.email,
      senha: loginData.senha,
    });
  };

  const registerMutation = trpc.auth.registro.useMutation({
    onSuccess: (resultado) => {
      if (resultado.sucesso) {
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
        setTimeout(() => {
          setLocation("/inicio");
        }, 1000);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar conta");
    },
  });

  // Funções de Registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.senha !== registerData.senhaConfirm) {
      toast.error("As senhas não coincidem");
      return;
    }

    registerMutation.mutate({
      nome: registerData.nome,
      email: registerData.email,
      senha: registerData.senha,
      empresa: registerData.empresa,
      cargo: registerData.cargo,
    });
  };

  // Funções de Demo
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);

    try {
      const emailProfissional = !["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com", "aol.com"].some(
        (domain) => demoFormData.email.endsWith(domain)
      );

      if (!emailProfissional) {
        toast.error("Por favor, use um email corporativo");
        setDemoLoading(false);
        return;
      }

      toast.success("Demonstração agendada com sucesso! Entraremos em contato em breve.");
      setShowDemoModal(false);
      setDemoFormData({
        nome: "",
        email: "",
        empresa: "",
        cargo: "",
        telefone: "",
        mensagem: "",
      });
    } catch (error: any) {
      toast.error("Erro ao agendar demonstração");
    } finally {
      setDemoLoading(false);
    }
  };

  const handleExpertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);

    try {
      toast.success("Solicitação enviada! Um especialista entrará em contato em breve.");
      setShowExpertModal(false);
      setDemoFormData({
        nome: "",
        email: "",
        empresa: "",
        cargo: "",
        telefone: "",
        mensagem: "",
      });
    } catch (error: any) {
      toast.error("Erro ao enviar solicitação");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">DataPay</div>
              <div className="text-xs text-gray-600">Enterprise</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#solucao" className="text-sm font-medium text-gray-700 hover:text-purple-600">Solução</a>
            <a href="#laboratorio" className="text-sm font-medium text-gray-700 hover:text-purple-600">Laboratório</a>
            <a href="#integracao" className="text-sm font-medium text-gray-700 hover:text-purple-600">Integração</a>
            <a href="#proposito" className="text-sm font-medium text-gray-700 hover:text-purple-600">Propósito</a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLoginModal(true)}
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              Entrar
            </Button>
            <Button
              size="sm"
              onClick={() => setShowRegisterModal(true)}
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              Registrar
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gray-900">Mais do que dados.</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 bg-clip-text text-transparent">
                  Um novo jeito de tomar decisões
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                A DataPay é o Cofre Digital de Dados para empresas que querem crescer com segurança, previsibilidade e ética — usando IA Sintética para transformar informação em inteligência real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowDemoModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white text-lg"
                >
                  Solicitar Demonstração <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-6">Cresça com dados éticos. Decida com confiança.</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-24 h-24 text-purple-600 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-600 font-medium">Dashboard DataPay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: VOCÊ TEM DADOS? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Você tem dados. Mas será que tem inteligência?
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Em meio a tantos números, plataformas e relatórios, é comum sentir que as decisões ainda dependem mais de intuição do que de informação. Grandes empresas têm dados em abundância — mas falta clareza, integração e confiança para agir.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Os Desafios</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Bases dispersas:</strong> Dados espalhados em múltiplos sistemas sem integração</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Campanhas sem previsibilidade:</strong> Falta de insights para decisões estratégicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Custos altos:</strong> ROI incerto em projetos de dados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Riscos de LGPD:</strong> Compliance complexo e exposição de dados</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">A Solução DataPay</h3>
              <p className="text-gray-700 mb-6">
                O DataPay nasceu para resolver isso — com uma visão mais humana sobre o poder dos dados.
              </p>
              <Button
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white w-full"
              >
                Solicitar Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: O COFRE DIGITAL */}
      <section id="solucao" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 h-80 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Lock className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Controle Total</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                O Cofre Digital de Dados da sua empresa.
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                O DataPay é uma plataforma de inteligência que une tecnologia e propósito. Com IA Sintética e governança automatizada, transformamos dados dispersos em insights acionáveis, sem abrir mão da privacidade nem da ética.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Brain className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">IA Sintética</h4>
                    <p className="text-gray-600">Previsões baseadas em comportamento real, sem uso de dados pessoais</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Governança Inteligente</h4>
                    <p className="text-gray-600">Integração segura com seus sistemas, dentro da LGPD</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <BarChart3 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Painéis Executivos</h4>
                    <p className="text-gray-600">Clareza total sobre performance, engajamento e ROI</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Suporte Consultivo</h4>
                    <p className="text-gray-600">Acompanhamento humano, com especialistas em dados e marketing</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic mb-6">
                "Inteligência é quando os números fazem sentido para as pessoas."
              </p>

              <Button
                onClick={() => setShowExpertModal(true)}
                className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
              >
                Entenda Mais <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: LABORATÓRIO */}
      <section id="laboratorio" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Teste antes de investir. Decida com confiança.
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              No Laboratório de IA Sintética do DataPay, você pode prever resultados antes de investir. Nossa IA cria simulações comportamentais seguras, que mostram quais campanhas, canais e mensagens terão melhor desempenho — tudo sem usar dados reais de clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reduza custos</h3>
              <p className="text-gray-700">Simule campanhas com dados sintéticos e economize até 30% em mídia</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aumente precisão</h3>
              <p className="text-gray-700">Testes sem risco de falhas com simulações realistas</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Elimine riscos</h3>
              <p className="text-gray-700">Zero exposição de dados reais com IA Sintética</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">Tecnologia que protege, prevê e potencializa.</p>
            <Button
              onClick={() => setShowDemoModal(true)}
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              Veja como funciona <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO: INTEGRAÇÃO */}
      <section id="integracao" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Conectado ao seu ecossistema. Seguro como deve ser.
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              O DataPay se conecta facilmente aos sistemas que você já usa, garantindo segurança, rastreabilidade e escalabilidade. Um ambiente único para governar e transformar dados com ética e performance.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
              {["SAP", "Salesforce", "Power BI", "Tableau", "Google Analytics", "AWS"].map((sistema) => (
                <div key={sistema} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition">
                  <span className="font-semibold text-gray-700">{sistema}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => setShowExpertModal(true)}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Saiba Mais <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO: PROPÓSITO */}
      <section id="proposito" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Ética, inovação e propósito. Três palavras que guiam tudo o que fazemos.
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Acreditamos que dados são mais do que números — são histórias sobre pessoas. Por isso, criamos um ecossistema que respeita a privacidade e transforma informação em impacto real para empresas e consumidores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ética</h3>
              <p className="text-gray-600">Dados humanizados, não explorados</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inovação</h3>
              <p className="text-gray-600">Tecnologia a serviço do bem</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Desenvolvimento 100% Nacional</h3>
              <p className="text-gray-600">Soberania de dados brasileiros</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <p className="text-2xl font-bold text-gray-900 mb-6">
              "O futuro dos dados é humano. E começa aqui."
            </p>
            <Button
              onClick={() => setShowExpertModal(true)}
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              Conheça a DataPay <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO: DIAGNÓSTICO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Descubra o que seus dados dizem sobre o futuro da sua empresa.
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                O Diagnóstico Executivo DataPay é uma análise personalizada do seu ecossistema de dados. Em poucos dias, você descobre:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Sua maturidade em governança</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Pontos de risco e de oportunidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Como a IA Sintética pode reduzir custos e ampliar previsibilidade</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 italic mb-6">
                "Um olhar humano sobre o poder dos seus dados."
              </p>
              <Button
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white w-full md:w-auto"
              >
                Agendar Diagnóstico Gratuito <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-24 h-24 text-purple-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 font-medium">Relatório Diagnóstico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-purple-900 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">DataPay</h4>
              <p className="text-gray-400 text-sm">O Cofre Digital de Dados. Inteligência, segurança e propósito em cada decisão.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Solução</a></li>
                <li><a href="#" className="hover:text-white">Laboratório</a></li>
                <li><a href="#" className="hover:text-white">Integração</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 DataPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* MODAL: LOGIN - SIMPLES E FUNCIONAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Entrar na Plataforma</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
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

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? "Entrando..." : "Entrar"}
              </button>

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
          </div>
        </div>
      )}

      {/* MODAL: REGISTRO - SIMPLES E FUNCIONAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Criar Conta</h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-3">
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

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerMutation.isPending ? "Criando conta..." : "Criar Conta"}
              </button>

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
          </div>
        </div>
      )}

      {/* MODAL: DEMONSTRAÇÃO */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Solicitar Demonstração</h2>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Corporativo</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={demoFormData.telefone}
                  onChange={(e) => setDemoFormData({ ...demoFormData, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="(11) 9999-9999"
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
          </div>
        </div>
      )}

      {/* MODAL: FALAR COM ESPECIALISTA */}
      {showExpertModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Falar com Especialista</h2>
              <button
                onClick={() => setShowExpertModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleExpertSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Corporativo</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                <textarea
                  value={demoFormData.mensagem}
                  onChange={(e) => setDemoFormData({ ...demoFormData, mensagem: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Sua mensagem"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={demoLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
              >
                {demoLoading ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

