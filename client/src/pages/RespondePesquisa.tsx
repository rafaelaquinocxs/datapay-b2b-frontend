import { useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Gift, CheckCircle2, AlertCircle } from "lucide-react";

export default function RespondePesquisa() {
  const [, params] = useRoute("/p/:linkPublico");
  const linkPublico = params?.linkPublico || "";
  const [nomeRespondente, setNomeRespondente] = useState("");
  const [emailRespondente, setEmailRespondente] = useState("");
  const [telefoneRespondente, setTelefoneRespondente] = useState("");
  const [respostas, setRespostas] = useState<Record<string, any>>({});
  const [enviado, setEnviado] = useState(false);

  // Buscar pesquisa
  const { data: pesquisa, isLoading, error } = trpc.pesquisas.buscarPorLink.useQuery(
    { linkPublico: linkPublico || "" },
    { enabled: !!linkPublico }
  ) as any;

  // Enviar resposta
  const enviarMutation = trpc.pesquisas.enviarResposta.useMutation({
    onSuccess: () => {
      toast.success("Resposta enviada com sucesso!");
      setEnviado(true);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao enviar resposta");
    },
  });

  const handleEnviarResposta = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pesquisa) return;

    // Validar campos obrigatórios
    const perguntasObrigatorias = (pesquisa.perguntas as any[])?.filter((p: any) => p.obrigatoria !== false) || [];
    const respostasInvalidas = perguntasObrigatorias.some(
      (p: any) => !respostas[p.id] || respostas[p.id].toString().trim() === ""
    );

    if (respostasInvalidas) {
      toast.error("Preencha todas as perguntas obrigatórias");
      return;
    }

    const respostasFormatadas = Object.entries(respostas).map(([perguntaId, resposta]) => ({
      perguntaId,
      resposta,
    }));

    await enviarMutation.mutateAsync({
      pesquisaId: pesquisa.id,
      respostas: respostasFormatadas,
      nomeRespondente: nomeRespondente || undefined,
      emailRespondente: emailRespondente || undefined,
      telefoneRespondente: telefoneRespondente || undefined,
    });
  };

  const handleAtualizarResposta = (perguntaId: string, valor: any) => {
    setRespostas({
      ...respostas,
      [perguntaId]: valor,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Carregando pesquisa...</p>
        </Card>
      </div>
    );
  }

  if (error || !pesquisa) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pesquisa não encontrada</h2>
          <p className="text-gray-600">
            A pesquisa que você está tentando acessar não existe ou foi encerrada.
          </p>
          <Button className="mt-4" onClick={() => window.location.href = "/"}>Voltar para Home</Button>
        </Card>
      </div>
    );
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Obrigado!</h2>
          <p className="text-gray-600 mb-4">
            Sua resposta foi enviada com sucesso.
          </p>

          {pesquisa.recompensaTipo && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 justify-center">
                <Gift className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Você ganhou:</p>
                  <p className="font-bold text-purple-700">
                    {pesquisa.recompensaTipo}: {pesquisa.recompensaValor}
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Você pode fechar esta página ou compartilhar com amigos.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6 bg-white border-2 border-purple-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {pesquisa.titulo}
          </h1>
          {pesquisa.descricao && (
            <p className="text-gray-600 mb-4">{pesquisa.descricao}</p>
          )}

          {pesquisa.recompensaTipo && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Gift className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Recompensa por responder:</p>
                <p className="font-semibold text-purple-700">
                  {pesquisa.recompensaTipo}: {pesquisa.recompensaValor}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Formulário */}
        <Card className="p-6">
          <form onSubmit={handleEnviarResposta} className="space-y-6">
            {/* Dados do Respondente */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Seus Dados
              </h2>
              <div className="space-y-3">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={nomeRespondente}
                    onChange={(e) => setNomeRespondente(e.target.value)}
                    placeholder="Seu nome (opcional)"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={emailRespondente}
                    onChange={(e) => setEmailRespondente(e.target.value)}
                    placeholder="seu@email.com (opcional)"
                  />
                </div>

                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={telefoneRespondente}
                    onChange={(e) => setTelefoneRespondente(e.target.value)}
                    placeholder="(11) 99999-9999 (opcional)"
                  />
                </div>
              </div>
            </div>

            {/* Perguntas */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Perguntas ({(pesquisa.perguntas as any[])?.length || 0})
              </h2>
              <div className="space-y-6">
                {(pesquisa.perguntas as any[])?.map((pergunta: any, idx: number) => (
                  <div key={pergunta.id} className="border rounded-lg p-4 bg-gray-50">
                    <Label className="block mb-3 font-semibold text-gray-900">
                      {idx + 1}. {pergunta.texto}
                    </Label>

                    {pergunta.tipo === "texto" && (
                      <Input
                        value={respostas[pergunta.id] || ""}
                        onChange={(e) =>
                          handleAtualizarResposta(pergunta.id, e.target.value)
                        }
                        placeholder="Digite sua resposta"
                      />
                    )}

                    {pergunta.tipo === "email" && (
                      <Input
                        type="email"
                        value={respostas[pergunta.id] || ""}
                        onChange={(e) =>
                          handleAtualizarResposta(pergunta.id, e.target.value)
                        }
                        placeholder="seu@email.com"
                      />
                    )}

                    {pergunta.tipo === "telefone" && (
                      <Input
                        value={respostas[pergunta.id] || ""}
                        onChange={(e) =>
                          handleAtualizarResposta(pergunta.id, e.target.value)
                        }
                        placeholder="(11) 99999-9999"
                      />
                    )}

                    {pergunta.tipo === "multipla" && (
                      <div className="space-y-2">
                        {pergunta.opcoes?.map((opcao: string, optIdx: number) => (
                          <label key={optIdx} className="flex items-center gap-3 p-2 hover:bg-white rounded cursor-pointer">
                            <input
                              type="radio"
                              name={`pergunta-${pergunta.id}`}
                              value={opcao}
                              checked={respostas[pergunta.id] === opcao}
                              onChange={(e) =>
                                handleAtualizarResposta(pergunta.id, e.target.value)
                              }
                              className="w-4 h-4"
                            />
                            <span className="text-gray-700">{opcao}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {pergunta.tipo === "escala" && (
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <button
                            key={valor}
                            type="button"
                            onClick={() =>
                              handleAtualizarResposta(pergunta.id, valor)
                            }
                            className={`w-10 h-10 rounded border-2 font-semibold transition-colors ${
                              respostas[pergunta.id] === valor
                                ? "bg-purple-600 text-white border-purple-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-purple-600"
                            }`}
                          >
                            {valor}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Enviar */}
            <div className="flex gap-2 pt-4 border-t">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 flex-1"
                disabled={enviarMutation.isPending}
              >
                {enviarMutation.isPending ? "Enviando..." : "Enviar Resposta"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Suas respostas serão usadas para melhorar nossos serviços.
          </p>
        </div>
      </div>
    </div>
  );
}

