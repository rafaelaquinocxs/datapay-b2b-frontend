import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Beaker, 
  TrendingUp, 
  BarChart3, 
  CheckCircle2,
  ArrowLeft,
  ChevronDown
} from "lucide-react";

interface StudioLayoutProps {
  children: React.ReactNode;
}

export default function StudioLayout({ children }: StudioLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [, navigate] = useLocation();

  const studioTools = [
    {
      id: "gerador",
      label: "🧪 Gerador de Dados",
      icon: Beaker,
      path: "/laboratorio/gerador",
      color: "text-purple-400",
    },
    {
      id: "simulador",
      label: "🎯 Simulador",
      icon: TrendingUp,
      path: "/laboratorio/simulador",
      color: "text-pink-400",
    },
    {
      id: "testador",
      label: "🔬 Testador",
      icon: BarChart3,
      path: "/laboratorio/testador",
      color: "text-cyan-400",
    },
    {
      id: "validador",
      label: "✅ Validador",
      icon: CheckCircle2,
      path: "/laboratorio/validador",
      color: "text-green-400",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Studio Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 transition-all duration-300 flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-sm">Studio</span>
            </div>
          )}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Tools Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {studioTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                variant="ghost"
                className={`w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors ${
                  !isOpen && "justify-center"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${tool.color}`} />
                {isOpen && <span className="text-sm">{tool.label}</span>}
              </Button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Button
            onClick={() => navigate("/studio")}
            variant="ghost"
            className={`w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors ${
              !isOpen && "justify-center"
            }`}
          >
            <ChevronDown className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm">Visão Geral</span>}
          </Button>
          <Button
            onClick={() => navigate("/meus-dados")}
            variant="ghost"
            className={`w-full justify-start gap-3 text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors ${
              !isOpen && "justify-center"
            }`}
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm">Sair do Studio</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

