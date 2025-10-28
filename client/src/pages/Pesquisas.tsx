import { useState } from "react";

import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Share2, Copy, Eye, Trash2, MessageSquare, CheckCircle2, Users, TrendingUp, Gift } from "lucide-react";

export default function Pesquisas() {
  const user = { empresaId: 1 }; // Mock para apresenta\u00e7\u00e3o
  const [showForm, setShowForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"pesquisa" | "quiz" | "missao">("pesquisa");
  const [perguntas, setPerguntas] = useState([
    { id: "1", texto: "", tipo: "texto", opcoes: [] }
  ]);
  const [recompensaTipo, setRecompensaTipo] = useState("");
  const [recompensaValor, setRecompensaValor] = useState("");

  const empresaId = (user as any)?.empresaId || 0;
  const utils = trpc.useUtils();

  // Buscar pesquisas
  const { data: pesquisas = [], isLoading } = trpc.pesquisas.listar.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  // Criar pesquisa
  const criarMutation = trpc.pesquisas.criar.useMutation({
    onSuccess: (data) => {
      toast.success("Pesquisa criada com sucesso!");
      setTitulo("");
      setDescricao("");
      setPerguntas([{ id: "1", texto: "", tipo: "texto", opcoes: [] }]);
      setRecompensaTipo("");
      setRecompensaValor("");
      setShowForm(false);
      utils.pesquisas.listar.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar pesquisa");
    },
  });

  const handleCriarPesquisa = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("[Pesquisas] Tentando criar pesquisa:", { empresaId, titulo, perguntas });

    if (!titulo || perguntas.some(p => !p.texto)) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (!empresaId) {
      toast.error("Erro: Empresa não identificada. Faça login novamente.");
      return;
    }

    await criarMutation.mutateAsync({
      empresaId,
      titulo,
      descricao,
      tipo,
      perguntas,
      recompensaTipo,
      recompensaValor,
    });
  };

  const handleAdicionarPergunta = () => {
    const novaId = String(Math.max(...perguntas.map(p => parseInt(p.id) || 0)) + 1);
    setPerguntas([...perguntas, { id: novaId, texto: "", tipo: "texto", opcoes: [] }]);
  };

  const handleRemoverPergunta = (id: string) => {
    if (perguntas.length > 1) {
      setPerguntas(perguntas.filter(p => p.id !== id));
    }
  };

  const handleAtualizarPergunta = (id: string, campo: string, valor: any) => {
    setPerguntas(
      perguntas.map(p => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  };

  const handleCopiarLink = (linkPublico: string) => {
    const url = `${window.location.origin}/p/${linkPublico}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência!");
  };

  const totalRespostas = pesquisas.reduce((acc, p) => acc + (p.totalRespostas || 0), 0);
  const pesquisasAtivas = pesquisas.filter((p: any) => p.status === "ativa");

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pesquisas Gamificadas</h1>
          <p className="text-gray-600 mt-2">
            Crie pesquisas, compartilhe links e colete respostas com recompensas
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Pesquisa
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pesquisas Ativas</p>
              <p className="text-2xl font-bold">{pesquisasAtivas.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Respostas Coletadas</p>
              <p className="text-2xl font-bold">{totalRespostas}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total de Pesquisas</p>
              <p className="text-2xl font-bold">{pesquisas.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Gift className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Taxa Média</p>
              <p className="text-2xl font-bold">
                {pesquisas.length > 0 
                  ? Math.round(totalRespostas / pesquisas.length) 
                  : 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {showForm && (
        <Card className="p-6 border-2 border-purple-200">
          <h2 className="text-xl font-bold mb-4">Criar Nova Pesquisa</h2>
          <form onSubmit={handleCriarPesquisa} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Título *</Label>
                <Input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Pesquisa de Satisfação"
                />
              </div>

              <div>
                <Label>Tipo</Label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as any)}
                  className="w-full border rounded p-2"
                >
                  <option value="pesquisa">Pesquisa</option>
                  <option value="quiz">Quiz</option>
                  <option value="missao">Missão</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Descrição</Label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o objetivo da pesquisa"
                className="w-full border rounded p-2"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Recompensa</Label>
                <select
                  value={recompensaTipo}
                  onChange={(e) => setRecompensaTipo(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Nenhuma</option>
                  <option value="pontos">Pontos</option>
                  <option value="desconto">Desconto</option>
                  <option value="brinde">Brinde</option>
                </select>
              </div>

              {recompensaTipo && (
                <div>
                  <Label>Valor da Recompensa</Label>
                  <Input
                    value={recompensaValor}
                    onChange={(e) => setRecompensaValor(e.target.value)}
                    placeholder="Ex: 100 pontos, 10%"
                  />
                </div>
              )}
            </div>

            <div>
              <Label className="block mb-4">Perguntas *</Label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {perguntas.map((pergunta, idx) => (
                  <div key={pergunta.id} className="border rounded p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-sm">Pergunta {idx + 1}</span>
                      {perguntas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoverPergunta(pergunta.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕ Remover
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Input
                        value={pergunta.texto}
                        onChange={(e) =>
                          handleAtualizarPergunta(pergunta.id, "texto", e.target.value)
                        }
                        placeholder="Digite a pergunta"
                        size={1}
                      />

                      <select
                        value={pergunta.tipo}
                        onChange={(e) =>
                          handleAtualizarPergunta(pergunta.id, "tipo", e.target.value)
                        }
                        className="w-full border rounded p-2 text-sm"
                      >
                        <option value="texto">Texto Livre</option>
                        <option value="multipla">Múltipla Escolha</option>
                        <option value="escala">Escala (1-5)</option>
                        <option value="email">Email</option>
                        <option value="telefone">Telefone</option>
                      </select>

                      {pergunta.tipo === "multipla" && (
                        <Input
                          value={pergunta.opcoes?.join(", ") || ""}
                          onChange={(e) =>
                            handleAtualizarPergunta(
                              pergunta.id,
                              "opcoes",
                              e.target.value.split(",").map(o => o.trim())
                            )
                          }
                          placeholder="Opção 1, Opção 2, Opção 3"
                          size={1}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={handleAdicionarPergunta}
                variant="outline"
                className="mt-3 w-full"
              >
                + Adicionar Pergunta
              </Button>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={criarMutation.isPending}
              >
                {criarMutation.isPending ? "Criando..." : "Criar Pesquisa"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8">Carregando pesquisas...</div>
      ) : pesquisas.length === 0 ? (
        <Card className="p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Nenhuma pesquisa criada ainda</p>
          <p className="text-sm text-gray-500 mt-2">
            Clique em "Nova Pesquisa" para começar
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {pesquisas.map((pesquisa: any) => (
            <Card key={pesquisa.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{pesquisa.titulo}</h3>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {pesquisa.tipo}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      pesquisa.status === "ativa"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {pesquisa.status === "ativa" ? "🟢 Ativa" : "⏸️ Pausada"}
                    </span>
                  </div>
                  {pesquisa.descricao && (
                    <p className="text-gray-600 text-sm">{pesquisa.descricao}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleCopiarLink(pesquisa.linkPublico)}
                    title="Compartilhar: Copiar link para área de transferência"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Compartilhar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(`/p/${pesquisa.linkPublico}`, "_blank")
                    }
                    title="Visualizar"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded mb-3">
                <div>
                  <p className="text-xs text-gray-500">Perguntas</p>
                  <p className="text-lg font-semibold">
                    {pesquisa.perguntas?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Respostas</p>
                  <p className="text-lg font-semibold">{pesquisa.totalRespostas}</p>
                </div>
                {pesquisa.recompensaTipo && (
                  <div>
                    <p className="text-xs text-gray-500">Recompensa</p>
                    <p className="text-sm font-semibold">
                      {pesquisa.recompensaTipo}: {pesquisa.recompensaValor}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500">Criada em</p>
                  <p className="text-sm">
                    {new Date(pesquisa.criadoEm).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-200 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <code className="text-xs text-blue-900 flex-1 break-all font-mono">
                  {`${window.location.origin}/p/${pesquisa.linkPublico}`}
                </code>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

