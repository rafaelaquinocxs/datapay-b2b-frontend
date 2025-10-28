import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import Landing from "./Landing";

/**
 * Página inicial inteligente que redireciona baseado no status de autenticação
 * - Se usuário está autenticado → redireciona para /dashboard
 * - Se usuário NÃO está autenticado → mostra Landing Page
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Aguarda o carregamento do estado de autenticação
    if (loading) return;

    // Se usuário está autenticado, redireciona para dashboard
    if (isAuthenticated) {
      console.log("[Home] Usuário autenticado, redirecionando para /dashboard");
      setLocation("/dashboard");
    }
  }, [isAuthenticated, loading, setLocation]);

  // Enquanto carrega, mostra loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, mostra Landing Page
  return <Landing />;
}

