import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RelatoriosFormularios() {
  const relatorios = [
    {
      id: 1,
      formulario: "NPS - Net Promoter Score",
      periodo: "Janeiro 2025",
      taxaResposta: 68,
      respostasColetadas: 1650,
      gapsCriticos: ["Email não preenchido", "Data de aniversário faltando"],
      aderencia: 92,
      recomendacao: "Aumentar incentivo para resposta",
    },
    {
      id: 2,
      formulario: "Auditoria LGPD",
      periodo: "Janeiro 2025",
      taxaResposta: 92,
      respostasColetadas: 1100,
      gapsCriticos: ["Consentimento não explícito (15% dos clientes)"],
      aderencia: 98,
      recomendacao: "Enviar campanha de atualização de consentimento",
    },
    {
      id: 3,
      formulario: "Feedback de Produto",
      periodo: "Janeiro 2025",
      taxaResposta: 45,
      respostasColetadas: 400,
      gapsCriticos: [
        "Taxa baixa de resposta",
        "Muitas respostas incompletas",
      ],
      aderencia: 62,
      recomendacao: "Simplificar perguntas e reduzir de 8 para 5",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios de Formulários</h1>
          <p className="text-gray-600 mt-1">
            Aderência, gaps de dados e recomendações de IA
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Taxa Média Resposta</p>
          <p className="text-3xl font-bold text-blue-600">68%</p>
          <p className="text-xs text-blue-600 mt-2">↑ 8% vs mês anterior</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total Respostas</p>
          <p className="text-3xl font-bold text-green-600">3.150</p>
          <p className="text-xs text-green-600 mt-2">↑ 450 esta semana</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Aderência Média</p>
          <p className="text-3xl font-bold text-purple-600">84%</p>
          <p className="text-xs text-purple-600 mt-2">Conformidade de dados</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Gaps Críticos</p>
          <p className="text-3xl font-bold text-red-600">4</p>
          <p className="text-xs text-red-600 mt-2">Requerem ação</p>
        </Card>
      </div>

      {/* Relatórios Detalhados */}
      <div className="space-y-4">
        {relatorios.map((relatorio) => (
          <Card key={relatorio.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {relatorio.formulario}
                </h3>
                <p className="text-sm text-gray-600">{relatorio.periodo}</p>
              </div>
              <Badge className="bg-green-100 text-green-900">
                Aderência {relatorio.aderencia}%
              </Badge>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-blue-600 font-semibold">Taxa Resposta</p>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {relatorio.taxaResposta}%
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-green-600 font-semibold">Respostas</p>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {relatorio.respostasColetadas.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <p className="text-xs text-purple-600 font-semibold">Aderência</p>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {relatorio.aderencia}%
                </p>
              </div>
            </div>

            {/* Gaps Críticos */}
            {relatorio.gapsCriticos.length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900 mb-2">Gaps Críticos</p>
                    <ul className="space-y-1">
                      {relatorio.gapsCriticos.map((gap, idx) => (
                        <li key={idx} className="text-sm text-red-800">
                          • {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Recomendação IA */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Recomendação da IA</p>
                  <p className="text-sm text-blue-800">{relatorio.recomendacao}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t mt-4">
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Aplicar Recomendação
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
