import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Inicio from "./pages/Inicio";
import MeusDados from "./pages/MeusDados";
import AnaliseIA from "./pages/AnaliseIA";
import Pesquisas from "./pages/Pesquisas";
import AcoesInteligentes from "./pages/AcoesInteligentes";
import Resultados from "./pages/Resultados";
import Diagnostico from "./pages/Diagnostico";
import Relatorios from "./pages/Relatorios";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PesquisaPublica from "./pages/PesquisaPublica";

function Router() {
  return (
    <Switch>
      {/* Rotas públicas (sem autenticação) */}
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
      <Route path="/diagnostico" component={Diagnostico} />
      <Route path="/p/:linkPublico" component={PesquisaPublica} />
      <Route path="/404" component={NotFound} />

      {/* Rotas protegidas (requerem autenticação) */}
      <Route path="/">
        <ProtectedRoute>
          <DashboardLayout>
            <Inicio />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/inicio">
        <ProtectedRoute>
          <DashboardLayout>
            <Inicio />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/meus-dados">
        <ProtectedRoute>
          <DashboardLayout>
            <MeusDados />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/analise-ia">
        <ProtectedRoute>
          <DashboardLayout>
            <AnaliseIA />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/pesquisas">
        <ProtectedRoute>
          <DashboardLayout>
            <Pesquisas />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/acoes">
        <ProtectedRoute>
          <DashboardLayout>
            <AcoesInteligentes />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/resultados">
        <ProtectedRoute>
          <DashboardLayout>
            <Resultados />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/relatorios">
        <ProtectedRoute>
          <DashboardLayout>
            <Relatorios />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
