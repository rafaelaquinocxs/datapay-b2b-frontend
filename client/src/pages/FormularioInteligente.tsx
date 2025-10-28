import { useState, useEffect } from "react";

import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Lightbulb, CheckCircle2, AlertCircle, Loader2, Send, RefreshCw } from "lucide-react";

interface SugestaoIA {
  titulo: string;
  descricao: string;
  perguntasRecomendadas: string[];
  impactoEstimado: string;
  prioridade: "alta" | "media" | "baixa";
}

export default function FormularioInteligente() {
  const user = { empresaId: 1 }; // Mock para apresenta\u00e7\u00e3o
  const [sugestoes, setSugestoes] = useState<SugestaoIA[]>([]);
  const [carregandoSugestoes, setCarregandoSugestoes] = useState(false);
  const [formularioAtivo, setFormularioAtivo] = useState<number | null>(null);
  const [respostasFormulario, setRespostasFormulario] = useState<Record<string, string>>({});
  const [enviandoFormulario, setEnviandoFormulario] = useState(false);

  const empresaId = (user as any)?.empresaId || 0;

  // Mutation para gerar sugestões
  const gerarSugestoesMutation = trpc.analiseIA.gerarSugestoesFormularios.useMutation({
    onSuccess: (data) => {
      if (data.sugestoes) {
        setSugestoes(data.sugestoes);
        toast.success("Sugestões geradas com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Erro ao gerar sugestões:", error);
      toast.error("Erro ao gerar sugestões da IA");
    },
  });

  // Gerar sugestões de IA baseado nos dados da empresa
  const gerarSugestoes = async () => {
    if (!empresaId) {
      toast.error("Empresa não identificada");
      return;
    }

    await gerarSugestoesMutation.mutateAsync({
      empresaId,
    });
  };

  // Mutation para salvar respostas
  const salvarRespostasMutation = trpc.formularios.salvarRespostas.useMutation({
    onSuccess: () => {
      toast.success("Respostas salvas com sucesso!");
      setFormularioAtivo(null);
      setRespostasFormulario({});
    },
    onError: (error) => {
      console.error("Erro ao enviar respostas:", error);
      toast.error("Erro ao salvar respostas");
    },
  });

  // Enviar respostas do formulário
  const enviarRespostas = async (sugestaoIndex: number) => {
    const sugestao = sugestoes[sugestaoIndex];
    if (!sugestao) return;

    const respostas = sugestao.perguntasRecomendadas.map((pergunta, idx) => ({
      pergunta,
      resposta: respostasFormulario[`${sugestaoIndex}-${idx}`] || "",
    }));

    await salvarRespostasMutation.mutateAsync({
      empresaId,
      tituloFormulario: sugestao.titulo,
      respostas,
      impactoEstimado: sugestao.impactoEstimado,
    });
  };

  const handleAtualizarResposta = (sugestaoIndex: number, perguntaIndex: number, valor: string) => {
    setRespostasFormulario({
      ...respostasFormulario,
      [`${sugestaoIndex}-${perguntaIndex}`]: valor,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Formulário Inteligente</h1>
          <p className="text-gray-600 mt-2">
            A IA analisa seus dados e sugere formulários para coletar informações faltantes
          </p>
        </div>
        <Button
          onClick={gerarSugestoes}
          disabled={gerarSugestoesMutation.isPending}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {gerarSugestoesMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Gerar Sugestões
            </>
          )}
        </Button>
      </div>

      {/* Sugestões da IA */}
      <div className="grid gap-4">
        {sugestoes.length === 0 ? (
          <Card className="p-8 text-center border-2 border-dashed border-purple-200">
            <Lightbulb className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhuma sugestão gerada</h2>
            <p className="text-gray-600 mb-4">
              Clique em "Gerar Sugestões" para que a IA analise seus dados e recomende formulários
            </p>
            <Button
              onClick={gerarSugestoes}
              disabled={gerarSugestoesMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {gerarSugestoesMutation.isPending ? "Gerando..." : "Gerar Sugestões"}
            </Button>
          </Card>
        ) : (
          sugestoes.map((sugestao, idx) => (
            <Card key={idx} className="p-6 border-l-4 border-l-purple-600">
              {/* Cabeçalho da Sugestão */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-bold text-gray-900">{sugestao.titulo}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        sugestao.prioridade === "alta"
                          ? "bg-red-100 text-red-700"
                          : sugestao.prioridade === "media"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Prioridade {sugestao.prioridade}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{sugestao.descricao}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Impacto Estimado: </span>
                      <span className="font-semibold text-purple-600">{sugestao.impactoEstimado}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Perguntas: </span>
                      <span className="font-semibold">{sugestao.perguntasRecomendadas.length}</span>
                    </div>
                  </div>
                </div>

                {formularioAtivo !== idx && (
                  <Button
                    onClick={() => setFormularioAtivo(idx)}
                    className="bg-purple-600 hover:bg-purple-700 ml-4"
                  >
                    Responder
                  </Button>
                )}
              </div>

              {/* Formulário */}
              {formularioAtivo === idx && (
                <div className="mt-6 pt-6 border-t space-y-4">
                  <h4 className="font-semibold text-gray-900">Responda as perguntas abaixo:</h4>

                  {sugestao.perguntasRecomendadas.map((pergunta, perguntaIdx) => (
                    <div key={perguntaIdx} className="space-y-2">
                      <Label className="block font-medium text-gray-700">
                        {perguntaIdx + 1}. {pergunta}
                      </Label>
                      <Input
                        value={respostasFormulario[`${idx}-${perguntaIdx}`] || ""}
                        onChange={(e) =>
                          handleAtualizarResposta(idx, perguntaIdx, e.target.value)
                        }
                        placeholder="Digite sua resposta"
                        className="w-full"
                      />
                    </div>
                  ))}

                  {/* Botões de Ação */}
                  <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => enviarRespostas(idx)}
                    disabled={salvarRespostasMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 flex-1"
                  >
                    {salvarRespostasMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Salvar Respostas
                      </>
                    )}
                  </Button>
                    <Button
                      onClick={() => {
                        setFormularioAtivo(null);
                        setRespostasFormulario({});
                      }}
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Info Box */}
      {sugestoes.length > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">Como funciona?</p>
              <p className="text-sm text-blue-800">
                A IA analisa seus dados de clientes, vendas e marketing para identificar quais informações
                estão faltando. Cada formulário foi projetado para coletar dados que ajudarão a melhorar suas
                ações de negócio e aumentar o ROI.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

