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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    icon: TrendingUp,
    label: "Performance",
    path: "/",
    badge: "142",
    badgeColor: "bg-purple-500",
  },
  {
    icon: LayoutDashboard,
    label: "Visão Geral",
    path: "/visao-geral",
    badge: "2",
    badgeColor: "bg-blue-500",
  },
  {
    icon: Database,
    label: "Conectores",
    path: "/conectores",
    badge: "5",
    badgeColor: "bg-green-500",
  },
  {
    icon: Brain,
    label: "Inteligência",
    path: "/inteligencia",
    badge: "8",
    badgeColor: "bg-cyan-500",
  },
  {
    icon: Users,
    label: "Segmentação",
    path: "/segmentacao",
    badge: "12",
    badgeColor: "bg-pink-500",
  },
  {
    icon: BarChart3,
    label: "Resultados",
    path: "/resultados",
    badge: "3",
    badgeColor: "bg-orange-500",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

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

        {/* Settings at bottom */}
        <div className="p-4 border-t border-gray-200">
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

