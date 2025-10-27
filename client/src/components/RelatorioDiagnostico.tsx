import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Target,
  ArrowRight,
  Download,
} from "lucide-react";

interface DadosEmpresa {
  clientesAtivos: string;
  clientesInativos: string;
  investimentoMarketing: string;
  ticketMedio: string;
  taxaRecompra: string;
}

interface RelatorioDiagnosticoProps {
  respostas: Record<number, number>;
  dadosEmpresa: DadosEmpresa;
}

export default function RelatorioDiagnostico({
  respostas,
  dadosEmpresa,
}: RelatorioDiagnosticoProps) {
  // Calcular scores por dimensão
  const calcularScoreDimensao = (dimensao: string) => {
    const perguntasDimensao = Object.entries(respostas).filter(([id]) => {
      const perguntaId = parseInt(id);
      if (dimensao === "Governança e Qualidade") return perguntaId >= 1 && perguntaId <= 4;
      if (dimensao === "Integração de Fontes") return perguntaId >= 5 && perguntaId <= 8;
      if (dimensao === "Capacidade Analítica") return perguntaId >= 9 && perguntaId <= 12;
      if (dimensao === "Tomada de Decisão") return perguntaId >= 13 && perguntaId <= 16;
      if (dimensao === "ROI em Dados") return perguntaId >= 17 && perguntaId <= 20;
      return false;
    });

    const soma = perguntasDimensao.reduce((acc, [, valor]) => acc + valor, 0);
    return Math.round(soma / perguntasDimensao.length);
  };

  const scores = {
    governanca: calcularScoreDimensao("Governança e Qualidade"),
    integracao: calcularScoreDimensao("Integração de Fontes"),
    analitica: calcularScoreDimensao("Capacidade Analítica"),
    decisao: calcularScoreDimensao("Tomada de Decisão"),
    roi: calcularScoreDimensao("ROI em Dados"),
  };

  const scoreGeral = Math.round(
    (scores.governanca +
      scores.integracao +
      scores.analitica +
      scores.decisao +
      scores.roi) /
      5
  );

  // Calcular ROI potencial
  const clientesAtivos = parseInt(dadosEmpresa.clientesAtivos) || 0;
  const investimentoMarketing = parseInt(dadosEmpresa.investimentoMarketing) || 0;
  const ticketMedio = parseInt(dadosEmpresa.ticketMedio) || 0;

  // Estimativas baseadas em benchmarks de mercado
  const desperdicioCAC = investimentoMarketing * 0.3; // 30% de desperdício sem dados integrados
  const potencialConversao = clientesAtivos * ticketMedio * 0.2 * 0.01; // +20% conversão = 0.2% do total
  const economiaChurn = clientesAtivos * ticketMedio * 0.15 * 0.01; // -15% churn

  const totalDesperdicio = desperdicioCAC;
  const totalPotencial = potencialConversao + economiaChurn;

  const getNivelMaturidade = (score: number) => {
    if (score >= 80) return { nivel: "Avançado", cor: "text-green-600", bg: "bg-green-100" };
    if (score >= 60) return { nivel: "Intermediário", cor: "text-blue-600", bg: "bg-blue-100" };
    if (score >= 40) return { nivel: "Básico", cor: "text-yellow-600", bg: "bg-yellow-100" };
    return { nivel: "Inicial", cor: "text-red-600", bg: "bg-red-100" };
  };

  const nivelGeral = getNivelMaturidade(scoreGeral);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Resultado do Diagnóstico
          </h1>
          <p className="text-gray-600">
            Análise completa da maturidade em dados da sua empresa
          </p>
        </div>

        {/* Score Geral */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 mb-2">Score Geral de Maturidade</p>
              <div className="flex items-baseline gap-4">
                <h2 className="text-6xl font-bold">{scoreGeral}</h2>
                <span className="text-2xl text-purple-100">/100</span>
              </div>
              <Badge className={`mt-4 ${nivelGeral.bg} ${nivelGeral.cor}`}>
                Nível {nivelGeral.nivel}
              </Badge>
            </div>
            <div className="w-40 h-40 rounded-full border-8 border-white/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold">{scoreGeral}%</div>
                <div className="text-sm text-purple-100">Maturidade</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Scores por Dimensão */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Scores por Dimensão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { nome: "Governança e Qualidade", score: scores.governanca },
              { nome: "Integração de Fontes", score: scores.integracao },
              { nome: "Capacidade Analítica", score: scores.analitica },
              { nome: "Tomada de Decisão", score: scores.decisao },
              { nome: "ROI em Dados", score: scores.roi },
            ].map((dimensao) => {
              const nivel = getNivelMaturidade(dimensao.score);
              return (
                <Card key={dimensao.nome} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {dimensao.nome}
                    </h3>
                    <Badge className={`${nivel.bg} ${nivel.cor}`}>
                      {nivel.nivel}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {dimensao.score}
                    </span>
                    <span className="text-gray-500">/100</span>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        dimensao.score >= 80
                          ? "bg-green-500"
                          : dimensao.score >= 60
                          ? "bg-blue-500"
                          : dimensao.score >= 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${dimensao.score}%` }}
                    ></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Calculadora de ROI */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Impacto Financeiro
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Desperdício */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Desperdício Mensal</p>
                  <p className="text-xs text-gray-500">
                    Sem dados integrados
                  </p>
                </div>
              </div>
              <p className="text-4xl font-bold text-red-600 mb-2">
                R$ {(totalDesperdicio / 1000).toFixed(0)}k
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span>30% do investimento em marketing desperdiçado</span>
                </div>
              </div>
            </Card>

            {/* Potencial */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Potencial Mensal</p>
                  <p className="text-xs text-gray-500">Com DataPay</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-green-600 mb-2">
                R$ {(totalPotencial / 1000).toFixed(0)}k
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>+20% conversão via segmentação inteligente</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>-15% churn com ações preditivas</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Total Anual */}
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Impacto Anual Estimado
                </h3>
                <p className="text-purple-100">
                  Economia + Crescimento com DataPay
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                  <DollarSign className="w-8 h-8" />
                  <span className="text-5xl font-bold">
                    {((totalDesperdicio + totalPotencial) * 12 / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-purple-100 text-sm mt-1">por ano</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Próximos Passos */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Próximos Passos
              </h2>
              <p className="text-gray-600">
                Como o DataPay pode ajudar sua empresa
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Agendar Demo Personalizada
                </h3>
                <p className="text-sm text-gray-600">
                  Veja como o DataPay funciona com os dados da sua empresa
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  POC de 30 Dias
                </h3>
                <p className="text-sm text-gray-600">
                  Teste a plataforma com seus dados reais sem compromisso
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Implementação Completa
                </h3>
                <p className="text-sm text-gray-600">
                  Integração com seus sistemas e treinamento da equipe
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Agendar Demo Gratuita
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Baixar Relatório PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

