import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Database,
  Brain,
  Zap,
  ArrowRight,
  BarChart3,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Inicio() {
  const [, setLocation] = useLocation();
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const usuarioJson = localStorage.getItem("usuario");
    if (usuarioJson) {
      setUsuario(JSON.parse(usuarioJson));
    }
  }, []);

  // KPIs dinâmicos baseados no usuário
  const empresaId = usuario?.id || 1;
  const kpis = [
    {
      titulo: "Fontes de Dados",
      valor: "0",
      descricao: "Conectadas e sincronizadas",
      icon: Database,
      cor: "from-blue-500 to-blue-600",
    },
    {
      titulo: "Registros Processados",
      valor: "0",
      descricao: "Aguardando sincronização",
      icon: TrendingUp,
      cor: "from-green-500 to-green-600",
    },
    {
      titulo: "Insights Gerados",
      valor: "0",
      descricao: "Últimos 30 dias",
      icon: Brain,
      cor: "from-purple-500 to-purple-600",
    },
    {
      titulo: "Ações Executadas",
      valor: "0",
      descricao: "Com ROI comprovado",
      icon: Zap,
      cor: "from-orange-500 to-orange-600",
    },
  ];

  const proximosPassos = [
    {
      numero: 1,
      titulo: "Conectar Primeira Fonte",
      descricao: "Integre seus dados com SAP, Salesforce ou CSV",
      acao: "Conectar",
      path: "/meus-dados",
    },
    {
      numero: 2,
      titulo: "Explorar Insights",
      descricao: "Deixe a IA analisar seus dados e gerar recomendações",
      acao: "Explorar",
      path: "/analise-ia",
    },
    {
      numero: 3,
      titulo: "Executar Ações",
      descricao: "Implemente as recomendações e acompanhe o ROI",
      acao: "Executar",
      path: "/acoes",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Bem-vindo, {usuario?.nome?.split(" ")[0]}!
        </h1>
        <p className="text-lg text-gray-600">
          Seu Cofre Digital de Dados está pronto para transformar informação em inteligência.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${kpi.cor} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.titulo}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.valor}</p>
              <p className="text-xs text-gray-500">{kpi.descricao}</p>
            </Card>
          );
        })}
      </div>

      {/* PRÓXIMOS PASSOS */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Passos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proximosPassos.map((passo) => (
            <Card key={passo.numero} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{passo.numero}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{passo.titulo}</h3>
              <p className="text-gray-600 text-sm mb-6">{passo.descricao}</p>
              <Button
                onClick={() => setLocation(passo.path)}
                className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
              >
                {passo.acao}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* RESUMO EXECUTIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ÚLTIMAS ATIVIDADES */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Últimas Atividades
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Base de Dados sincronizada</p>
                <p className="text-xs text-gray-500">Há 2 horas</p>
              </div>
            </div>
          </div>
        </Card>

        {/* DICAS */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Dicas para Maximizar Valor
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Conecte todas as suas fontes de dados para análises mais precisas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Use o Laboratório para testar estratégias antes de implementar</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

