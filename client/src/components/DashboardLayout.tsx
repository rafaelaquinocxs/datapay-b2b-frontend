import { ReactNode, useState } from "react";
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
  ChevronDown,
  Menu,
  X,
  Building2,
  Eye,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface ProfileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

// Menu structure with collapsible sections
const menuStructure = [
  {
    id: "main",
    items: [
      { icon: LayoutDashboard, label: "Início", path: "/inicio" },
    ],
  },
  {
    id: "meus-dados",
    label: "Meus Dados",
    icon: Database,
    items: [
      { icon: Building2, label: "Sobre a Empresa", path: "/sobre-empresa" },
      { icon: Zap, label: "Conectar Dados", path: "/conectar-dados" },
      { icon: Eye, label: "Visão 360", path: "/visao-360" },
    ],
  },
  {
    id: "inteligencia",
    label: "Inteligência de Dados",
    icon: Brain,
    items: [
      { icon: Brain, label: "Análise da IA", path: "/analise-ia" },
      { icon: Brain, label: "Copiloto de Dados", path: "/copiloto-dados" },
      { icon: BarChart3, label: "Benchmarks", path: "/benchmarks" },
    ],
  },
  {
    id: "coleta",
    label: "Coleta & Ações",
    icon: Users,
    items: [
      { icon: Lightbulb, label: "Formulário Inteligente", path: "/formulario-inteligente" },
      { icon: Users, label: "Pesquisas", path: "/pesquisas" },
      { icon: TrendingUp, label: "Ações Inteligentes", path: "/acoes" },
    ],
  },
  {
    id: "resultados",
    label: "Relatórios e Pesquisas",
    icon: FileBarChart,
    items: [
      { icon: BarChart3, label: "Resultados", path: "/resultados" },
      { icon: FileBarChart, label: "Relatórios", path: "/relatorios" },
      { icon: BookOpen, label: "Resumo Perfil", path: "/resumo-perfil" },
    ],
  },
  {
    id: "studio",
    label: "DataPay Studio",
    icon: Lightbulb,
    badge: "NEW",
    path: "/studio-loading",
    isButton: true,
  },
];

function ProfileMenu({ isOpen, onToggle, onLogout }: ProfileMenuProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-3 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="text-sm font-medium">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="text-sm font-medium">Modo Escuro</span>
                </>
              )}
            </button>

            {/* Settings */}
            <Link href="/configuracoes">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Configurações</span>
              </div>
            </Link>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "meus-dados",
    "inteligencia",
    "coleta",
    "resultados",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out border-r border-gray-700",
          sidebarOpen ? "w-[260px]" : "w-[80px]"
        )}
      >
        {/* Header with Logo and Toggle */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-white">DataPay</h1>
                  <p className="text-xs text-gray-400">Enterprise</p>
                </div>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors ml-auto"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuStructure.map((section) => {
            if (section.id === "main") {
              return (
                <div key="main" className="space-y-1 pb-2 border-b border-gray-700">
                  {section.items.map((item) => {
                    const isActive = location === item.path;
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} href={item.path}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group",
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                              : "text-gray-300 hover:bg-gray-700/50"
                          )}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          {sidebarOpen && (
                            <span className="text-sm font-medium truncate">
                              {item.label}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            }

            // Button sections (like DataPay Studio)
            if (section.isButton) {
              return (
                <Link key={section.id} href={section.path}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group mt-2 pt-2 border-t border-gray-700",
                      location === section.path
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-500/30"
                        : "text-gray-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30"
                    )}
                  >
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <div className="flex-1 text-left">
                        <span className="text-sm font-semibold truncate">
                          {section.label}
                        </span>
                        {section.badge && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                            {section.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            }

            // Collapsible sections
            const isExpanded = expandedSections.includes(section.id);
            const SectionIcon = section.icon;
            const hasActiveItem = section.items.some(
              (item) => location === item.path
            );

            return (
              <div key={section.id} className="space-y-1">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                    hasActiveItem
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white"
                      : "text-gray-300 hover:bg-gray-700/50"
                  )}
                >
                  <SectionIcon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <>
                      <div className="flex-1 text-left">
                        <span className="text-sm font-semibold truncate">
                          {section.label}
                        </span>
                        {section.badge && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded ? "rotate-180" : ""
                        )}
                      />
                    </>
                  )}
                </button>

                {/* Submenu Items */}
                {isExpanded && sidebarOpen && (
                  <div className="ml-2 pl-3 border-l border-gray-700 space-y-1">
                    {section.items.map((item) => {
                      const isActive = location === item.path;
                      const Icon = item.icon;
                      return (
                        <Link key={item.path} href={item.path}>
                          <div
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer text-sm",
                              isActive
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
                            )}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium truncate">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer - Empty */}
        <div className="p-3 border-t border-gray-700"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
        {/* Top Bar with Profile Menu */}
        <div className="sticky top-0 right-0 p-4 flex justify-end bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40">
          <ProfileMenu
            isOpen={profileMenuOpen}
            onToggle={() => setProfileMenuOpen(!profileMenuOpen)}
            onLogout={() => {
              localStorage.removeItem("auth_token");
              document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              window.location.href = "/landing";
            }}
          />
        </div>
        {children}
      </main>
    </div>
  );
}

