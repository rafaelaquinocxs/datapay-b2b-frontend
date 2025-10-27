import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Inicio from "./pages/Inicio";
import MeusDados from "./pages/MeusDados";
import AnaliseIA from "./pages/AnaliseIA";
import Pesquisas from "./pages/Pesquisas";
import AcoesInteligentes from "./pages/AcoesInteligentes";
import Resultados from "./pages/Resultados";
import Diagnostico from "./pages/Diagnostico";
import Relatorios from "./pages/Relatorios";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <DashboardLayout>
      <Switch>
        <Route path={"/"} component={Diagnostico} />
        <Route path={"/meus-dados"} component={MeusDados} />
        <Route path={"/analise-ia"} component={AnaliseIA} />
        <Route path={"/pesquisas"} component={Pesquisas} />
        <Route path={"/acoes"} component={AcoesInteligentes} />
        <Route path={"/resultados"} component={Resultados} />
        <Route path={"/diagnostico"} component={Diagnostico} />
        <Route path={"/relatorios"} component={Relatorios} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
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
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
