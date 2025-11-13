import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Página inicial que redireciona automaticamente para /dashboard
 * Sistema sem autenticação para apresentação
 */
export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redireciona automaticamente para dashboard
    setLocation("/dashboard");
  }, [setLocation]);

  // Loading enquanto redireciona
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    </div>
  );
}

