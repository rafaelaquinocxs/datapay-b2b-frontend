import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import {
  BarChart3,
  Download,
  RefreshCw,
  ExternalLink,
  FileSpreadsheet,
  Database,
  TrendingUp,
  Calendar,
  Filter,
  Eye,
  Share2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Target,
  Users,
  DollarSign,
} from "lucide-react";

interface Relatorio {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  dataCriacao: string;
  dataAtualizacao: string;
  status: string;
  metricas: {
    label: string;
    valor: string | number;
    mudanca?: number;
  }[];
}

export default function Relatorios() {
  const [atualizando, setAtualizando] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>("");

  const relatorios: Relatorio[] = [
    {
      id: 1,
      titulo: "Desempenho Geral - Novembro 2024",
      descricao: "Análise completa de métricas e KPIs do período",
      tipo: "desempenho",
      dataCriacao: "2024-11-01",
      dataAtualizacao: "2024-11-12",
      status: "atualizado",
      metricas: [
        { label: "Receita", valor: "R$ 2.5M", mudanca: 12 },
        { label: "Clientes Ativos", valor: "15.2k", mudanca: 8 },
        { label: "Taxa de Churn", valor: "2.3%", mudanca: -5 },
        { label: "NPS", valor: "72", mudanca: 3 },
      ],
    },
    {
      id: 2,
      titulo: "Análise de Campanhas - Q4 2024",
      descricao: "Performance de todas as campanhas de marketing",
      tipo: "campanhas",
      dataCriacao: "2024-10-15",
      dataAtualizacao: "2024-11-12",
      status: "atualizado",
      metricas: [
        { label: "Campanhas Ativas", valor: "8", mudanca: 2 },
        { label: "Taxa de Conversão", valor: "4.2%", mudanca: 0.8 },
        { label: "ROI Médio", valor: "245%", mudanca: 35 },
        { label: "Custo por Aquisição", valor: "R$ 45", mudanca: -8 },
      ],
    },
    {
      id: 3,
      titulo: "Relatório de Satisfação",
      descricao: "Análise de satisfação e feedback de clientes",
      tipo: "satisfacao",
      dataCriacao: "2024-11-05",
      dataAtualizacao: "2024-11-12",
      status: "atualizado",
      metricas: [
        { label: "Respondentes", valor: "2.8k", mudanca: 450 },
        { label: "Satisfação", valor: "8.4/10", mudanca: 0.3 },
        { label: "Taxa de Resposta", valor: "68%", mudanca: 5 },
        { label: "Detratores", valor: "12%", mudanca: -3 },
      ],
    },
    {
      id: 4,
      titulo: "Análise de Dados - Integração",
      descricao: "Status e qualidade dos dados integrados",
      tipo: "dados",
      dataCriacao: "2024-11-01",
      dataAtualizacao: "2024-11-12",
      status: "atualizado",
      metricas: [
        { label: "Fontes Ativas", valor: "12", mudanca: 1 },
        { label: "Registros Processados", valor: "2.1M", mudanca: 0.3 },
        { label: "Taxa de Erro", valor: "0.2%", mudanca: -0.1 },
        { label: "Latência Média", valor: "1.2s", mudanca: -0.3 },
      ],
    },
  ];

  const tipos = [...new Set(relatorios.map((r) => r.tipo))];
  const relatoriosFiltrados = filtroTipo
    ? relatorios.filter((r) => r.tipo === filtroTipo)
    : relatorios;

  const handleAtualizarDados = async () => {
    setAtualizando(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar dados");
    } finally {
      setAtualizando(false);
    }
  };

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, React.ReactNode> = {
      desempenho: <TrendingUp className="w-5 h-5" />,
      campanhas: <Target className="w-5 h-5" />,
      satisfacao: <Users className="w-5 h-5" />,
      dados: <Database className="w-5 h-5" />,
    };
    return icons[tipo] || <BarChart3 className="w-5 h-5" />;
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      desempenho: "Desempenho",
      campanhas: "Campanhas",
      satisfacao: "Satisfação",
      dados: "Dados",
    };
    return labels[tipo] || tipo;
  };

  const getTipoColor = (tipo: string) => {
    const cores: Record<string, string> = {
      desempenho: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      campanhas: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      satisfacao: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      dados: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    };
    return cores[tipo] || "";
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Insights & Relatórios</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Análises detalhadas e relatórios automáticos do seu negócio
                  </p>
                </div>
              </div>
              <Button
                onClick={handleAtualizarDados}
                disabled={atualizando}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${atualizando ? "animate-spin" : ""}`} />
                {atualizando ? "Atualizando..." : "Atualizar Dados"}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de Relatórios</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {relatorios.length}
                  </p>
                </div>
                <FileSpreadsheet className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Atualizados Hoje</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {relatorios.filter((r) => r.dataAtualizacao === "2024-11-12").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tipos de Relatório</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {tipos.length}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-orange-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Última Atualização</p>
                  <p className="text-sm text-gray-900 dark:text-white mt-2 font-semibold">
                    Hoje às 12:45
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setFiltroTipo("")}
              variant={filtroTipo === "" ? "default" : "outline"}
              className={filtroTipo === "" ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white" : "border-gray-300 dark:border-gray-700"}
            >
              Todos
            </Button>
            {tipos.map((tipo) => (
              <Button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                variant={filtroTipo === tipo ? "default" : "outline"}
                className={filtroTipo === tipo ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white" : "border-gray-300 dark:border-gray-700"}
              >
                {getTipoLabel(tipo)}
              </Button>
            ))}
          </div>

          {/* Lista de Relatórios */}
          <div className="space-y-4">
            {relatoriosFiltrados.map((relatorio) => (
              <Card
                key={relatorio.id}
                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${getTipoColor(relatorio.tipo)}`}>
                        {getTipoIcon(relatorio.tipo)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {relatorio.titulo}
                          </h3>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Atualizado
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {relatorio.descricao}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200 dark:border-gray-800">
                    {relatorio.metricas.map((metrica, idx) => (
                      <div key={idx}>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">
                          {metrica.label}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {metrica.valor}
                          </p>
                          {metrica.mudanca !== undefined && (
                            <span
                              className={`text-sm font-semibold ${
                                metrica.mudanca > 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {metrica.mudanca > 0 ? "+" : ""}{metrica.mudanca}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Informações */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Criado: {relatorio.dataCriacao}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Atualizado: {relatorio.dataAtualizacao}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-700"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Relatório
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-700"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

