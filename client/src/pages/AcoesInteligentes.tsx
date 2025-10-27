import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader,
} from "lucide-react";

const iconMap: Record<string, any> = {
  "Parceria Estratégica": Sparkles,
  "Retenção": Users,
  "Upsell": TrendingUp,
  "Default": Zap,
};

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  "Parceria Estratégica": { bg: "bg-purple-100", text: "text-purple-700", icon: "text-purple-600" },
  "Retenção": { bg: "bg-orange-100", text: "text-orange-700", icon: "text-orange-600" },
  "Upsell": { bg: "bg-green-100", text: "text-green-700", icon: "text-green-600" },
  "Default": { bg: "bg-blue-100", text: "text-blue-700", icon: "text-blue-600" },
};

export default function AcoesInteligentes() {
  const { user } = useAuth();
  const empresaId = (user as any)?.empresaId || 0;

  // Buscar ações inteligentes
  const { data: acoes = [], isLoading } = trpc.acoesInteligentes.listar.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  const acoesRecomendadas = acoes.filter((a: any) => a.status === "recomendada");
  const acoesEmAndamento = acoes.filter((a: any) => a.status === "em_andamento");

  const totalPotencial = acoesRecomendadas.reduce((acc: number, a: any) => {
    const valor = parseInt(a.potencialLucro?.replace(/\D/g, "") || "0");
    return acc + valor;
  }, 0);

  const roiMedio = acoesRecomendadas.length > 0
    ? Math.round(
        acoesRecomendadas.reduce((acc: number, a: any) => {
          const roi = parseInt(a.roi?.replace(/\D/g, "") || "0");
          return acc + roi;
        }, 0) / acoesRecomendadas.length
      )
    : 0;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Ações Inteligentes</h1>
            <p className="text-purple-100 mt-1">
              {acoesRecomendadas.length} campanhas recomendadas pela IA • Potencial de R$ {(totalPotencial / 1000).toFixed(0)}k/mês
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-purple-100">
            IA gerando novas ações em tempo real
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ações Recomendadas</p>
              <p className="text-3xl font-bold text-gray-900">{acoesRecomendadas.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Potencial Total</p>
              <p className="text-3xl font-bold text-gray-900">R$ {(totalPotencial / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ROI Médio</p>
              <p className="text-3xl font-bold text-gray-900">{roiMedio}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Em Andamento</p>
              <p className="text-3xl font-bold text-gray-900">{acoesEmAndamento.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ações Recomendadas */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Ações Recomendadas pela IA
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : acoesRecomendadas.length === 0 ? (
          <Card className="p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhuma ação recomendada ainda</p>
            <p className="text-sm text-gray-500 mt-2">
              A IA está analisando seus dados para gerar recomendações
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {acoesRecomendadas.map((acao: any) => {
              const colors = colorMap[acao.tipo] || colorMap["Default"];
              const Icon = iconMap[acao.tipo] || iconMap["Default"];

              return (
                <Card
                  key={acao.id}
                  className="p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-7 h-7 ${colors.icon}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {acao.titulo}
                          </h3>
                          <Badge className={`${colors.bg} ${colors.text}`}>{acao.tipo}</Badge>
                          <Badge
                            className={
                              acao.prioridade === "Crítica"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {acao.prioridade}
                          </Badge>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {acao.descricao}
                        </p>
                        {acao.baseadoEm && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span className="italic">{acao.baseadoEm}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Potencial de Lucro</p>
                      <p className="text-lg font-bold text-green-600">
                        {acao.potencialLucro || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ROI Estimado</p>
                      <p className="text-lg font-bold text-blue-600">{acao.roi || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Implementação</p>
                      <p className="text-lg font-bold text-gray-900">
                        {acao.implementacao || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Passos de Implementação */}
                  {acao.acoes && Array.isArray(acao.acoes) && acao.acoes.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Passos para Implementar:
                      </p>
                      <div className="space-y-2">
                        {acao.acoes.map((passo: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{passo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm">
                      Ver Detalhes Completos
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Ativar Ação
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Ações em Andamento */}
      {acoesEmAndamento.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Ações em Andamento
          </h2>

          <div className="space-y-4">
            {acoesEmAndamento.map((acao: any) => (
              <Card
                key={acao.id}
                className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {acao.titulo}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Status: {acao.status}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <Zap className="w-3 h-3 mr-1" />
                    Ativa
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

