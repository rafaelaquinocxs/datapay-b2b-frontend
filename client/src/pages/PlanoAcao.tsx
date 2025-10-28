import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Download,
  Send,
} from "lucide-react";

export default function PlanoAcao() {
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  const acoes = [
    {
      id: 1,
      titulo: "Criar Campanha WhatsApp",
      descricao: "Enviar mensagem personalizada para 2.810 clientes",
      status: "pendente",
      dataInicio: "2025-01-15",
      dataFim: "2025-01-30",
      responsavel: "Marketing",
      impactoEstimado: "R$ 128.000",
      probabilidade: "82%",
    },
    {
      id: 2,
      titulo: "Criar Oferta Especial",
      descricao: "Desconto de 15% no Kit X+Y para clientes C2",
      status: "em_progresso",
      dataInicio: "2025-01-10",
      dataFim: "2025-01-25",
      responsavel: "Vendas",
      impactoEstimado: "R$ 95.000",
      probabilidade: "75%",
    },
    {
      id: 3,
      titulo: "Análise de Churn",
      descricao: "Identificar clientes em risco de saída",
      status: "concluido",
      dataInicio: "2025-01-01",
      dataFim: "2025-01-10",
      responsavel: "BI",
      impactoEstimado: "R$ 45.000",
      probabilidade: "90%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-gray-100 text-gray-900";
      case "em_progresso":
        return "bg-blue-100 text-blue-900";
      case "concluido":
        return "bg-green-100 text-green-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plano de Ação</h1>
        <p className="text-gray-600 mt-1">Acompanhe as ações recomendadas pela IA</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total de Ações</p>
          <p className="text-3xl font-bold text-gray-900">3</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Impacto Total Estimado</p>
          <p className="text-3xl font-bold text-green-600">R$ 268 mil</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Taxa de Conclusão</p>
          <p className="text-3xl font-bold text-blue-600">33%</p>
        </Card>
      </div>

      <div className="space-y-4">
        {acoes.map((acao) => (
          <Card
            key={acao.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedAction(selectedAction === acao.id ? null : acao.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{acao.titulo}</h3>
                  <Badge className={getStatusColor(acao.status)}>
                    {acao.status === "pendente" && "Pendente"}
                    {acao.status === "em_progresso" && "Em Progresso"}
                    {acao.status === "concluido" && "Concluído"}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{acao.descricao}</p>

                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{acao.dataInicio} a {acao.dataFim}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{acao.responsavel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{acao.impactoEstimado}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold">{acao.probabilidade}</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            {selectedAction === acao.id && (
              <div className="pt-4 border-t space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Próximos Passos</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Revisar segmentação
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Preparar conteúdo
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      Agendar envio
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Send className="w-4 h-4 mr-2" />
                    Executar Ação
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
