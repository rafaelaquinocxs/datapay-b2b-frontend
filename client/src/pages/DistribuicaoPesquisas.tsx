import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Mail,
  MessageCircle,
  Smartphone,
  Link2,
  Zap,
  Calendar,
  Send,
  Edit2,
  Pause,
  Plus,
} from "lucide-react";

export default function DistribuicaoPesquisas() {
  const [showModalDistribuicao, setShowModalDistribuicao] = useState(false);
  const [canaisSelecionados, setCanaisSelecionados] = useState(["email"]);

  const distribuicoes = [
    {
      id: 1,
      pesquisa: "NPS - Net Promoter Score",
      canais: ["email", "whatsapp"],
      recorrencia: "Mensal",
      proximoEnvio: "2025-02-15",
      ultimoEnvio: "2025-01-15",
      alcance: 2450,
      taxaEntrega: 98,
      ativo: true,
    },
    {
      id: 2,
      pesquisa: "Satisfação com Atendimento",
      canais: ["email", "app"],
      recorrencia: "Semanal",
      proximoEnvio: "2025-02-03",
      ultimoEnvio: "2025-01-27",
      alcance: 890,
      taxaEntrega: 95,
      ativo: true,
    },
    {
      id: 3,
      pesquisa: "Clima Organizacional",
      canais: ["email"],
      recorrencia: "Trimestral",
      proximoEnvio: "2025-04-01",
      ultimoEnvio: "2025-01-01",
      alcance: 245,
      taxaEntrega: 100,
      ativo: true,
    },
  ];

  const toggleCanal = (canal: string) => {
    setCanaisSelecionados((prev) =>
      prev.includes(canal)
        ? prev.filter((c) => c !== canal)
        : [...prev, canal]
    );
  };

  const handleCriarDistribuicao = () => {
    if (canaisSelecionados.length === 0) {
      toast.error("Selecione pelo menos um canal");
      return;
    }
    toast.success("Distribuição criada com sucesso!");
    setShowModalDistribuicao(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Distribuição de Pesquisas</h1>
          <p className="text-gray-600 mt-1">
            Configure envios automáticos por canal
          </p>
        </div>
        <Button
          onClick={() => setShowModalDistribuicao(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Distribuição
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Distribuições Ativas</p>
          <p className="text-3xl font-bold text-purple-600">3</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Próximos 7 dias</p>
          <p className="text-3xl font-bold text-blue-600">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Alcance Total</p>
          <p className="text-3xl font-bold text-green-600">3.585</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Taxa Média Entrega</p>
          <p className="text-3xl font-bold text-orange-600">97%</p>
        </Card>
      </div>

      {/* Distribuições */}
      <div className="space-y-4">
        {distribuicoes.map((dist) => (
          <Card key={dist.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {dist.pesquisa}
                </h3>

                <div className="grid grid-cols-5 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-600">Recorrência</p>
                    <p className="font-semibold text-gray-900">{dist.recorrencia}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Próximo Envio</p>
                    <p className="font-semibold text-gray-900">{dist.proximoEnvio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Alcance</p>
                    <p className="font-semibold text-gray-900">{dist.alcance.toLocaleString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Taxa Entrega</p>
                    <p className="font-semibold text-green-600">{dist.taxaEntrega}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-900">Ativo</Badge>
                  </div>
                </div>

                {/* Canais */}
                <div className="flex gap-2 mb-4">
                  {dist.canais.includes("email") && (
                    <Badge className="bg-blue-100 text-blue-900 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Email
                    </Badge>
                  )}
                  {dist.canais.includes("whatsapp") && (
                    <Badge className="bg-green-100 text-green-900 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </Badge>
                  )}
                  {dist.canais.includes("app") && (
                    <Badge className="bg-purple-100 text-purple-900 flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      App
                    </Badge>
                  )}
                  {dist.canais.includes("link") && (
                    <Badge className="bg-orange-100 text-orange-900 flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      Link
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" variant="outline">
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button size="sm" variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Testar Envio
              </Button>
              <Button size="sm" variant="outline">
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Nova Distribuição */}
      {showModalDistribuicao && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nova Distribuição
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Pesquisa
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600">
                  <option>NPS - Net Promoter Score</option>
                  <option>Satisfação com Atendimento</option>
                  <option>Clima Organizacional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Canais de Envio
                </label>
                <div className="space-y-2">
                  {[
                    { id: "email", nome: "Email", icon: Mail },
                    { id: "whatsapp", nome: "WhatsApp", icon: MessageCircle },
                    { id: "app", nome: "App", icon: Smartphone },
                    { id: "link", nome: "Link Direto", icon: Link2 },
                    { id: "api", nome: "API/CRM", icon: Zap },
                  ].map((canal) => (
                    <label
                      key={canal.id}
                      className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={canaisSelecionados.includes(canal.id)}
                        onChange={() => toggleCanal(canal.id)}
                        className="w-4 h-4"
                      />
                      <canal.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {canal.nome}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleCriarDistribuicao}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Criar Distribuição
                </Button>
                <Button
                  onClick={() => setShowModalDistribuicao(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
