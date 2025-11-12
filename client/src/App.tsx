import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Inicio from "./pages/Inicio";
import MeusDados from "./pages/MeusDados";
import AnaliseIA from "@/pages/AnaliseIA";
import BaseConhecimento from "@/pages/BaseConhecimento";
import Pesquisas from "./pages/Pesquisas";
import AcoesInteligentes from "./pages/AcoesInteligentes";
import Resultados from "./pages/Resultados";
import Diagnostico from "./pages/Diagnostico";
import Relatorios from "./pages/Relatorios";
import RespondePesquisa from "./pages/RespondePesquisa";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import FormularioInteligente from "./pages/FormularioInteligente";
import ResumoPerfil from "./pages/ResumoPerfil";
import Benchmarks from "./pages/Benchmarks";
import CopilatoDados from "./pages/CopilatoDados";
import AdicionarFonte from "./pages/AdicionarFonte";
import MapeamentoFontes from "./pages/MapeamentoFontes";
import ConfiguracaoSincronizacao from "./pages/ConfiguracaoSincronizacao";
import Laboratorio from "./pages/Laboratorio";
import Configuracoes from "./pages/Configuracoes";
import Chatbot from "./pages/Chatbot";
import StudioLoading from "./pages/StudioLoading";
import Studio from "./pages/Studio";
import Visao360 from "./pages/Visao360";

function Router() {
  return (
    <Switch>
      {/* Rota raiz redireciona para landing page */}
      <Route path="/">
        {() => <Redirect to="/landing" />}
      </Route>

      {/* Landing page */}
      <Route path="/landing" component={Landing} />
      
      {/* Diagnóstico público */}
      <Route path="/diagnostico" component={Diagnostico} />
      
      {/* Responder pesquisa pública */}
      <Route path="/p/:linkPublico" component={RespondePesquisa} />

      {/* Dashboard - TODAS AS ROTAS PÚBLICAS AGORA */}
      <Route path="/dashboard">
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </Route>

      <Route path="/inicio">
        <DashboardLayout>
          <Inicio />
        </DashboardLayout>
      </Route>
      <Route path="/sobre-empresa">
        <DashboardLayout>
          <MeusDados />
        </DashboardLayout>
      </Route>

      <Route path="/conectar-dados">
        <DashboardLayout>
          <MeusDados />
        </DashboardLayout>
      </Route>      <Route path="/visao-360">
        <DashboardLayout>
          <Visao360 />
        </DashboardLayout>
      </Route>

      <Route path="/analise-ia">
        <DashboardLayout>
          <AnaliseIA />
        </DashboardLayout>
      </Route>

      <Route path="/base-conhecimento">
        <DashboardLayout>
          <BaseConhecimento />
        </DashboardLayout>
      </Route>

      <Route path="/pesquisas">
        <DashboardLayout>
          <Pesquisas />
        </DashboardLayout>
      </Route>

      <Route path="/formulario-inteligente">
        <DashboardLayout>
          <FormularioInteligente />
        </DashboardLayout>
      </Route>

      <Route path="/acoes">
        <DashboardLayout>
          <AcoesInteligentes />
        </DashboardLayout>
      </Route>

      <Route path="/acoes-inteligentes">
        <DashboardLayout>
          <AcoesInteligentes />
        </DashboardLayout>
      </Route>

      <Route path="/resultados">
        <DashboardLayout>
          <Resultados />
        </DashboardLayout>
      </Route>

      <Route path="/relatorios">
        <DashboardLayout>
          <Relatorios />
        </DashboardLayout>
      </Route>

      {/* 404 */}

      <Route path="/laboratorio">
        <DashboardLayout>
          <Laboratorio />
        </DashboardLayout>
      </Route>

      <Route path="/laboratorio/gerador">
        <DashboardLayout>
          <Laboratorio />
        </DashboardLayout>
      </Route>

      <Route path="/laboratorio/simulador">
        <DashboardLayout>
          <Laboratorio />
        </DashboardLayout>
      </Route>

      <Route path="/laboratorio/testador">
        <DashboardLayout>
          <Laboratorio />
        </DashboardLayout>
      </Route>

      {/* DataPay Studio */}
      <Route path="/studio-loading" component={StudioLoading} />
      
      <Route path="/studio" component={Studio} />

      <Route path="/resumo-perfil">
        <DashboardLayout>
          <ResumoPerfil />
        </DashboardLayout>
      </Route>

      <Route path="/benchmarks">
        <DashboardLayout>
          <Benchmarks />
        </DashboardLayout>
      </Route>

      <Route path="/copiloto-dados">
        <DashboardLayout>
          <CopilatoDados />
        </DashboardLayout>
      </Route>

      <Route path="/adicionar-fonte">
        <DashboardLayout>
          <AdicionarFonte />
        </DashboardLayout>
      </Route>

      <Route path="/mapeamento-fontes">
        <DashboardLayout>
          <MapeamentoFontes />
        </DashboardLayout>
      </Route>

      <Route path="/configuracao-sincronizacao">
        <DashboardLayout>
          <ConfiguracaoSincronizacao />
        </DashboardLayout>
      </Route>

      <Route path="/configuracoes">
        <DashboardLayout>
          <Configuracoes />
        </DashboardLayout>
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// DataPay Enterprise UI - Versão Final Pronta para Publicação
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

