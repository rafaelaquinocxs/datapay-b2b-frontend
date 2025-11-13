import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
} from "lucide-react";
import QuestionarioDiagnostico from "@/components/QuestionarioDiagnostico";
import RelatorioDiagnostico from "@/components/RelatorioDiagnostico";

interface DadosEmpresa {
  clientesAtivos: string;
  clientesInativos: string;
  investimentoMarketing: string;
  ticketMedio: string;
  taxaRecompra: string;
}

export default function Diagnostico() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const empresaId = usuario?.id || 1;
  const [etapa, setEtapa] = useState<"intro" | "questionario" | "relatorio">("intro");
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    clientesAtivos: "",
    clientesInativos: "",
    investimentoMarketing: "",
    ticketMedio: "",
    taxaRecompra: "",
  });

  const handleConcluirQuestionario = (
    respostasQuestionario: Record<number, number>,
    dadosEmpresaQuestionario: DadosEmpresa
  ) => {
    setRespostas(respostasQuestionario);
    setDadosEmpresa(dadosEmpresaQuestionario);
    setEtapa("relatorio");
  };

  if (etapa === "relatorio") {
    return (
      <RelatorioDiagnostico
        respostas={respostas}
        dadosEmpresa={dadosEmpresa}
      />
    );
  }

  if (etapa === "questionario") {
    return (
      <QuestionarioDiagnostico onConcluir={handleConcluirQuestionario} />
    );
  }

  // Tela de introdução
  if (etapa === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-8">
        <div className="max-w-5xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto">
              <BarChart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Diagnóstico de Maturidade em Dados
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra o nível de maturidade da sua empresa em dados e quanto
              você está deixando de ganhar por não usar dados de forma
              inteligente.
            </p>
          </div>

          {/* Benefícios */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              O que você vai descobrir
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Score de Maturidade
                  </h3>
                  <p className="text-sm text-gray-600">
                    Avaliação de 0 a 100 em 5 dimensões críticas de dados
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Dinheiro Desperdiçado
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quanto você perde por não usar dados integrados
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Potencial de Crescimento
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quanto pode ganhar com dados ativados corretamente
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Relatório Interativo
                  </h3>
                  <p className="text-sm text-gray-600">
                    Visualização clara dos gaps e oportunidades
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 5 Dimensões */}
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              5 Dimensões Avaliadas
            </h2>

            <div className="space-y-4">
              {[
                {
                  titulo: "Governança e Qualidade dos Dados",
                  descricao:
                    "Dados confiáveis, padronizados e acessíveis para toda a empresa",
                },
                {
                  titulo: "Integração de Fontes",
                  descricao:
                    "CRM, ERP, e-commerce e campanhas conectados em uma única visão",
                },
                {
                  titulo: "Capacidade Analítica",
                  descricao:
                    "Dashboards, BI e análises preditivas além de relatórios estáticos",
                },
                {
                  titulo: "Tomada de Decisão Baseada em Dados",
                  descricao:
                    "Decisões estratégicas fundamentadas em evidências quantitativas",
                },
                {
                  titulo: "Retorno sobre Investimento em Dados",
                  descricao:
                    "Clareza sobre o impacto dos dados em vendas, marketing e retenção",
                },
              ].map((dimensao, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {dimensao.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {dimensao.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">5-10 min</p>
              <p className="text-sm text-gray-600 mt-1">Tempo de diagnóstico</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">20</p>
              <p className="text-sm text-gray-600 mt-1">Perguntas estratégicas</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-600 mt-1">Gratuito e sem compromisso</p>
            </Card>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 text-lg"
              onClick={() => setEtapa("questionario")}
            >
              Iniciar Diagnóstico Gratuito
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500">
              Sem cadastro • Resultado instantâneo • Relatório completo
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

