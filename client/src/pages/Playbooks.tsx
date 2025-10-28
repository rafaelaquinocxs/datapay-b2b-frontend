import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Copy,
  Download,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Playbooks() {
  const playbooks = [
    {
      id: 1,
      titulo: "Reativação de Clientes Inativos",
      descricao: "Estratégia completa para trazer de volta clientes que não compram há 90 dias",
      categoria: "Retenção",
      impacto: "Alto",
      tempo: "30 dias",
      etapas: 5,
      taxa_sucesso: "68%",
      rating: 4.8,
    },
    {
      id: 2,
      titulo: "Upsell para Clientes Premium",
      descricao: "Identificar e oferecer produtos de maior valor para clientes de alto ticket",
      categoria: "Crescimento",
      impacto: "Médio",
      tempo: "45 dias",
      etapas: 4,
      taxa_sucesso: "55%",
      rating: 4.5,
    },
    {
      id: 3,
      titulo: "Referência de Amigos",
      descricao: "Programa de indicação para clientes satisfeitos gerarem novas vendas",
      categoria: "Aquisição",
      impacto: "Alto",
      tempo: "60 dias",
      etapas: 6,
      taxa_sucesso: "72%",
      rating: 4.9,
    },
    {
      id: 4,
      titulo: "Cross-sell Inteligente",
      descricao: "Recomendações de produtos complementares baseadas em histórico de compra",
      categoria: "Crescimento",
      impacto: "Médio",
      tempo: "20 dias",
      etapas: 3,
      taxa_sucesso: "62%",
      rating: 4.6,
    },
  ];

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Retenção":
        return "bg-blue-100 text-blue-900";
      case "Crescimento":
        return "bg-purple-100 text-purple-900";
      case "Aquisição":
        return "bg-green-100 text-green-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case "Alto":
        return "bg-red-100 text-red-900";
      case "Médio":
        return "bg-yellow-100 text-yellow-900";
      case "Baixo":
        return "bg-gray-100 text-gray-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Playbooks</h1>
        <p className="text-gray-600 mt-1">Estratégias reutilizáveis por vertical e caso de uso</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {playbooks.map((playbook) => (
          <Card key={playbook.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">{playbook.titulo}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{playbook.descricao}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <Badge className={getCategoriaColor(playbook.categoria)}>
                {playbook.categoria}
              </Badge>
              <Badge className={getImpactoColor(playbook.impacto)}>
                Impacto {playbook.impacto}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600">Tempo</p>
                <p className="font-semibold text-gray-900">{playbook.tempo}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600">Etapas</p>
                <p className="font-semibold text-gray-900">{playbook.etapas}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600">Taxa Sucesso</p>
                <p className="font-semibold text-green-600">{playbook.taxa_sucesso}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600">Rating</p>
                <p className="font-semibold text-yellow-600 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {playbook.rating}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Usar Playbook
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Baixar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-purple-50 border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-2">📚 Biblioteca de Playbooks</h4>
        <p className="text-sm text-purple-800 mb-4">
          Estes playbooks foram desenvolvidos com base em melhores práticas do mercado e validados por clientes de sucesso.
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-purple-900">E-commerce</p>
            <p className="text-purple-700">12 playbooks</p>
          </div>
          <div>
            <p className="font-semibold text-purple-900">SaaS</p>
            <p className="text-purple-700">8 playbooks</p>
          </div>
          <div>
            <p className="font-semibold text-purple-900">Varejo</p>
            <p className="text-purple-700">10 playbooks</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
