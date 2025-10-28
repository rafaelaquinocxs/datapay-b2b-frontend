import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Clock,
  Webhook,
  History,
  CheckCircle2,
  AlertCircle,
  Loader,
  Plus,
  Trash2,
  Edit,
  Copy,
} from "lucide-react";

interface SyncSchedule {
  tipo: string;
  expressao?: string;
  janelaInicio?: string;
  janelaFim?: string;
  ativo: number;
}

interface DataSourceWebhook {
  url: string;
  secret: string;
  eventos: string[];
  ativo: number;
}

export default function ConfiguracaoSincronizacao() {
  const dataSourceId = 1;
  const [activeTab, setActiveTab] = useState<"agendamento" | "webhooks" | "auditoria">(
    "agendamento"
  );

  // Agendamento
  const [schedule, setSchedule] = useState<SyncSchedule>({
    tipo: "manual",
    ativo: 1,
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Webhooks
  const [webhook, setWebhook] = useState<DataSourceWebhook>({
    url: "",
    secret: "",
    eventos: [],
    ativo: 1,
  });
  const [showWebhookModal, setShowWebhookModal] = useState(false);

  // Auditoria
  const { data: auditLog } = trpc.dataSourceAuditLog.getAll.useQuery(
    { dataSourceId, limit: 20 },
    { enabled: !!dataSourceId }
  );

  const scheduleMutation = trpc.syncSchedules.save.useMutation({
    onSuccess: () => {
      toast.success("Agendamento salvo com sucesso!");
      setShowScheduleModal(false);
    },
    onError: () => {
      toast.error("Erro ao salvar agendamento");
    },
  });

  const webhookMutation = trpc.dataSourceWebhooks.save.useMutation({
    onSuccess: () => {
      toast.success("Webhook salvo com sucesso!");
      setShowWebhookModal(false);
    },
    onError: () => {
      toast.error("Erro ao salvar webhook");
    },
  });

  const handleSaveSchedule = async () => {
    if (!schedule.tipo) {
      toast.error("Selecione um tipo de agendamento");
      return;
    }

    await scheduleMutation.mutateAsync({
      dataSourceId,
      tipo: schedule.tipo,
      expressao: schedule.expressao,
      janelaInicio: schedule.janelaInicio,
      janelaFim: schedule.janelaFim,
      ativo: schedule.ativo,
    });
  };

  const handleSaveWebhook = async () => {
    if (!webhook.url || !webhook.secret) {
      toast.error("Preencha URL e secret");
      return;
    }

    await webhookMutation.mutateAsync({
      dataSourceId,
      url: webhook.url,
      secret: webhook.secret,
      eventos: webhook.eventos,
      ativo: webhook.ativo,
    });
  };

  const TIPOS_AGENDAMENTO = [
    { id: "manual", nome: "Manual", descricao: "Sincronizar sob demanda" },
    { id: "tempo_real", nome: "Tempo Real", descricao: "Via webhook" },
    { id: "intervalo", nome: "Intervalo", descricao: "A cada X minutos" },
    { id: "cron", nome: "Cron", descricao: "Expressão cron customizada" },
  ];

  const EVENTOS_WEBHOOK = [
    "sync_iniciado",
    "sync_concluido",
    "sync_erro",
    "dados_alterados",
    "validacao_falhou",
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Configuração de Sincronização
        </h1>
        <p className="text-gray-600 mt-1">
          Gerencie agendamentos, webhooks e histórico de sincronizações
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("agendamento")}
            className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
              activeTab === "agendamento"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Agendamento
          </button>
          <button
            onClick={() => setActiveTab("webhooks")}
            className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
              activeTab === "webhooks"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Webhook className="w-4 h-4 inline mr-2" />
            Webhooks
          </button>
          <button
            onClick={() => setActiveTab("auditoria")}
            className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
              activeTab === "auditoria"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <History className="w-4 h-4 inline mr-2" />
            Auditoria
          </button>
        </div>
      </div>

      {/* Agendamento */}
      {activeTab === "agendamento" && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tipo de Agendamento
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {TIPOS_AGENDAMENTO.map((tipo) => (
                <Card
                  key={tipo.id}
                  className={`p-4 cursor-pointer transition-all ${
                    schedule.tipo === tipo.id
                      ? "border-2 border-purple-600 bg-purple-50"
                      : "border border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSchedule({ ...schedule, tipo: tipo.id })}
                >
                  <h3 className="font-semibold text-gray-900">{tipo.nome}</h3>
                  <p className="text-sm text-gray-600">{tipo.descricao}</p>
                </Card>
              ))}
            </div>

            {schedule.tipo === "intervalo" && (
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Intervalo (minutos)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="1440"
                    value={schedule.expressao || ""}
                    onChange={(e) =>
                      setSchedule({ ...schedule, expressao: e.target.value })
                    }
                    placeholder="Ex: 60"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {schedule.tipo === "cron" && (
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Expressão Cron
                  </label>
                  <input
                    type="text"
                    value={schedule.expressao || ""}
                    onChange={(e) =>
                      setSchedule({ ...schedule, expressao: e.target.value })
                    }
                    placeholder="Ex: 0 0 * * * (diariamente)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Formato: segundo minuto hora dia mês dia_semana
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-6">
              <input
                type="checkbox"
                checked={schedule.ativo === 1}
                onChange={(e) =>
                  setSchedule({ ...schedule, ativo: e.target.checked ? 1 : 0 })
                }
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700">
                Ativar agendamento automático
              </span>
            </div>

            <Button
              onClick={handleSaveSchedule}
              disabled={scheduleMutation.isPending}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {scheduleMutation.isPending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Salvar Agendamento
                </>
              )}
            </Button>
          </Card>
        </div>
      )}

      {/* Webhooks */}
      {activeTab === "webhooks" && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Webhook</h2>
              <Button
                size="sm"
                onClick={() => setShowWebhookModal(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>

            {webhook.url ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">URL do Webhook</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-gray-900 break-all">
                      {webhook.url}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(webhook.url);
                        toast.success("Copiado!");
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Eventos</p>
                  <div className="flex flex-wrap gap-2">
                    {webhook.eventos.map((e) => (
                      <Badge key={e}>{e}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={webhook.ativo === 1}
                    onChange={(e) =>
                      setWebhook({
                        ...webhook,
                        ativo: e.target.checked ? 1 : 0,
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Webhook ativo</span>
                </div>

                <Button
                  onClick={handleSaveWebhook}
                  disabled={webhookMutation.isPending}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Salvar Webhook
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Webhook className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Nenhum webhook configurado</p>
                <Button
                  onClick={() => setShowWebhookModal(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Configurar Webhook
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Auditoria */}
      {activeTab === "auditoria" && (
        <div className="space-y-6">
          {auditLog && auditLog.length > 0 ? (
            <div className="space-y-3">
              {auditLog.map((log: any, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">
                          {log.acao}
                        </Badge>
                        <span className="text-xs text-gray-600">
                          {new Date(log.criadoEm).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      {log.mudancas && (
                        <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
                          {JSON.stringify(log.mudancas, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum evento registrado
              </h3>
              <p className="text-gray-600">
                Os eventos de sincronização aparecerão aqui
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Modal Webhook */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Configurar Webhook</h2>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                URL do Webhook
              </label>
              <input
                type="url"
                value={webhook.url}
                onChange={(e) => setWebhook({ ...webhook, url: e.target.value })}
                placeholder="https://seu-servidor.com/webhook"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Secret (para validação)
              </label>
              <input
                type="password"
                value={webhook.secret}
                onChange={(e) =>
                  setWebhook({ ...webhook, secret: e.target.value })
                }
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Eventos
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EVENTOS_WEBHOOK.map((evento) => (
                  <label key={evento} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={webhook.eventos.includes(evento)}
                      onChange={(e) => {
                        const newEventos = e.target.checked
                          ? [...webhook.eventos, evento]
                          : webhook.eventos.filter((x) => x !== evento);
                        setWebhook({ ...webhook, eventos: newEventos });
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">{evento}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowWebhookModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveWebhook}
                disabled={webhookMutation.isPending}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Salvar Webhook
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

