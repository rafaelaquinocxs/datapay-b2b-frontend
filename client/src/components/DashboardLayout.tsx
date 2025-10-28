import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Database,
  Brain,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  FileBarChart,
  BookOpen,
  Lightbulb,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Início",
    path: "/",
  },
  {
    icon: Database,
    label: "Meus Dados",
    path: "/meus-dados",
    badge: "3",
    badgeColor: "bg-blue-500",
  },
  {
    icon: Brain,
    label: "Análise da IA",
    path: "/analise-ia",
    badge: "12",
    badgeColor: "bg-purple-500",
  },
  {
    icon: BookOpen,
    label: "Base de Conhecimento",
    path: "/base-conhecimento",
  },
  {
    icon: Users,
    label: "Pesquisas",
    path: "/pesquisas",
    badge: "5",
    badgeColor: "bg-green-500",
  },
  {
    icon: Lightbulb,
    label: "Formulário Inteligente",
    path: "/formulario-inteligente",
    badge: "AI",
    badgeColor: "bg-yellow-500",
  },
  {
    icon: TrendingUp,
    label: "Ações Inteligentes",
    path: "/acoes",
    badge: "8",
    badgeColor: "bg-orange-500",
  },
  {
    icon: BarChart3,
    label: "Resultados",
    path: "/resultados",
  },
  {
    icon: FileBarChart,
    label: "Relatórios",
    path: "/relatorios",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Logout realizado com sucesso!");
      // Redirecionar para a landing page após logout
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },
    onError: (error) => {
      toast.error("Erro ao fazer logout");
      console.error("[Logout] Erro:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[216px] bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">DataPay</h1>
                <p className="text-xs text-gray-500">Enterprise</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer group",
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-white" : "text-gray-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-white" : "text-gray-700"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        isActive
                          ? "bg-white/20 text-white"
                          : `${item.badgeColor} text-white`
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Settings and Logout at bottom */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          <Link href="/configuracoes">
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer",
                location === "/configuracoes"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Settings
                className={cn(
                  "w-5 h-5",
                  location === "/configuracoes" ? "text-white" : "text-gray-500"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  location === "/configuracoes" ? "text-white" : "text-gray-700"
                )}
              >
                Configurações
              </span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">
              {logoutMutation.isPending ? "Saindo..." : "Sair"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

