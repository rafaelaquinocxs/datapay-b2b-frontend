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

function Router() {
  return (
    <Switch>
      {/* Rota raiz redireciona para dashboard */}
      <Route path="/">
        {() => <Redirect to="/dashboard" />}
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

      <Route path="/meus-dados">
        <DashboardLayout>
          <MeusDados />
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
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

