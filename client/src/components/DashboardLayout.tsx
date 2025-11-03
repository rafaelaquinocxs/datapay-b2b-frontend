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


interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems: any[] = [
  {
    icon: LayoutDashboard,
    label: "Início",
    path: "/",
  },
  {
    icon: BookOpen,
    label: "Base de Conhecimento",
    path: "/base-conhecimento",
  },
  {
    icon: Database,
    label: "Meus Dados",
    path: "/meus-dados",
  },
  {
    type: 'section',
    label: 'Inteligência de Dados',
  },
  {
    icon: Brain,
    label: "Análise da IA",
    path: "/analise-ia",
  },
  {
    icon: Brain,
    label: "Copiloto de Dados",
    path: "/copiloto-dados",
  },
  {
    icon: BarChart3,
    label: "Benchmarks",
    path: "/benchmarks",
  },
  {
    type: 'section',
    label: 'Laboratório',
  },
  {
    icon: Lightbulb,
    label: "🧪 Gerador de Dados",
    path: "/laboratorio/gerador",
  },
  {
    icon: TrendingUp,
    label: "🎯 Simulador",
    path: "/laboratorio/simulador",
  },
  {
    icon: BarChart3,
    label: "🔬 Testador",
    path: "/laboratorio/testador",
  },
  {
    type: 'section',
    label: 'Coleta & Ações',
  },
  {
    icon: Lightbulb,
    label: "Formulário Inteligente",
    path: "/formulario-inteligente",
  },
  {
    icon: Users,
    label: "Pesquisas",
    path: "/pesquisas",
  },
  {
    icon: TrendingUp,
    label: "Ações Inteligentes",
    path: "/acoes",
  },
  {
    type: 'section',
    label: 'Resultados & Relatórios',
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
  {
    icon: BookOpen,
    label: "Resumo Perfil",
    path: "/resumo-perfil",
  },
  {
    type: 'section',
    label: 'Administração',
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();



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
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, idx) => {
            if (item.type === 'section') {
              return (
                <div key={`section-${idx}`} className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              );
            }
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn("flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer group", isActive ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30" : "text-gray-600 hover:bg-gray-100")}>
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500")} />
                    <span className={cn("text-sm font-medium", isActive ? "text-white" : "text-gray-700")}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Settings and Logout at bottom */}
        <div className="p-4 border-t border-gray-200 space-y-2">
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
            onClick={() => {
              localStorage.removeItem('auth_token');
              document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
              setLocation('/landing');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
              Sair
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

