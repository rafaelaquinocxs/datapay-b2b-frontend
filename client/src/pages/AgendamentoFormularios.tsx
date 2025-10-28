import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MessageCircle,
  Mail,
  Smartphone,
  Zap,
  Check,
  X,
  Plus,
  Edit2,
} from "lucide-react";

export default function AgendamentoFormularios() {
  const [showModalAgendamento, setShowModalAgendamento] = useState(false);
  const [tipoRecorrencia, setTipoRecorrencia] = useState("mensal");
  const [canaisAtivos, setCanaisAtivos] = useState(["email", "whatsapp"]);

  const agendamentos = [
    {
      id: 1,
      formulario: "NPS - Net Promoter Score",
      recorrencia: "Mensal",
      proximoEnvio: "2025-02-15",
      ultimoEnvio: "2025-01-15",
      canais: ["email", "whatsapp"],
      ativo: true,
      alcance: "2.450 clientes",
    },
    {
      id: 2,
      formulario: "Auditoria LGPD",
      recorrencia: "Trimestral",
      proximoEnvio: "2025-04-01",
      ultimoEnvio: "2025-01-01",
      canais: ["email"],
      ativo: true,
      alcance: "1.200 clientes",
    },
    {
      id: 3,
      formulario: "Feedback de Produto",
      recorrencia: "Semanal",
      proximoEnvio: "2025-02-03",
      ultimoEnvio: "2025-01-27",
      canais: ["app", "email"],
      ativo: true,
      alcance: "890 clientes",
    },
  ];

  const toggleCanal = (canal: string) => {
    setCanaisAtivos((prev) =>
      prev.includes(canal) ? prev.filter((c) => c !== canal) : [...prev, canal]
    );
  };

  const handleCriarAgendamento = () => {
    if (canaisAtivos.length === 0) {
      toast.error("Selecione pelo menos um canal");
      return;
    }
    toast.success("Agendamento criado com sucesso!");
    setShowModalAgendamento(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamento de Formulários</h1>
          <p className="text-gray-600 mt-1">
            Configure envios automáticos por canal
          </p>
        </div>
        <Button
          onClick={() => setShowModalAgendamento(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Agendamentos Ativos</p>
          <p className="text-3xl font-bold text-purple-600">{agendamentos.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Próximos 7 dias</p>
          <p className="text-3xl font-bold text-blue-600">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Clientes Alcançados</p>
          <p className="text-3xl font-bold text-green-600">4.540</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Taxa Média Envio</p>
          <p className="text-3xl font-bold text-orange-600">98%</p>
        </Card>
      </div>

      {/* Agendamentos */}
      <div className="space-y-4">
        {agendamentos.map((agendamento) => (
          <Card key={agendamento.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {agendamento.formulario}
                </h3>

                <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">Recorrência</p>
                      <p className="font-semibold text-gray-900">
                        {agendamento.recorrencia}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Próximo Envio</p>
                      <p className="font-semibold text-gray-900">
                        {agendamento.proximoEnvio}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-600">Último Envio</p>
                      <p className="font-semibold text-gray-900">
                        {agendamento.ultimoEnvio}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Alcance</p>
                    <p className="font-semibold text-gray-900">
                      {agendamento.alcance}
                    </p>
                  </div>
                </div>

                {/* Canais */}
                <div className="flex gap-2 mb-4">
                  {agendamento.canais.includes("email") && (
                    <Badge className="bg-blue-100 text-blue-900 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Email
                    </Badge>
                  )}
                  {agendamento.canais.includes("whatsapp") && (
                    <Badge className="bg-green-100 text-green-900 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </Badge>
                  )}
                  {agendamento.canais.includes("app") && (
                    <Badge className="bg-purple-100 text-purple-900 flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      App
                    </Badge>
                  )}
                </div>

                <Badge
                  className={
                    agendamento.ativo
                      ? "bg-green-100 text-green-900"
                      : "bg-gray-100 text-gray-900"
                  }
                >
                  {agendamento.ativo ? "Ativo" : "Pausado"}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" variant="outline">
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button size="sm" variant="outline">
                <Check className="w-4 h-4 mr-2" />
                Testar Envio
              </Button>
              <Button size="sm" variant="outline">
                <X className="w-4 h-4 mr-2" />
                Pausar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Novo Agendamento */}
      {showModalAgendamento && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Novo Agendamento
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Formulário
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600">
                  <option>NPS - Net Promoter Score</option>
                  <option>Auditoria LGPD</option>
                  <option>Feedback de Produto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Recorrência
                </label>
                <select
                  value={tipoRecorrencia}
                  onChange={(e) => setTipoRecorrencia(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  <option value="diaria">Diária</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                  <option value="trimestral">Trimestral</option>
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
                    { id: "api", nome: "API/CRM", icon: Zap },
                  ].map((canal) => (
                    <label
                      key={canal.id}
                      className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={canaisAtivos.includes(canal.id)}
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
                  onClick={handleCriarAgendamento}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Criar Agendamento
                </Button>
                <Button
                  onClick={() => setShowModalAgendamento(false)}
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
