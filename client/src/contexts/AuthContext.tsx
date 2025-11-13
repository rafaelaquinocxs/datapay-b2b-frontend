import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

interface Empresa {
  id: number;
  nome: string | null;
  email: string | null;
  plano: string | null;
  assinaturaStatus: string | null;
}

interface AuthContextType {
  empresa: Empresa | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, empresa: Empresa) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const savedToken = localStorage.getItem("authToken");
    const savedEmpresaId = localStorage.getItem("empresaId");
    const savedEmpresaNome = localStorage.getItem("empresaNome");
    const savedEmpresaEmail = localStorage.getItem("empresaEmail");
    const savedPlano = localStorage.getItem("plano");
    const savedStatus = localStorage.getItem("assinaturaStatus");

    if (savedToken && savedEmpresaId) {
      setToken(savedToken);
      setEmpresa({
        id: parseInt(savedEmpresaId),
        nome: savedEmpresaNome,
        email: savedEmpresaEmail,
        plano: savedPlano,
        assinaturaStatus: savedStatus,
      });
    }

    setLoading(false);
  }, []);

  const login = (newToken: string, newEmpresa: Empresa) => {
    setToken(newToken);
    setEmpresa(newEmpresa);
    
    // Salvar no localStorage
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("empresaId", newEmpresa.id.toString());
    localStorage.setItem("empresaNome", newEmpresa.nome || "");
    localStorage.setItem("empresaEmail", newEmpresa.email || "");
    localStorage.setItem("plano", newEmpresa.plano || "");
    localStorage.setItem("assinaturaStatus", newEmpresa.assinaturaStatus || "");
  };

  const logout = () => {
    setToken(null);
    setEmpresa(null);
    
    // Limpar localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("empresaId");
    localStorage.removeItem("empresaNome");
    localStorage.removeItem("empresaEmail");
    localStorage.removeItem("plano");
    localStorage.removeItem("assinaturaStatus");
    
    // Redirecionar para login
    setLocation("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        empresa,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

