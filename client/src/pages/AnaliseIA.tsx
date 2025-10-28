import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Sparkles,
  Loader2,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

interface Insight {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string | null;
  impactoEstimado: string | null;
  acoesSugeridas: string[] | null;
  createdAt: Date | null;
}

export default function AnaliseIA() {
  const empresa = { id: 1, nome: "Empresa Demo" }; // Mock para apresenta\u00e7\u00e3o
  const [gerando, setGerando] = useState(false);

  const {
    data: insightsHistoricos,
    refetch,
    isLoading,
  } = trpc.analiseIA.listarInsights.useQuery(
    { empresaId: empresa?.id || 0 },
    { enabled: !!empresa?.id }
  );

  const gerarInsights = trpc.analiseIA.gerarInsights.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.insights.length} insights gerados com sucesso!`);
      setGerando(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao gerar insights");
      setGerando(false);
    },
  });

  const handleGerarInsights = async () => {
    if (!empresa?.id) {
      toast.error("Empresa não identificada");
      return;
    }

    setGerando(true);
    await gerarInsights.mutateAsync({ empresaId: empresa.id });
  };

  const getImpactoColor = (impacto: string | null) => {
    if (!impacto) return "bg-gray-100 text-gray-800 border-gray-300";
    
    switch (impacto.toLowerCase()) {
      case "alto":
        return "bg-green-100 text-green-800 border-green-300";
      case "médio":
      case "medio":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "baixo":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getCategoriaIcon = (categoria: string | null) => {
    if (!categoria) return <Sparkles className="w-5 h-5" />;
    
    switch (categoria.toLowerCase()) {
      case "marketing":
        return <Target className="w-5 h-5" />;
      case "vendas":
        return <TrendingUp className="w-5 h-5" />;
      case "produto":
        return <Lightbulb className="w-5 h-5" />;
      case "operacional":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Análise da IA
              </h1>
            </div>
            <p className="text-gray-600">
              A IA analisa seus dados e gera insights criativos para aumentar
              vendas e lucro
            </p>
          </div>
          <Button
            onClick={handleGerarInsights}
            disabled={gerando}
            className="bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {gerando ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Gerando Insights...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Novos Insights
              </>
            )}
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      )}

      {!isLoading && (!insightsHistoricos || insightsHistoricos.length === 0) && (
        <Card className="p-12 text-center">
          <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum insight gerado ainda
          </h3>
          <p className="text-gray-600 mb-6">
            Clique no botão acima para gerar insights inteligentes com base nos
            seus dados
          </p>
          <Button
            onClick={handleGerarInsights}
            disabled={gerando}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {gerando ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Primeiro Insight
              </>
            )}
          </Button>
        </Card>
      )}

      {!isLoading && insightsHistoricos && insightsHistoricos.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(insightsHistoricos as Insight[]).map((insight) => (
            <Card key={insight.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {getCategoriaIcon(insight.categoria)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {insight.titulo}
                    </h3>
                    <span className="text-sm text-gray-500 capitalize">
                      {insight.categoria || "Geral"}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactoColor(
                    insight.impactoEstimado
                  )}`}
                >
                  Impacto {insight.impactoEstimado || "N/A"}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{insight.descricao}</p>

              {insight.acoesSugeridas &&
                Array.isArray(insight.acoesSugeridas) &&
                insight.acoesSugeridas.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Ações Sugeridas:
                    </h4>
                    <ul className="space-y-2">
                      {insight.acoesSugeridas.map((acao, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{acao}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Gerado em{" "}
                  {insight.createdAt
                    ? new Date(insight.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Data não disponível"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

