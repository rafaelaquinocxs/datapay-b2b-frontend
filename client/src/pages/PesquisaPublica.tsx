import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { 
  CheckCircle2, 
  Gift, 
  Star, 
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";

interface Pergunta {
  id: string;
  tipo: "multipla_escolha" | "escala_nps" | "texto_curto" | "texto_longo";
  texto: string;
  opcoes?: string[];
  obrigatoria: boolean;
}

export default function PesquisaPublica() {
  const [, params] = useRoute("/p/:linkPublico");
  const linkPublico = params?.linkPublico || "";

  const [pesquisa, setPesquisa] = useState<any>(null);
  const [etapaAtual, setEtapaAtual] = useState(0); // 0 = intro, 1+ = perguntas, final = sucesso
  const [respostas, setRespostas] = useState<Record<string, any>>({});
  const [dadosContato, setDadosContato] = useState({
    nome: "",
    email: "",
    telefone: "",
  });
  const [enviando, setEnviando] = useState(false);

  // Buscar pesquisa pelo link público
  const { data: pesquisaData, isLoading } = trpc.pesquisas.buscarPorLink.useQuery(
    { linkPublico },
    { enabled: !!linkPublico }
  );

  useEffect(() => {
    if (pesquisaData) {
      setPesquisa(pesquisaData);
    }
  }, [pesquisaData]);

  const enviarRespostaMutation = trpc.pesquisas.enviarResposta.useMutation({
    onSuccess: () => {
      toast.success("Resposta enviada com sucesso!");
      setEtapaAtual(-1); // Ir para tela de sucesso
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao enviar resposta");
      setEnviando(false);
    },
  });

  const handleProximaPergunta = () => {
    const perguntas = pesquisa?.perguntas || [];
    const perguntaAtual = perguntas[etapaAtual - 1];

    // Validar resposta obrigatória
    if (perguntaAtual?.obrigatoria && !respostas[perguntaAtual.id]) {
      toast.error("Por favor, responda esta pergunta antes de continuar");
      return;
    }

    if (etapaAtual < perguntas.length) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      // Última pergunta, ir para dados de contato
      setEtapaAtual(perguntas.length + 1);
    }
  };

  const handleVoltarPergunta = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleEnviarResposta = () => {
    setEnviando(true);
    enviarRespostaMutation.mutate({
      pesquisaId: pesquisa.id,
      respostas: Object.entries(respostas).map(([perguntaId, resposta]) => ({
        perguntaId,
        resposta,
      })),
      nomeRespondente: dadosContato.nome,
      emailRespondente: dadosContato.email,
      telefoneRespondente: dadosContato.telefone,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando pesquisa...</p>
        </div>
      </div>
    );
  }

  if (!pesquisa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pesquisa não encontrada
          </h2>
          <p className="text-gray-600">
            O link que você acessou não é válido ou a pesquisa foi encerrada.
          </p>
        </Card>
      </div>
    );
  }

  const perguntas: Pergunta[] = pesquisa.perguntas || [];
  const progresso = etapaAtual > 0 ? ((etapaAtual / (perguntas.length + 1)) * 100) : 0;

  // Tela de introdução
  if (etapaAtual === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {pesquisa.titulo}
            </h1>
            {pesquisa.descricao && (
              <p className="text-gray-600">{pesquisa.descricao}</p>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">
                  {perguntas.length} perguntas
                </p>
                <p className="text-sm text-gray-600">Leva apenas 2-3 minutos</p>
              </div>
            </div>

            {pesquisa.recompensaTipo && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Gift className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Ganhe recompensa!</p>
                  <p className="text-sm text-gray-600">
                    {pesquisa.recompensaValor}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={() => setEtapaAtual(1)}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 h-12 text-lg"
          >
            Começar Pesquisa
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Suas respostas são anônimas e seguras
          </p>
        </Card>
      </div>
    );
  }

  // Tela de sucesso
  if (etapaAtual === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Obrigado por participar!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Sua resposta foi enviada com sucesso.
          </p>

          {pesquisa.recompensaTipo && (
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg mb-6">
              <Gift className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Sua recompensa:</h3>
              <p className="text-lg">{pesquisa.recompensaValor}</p>
              <p className="text-sm mt-2 opacity-90">
                Enviamos os detalhes para seu email
              </p>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Você pode fechar esta página
          </p>
        </Card>
      </div>
    );
  }

  // Perguntas
  if (etapaAtual <= perguntas.length) {
    const pergunta = perguntas[etapaAtual - 1];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-6 md:p-8">
          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {etapaAtual} de {perguntas.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(progresso)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-700 transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>

          {/* Pergunta */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {pergunta.texto}
              {pergunta.obrigatoria && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </h2>
          </div>

          {/* Resposta */}
          <div className="mb-8">
            {pergunta.tipo === "multipla_escolha" && (
              <RadioGroup
                value={respostas[pergunta.id]}
                onValueChange={(value) =>
                  setRespostas({ ...respostas, [pergunta.id]: value })
                }
              >
                <div className="space-y-3">
                  {pergunta.opcoes?.map((opcao, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-purple-600 cursor-pointer transition-colors"
                      onClick={() =>
                        setRespostas({ ...respostas, [pergunta.id]: opcao })
                      }
                    >
                      <RadioGroupItem value={opcao} id={`opcao-${index}`} />
                      <Label
                        htmlFor={`opcao-${index}`}
                        className="flex-1 cursor-pointer text-base"
                      >
                        {opcao}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {pergunta.tipo === "escala_nps" && (
              <div className="space-y-4">
                <div className="grid grid-cols-11 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setRespostas({ ...respostas, [pergunta.id]: num })
                      }
                      className={`h-12 rounded-lg font-bold transition-all ${
                        respostas[pergunta.id] === num
                          ? "bg-purple-600 text-white scale-110"
                          : "bg-white border-2 border-gray-300 hover:border-purple-600"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Muito improvável</span>
                  <span>Muito provável</span>
                </div>
              </div>
            )}

            {pergunta.tipo === "texto_curto" && (
              <Input
                value={respostas[pergunta.id] || ""}
                onChange={(e) =>
                  setRespostas({ ...respostas, [pergunta.id]: e.target.value })
                }
                placeholder="Digite sua resposta..."
                className="text-base h-12"
              />
            )}

            {pergunta.tipo === "texto_longo" && (
              <Textarea
                value={respostas[pergunta.id] || ""}
                onChange={(e) =>
                  setRespostas({ ...respostas, [pergunta.id]: e.target.value })
                }
                placeholder="Digite sua resposta..."
                rows={5}
                className="text-base"
              />
            )}
          </div>

          {/* Botões de navegação */}
          <div className="flex gap-3">
            {etapaAtual > 1 && (
              <Button
                onClick={handleVoltarPergunta}
                variant="outline"
                className="flex-1"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleProximaPergunta}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              {etapaAtual === perguntas.length ? "Finalizar" : "Próxima"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Dados de contato (última etapa)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quase lá! 🎉
          </h2>
          <p className="text-gray-600">
            Deixe seus dados para receber sua recompensa e ficar por dentro de novidades
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={dadosContato.nome}
              onChange={(e) =>
                setDadosContato({ ...dadosContato, nome: e.target.value })
              }
              placeholder="Seu nome completo"
              className="h-12"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={dadosContato.email}
              onChange={(e) =>
                setDadosContato({ ...dadosContato, email: e.target.value })
              }
              placeholder="seu@email.com"
              className="h-12"
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone (opcional)</Label>
            <Input
              id="telefone"
              type="tel"
              value={dadosContato.telefone}
              onChange={(e) =>
                setDadosContato({ ...dadosContato, telefone: e.target.value })
              }
              placeholder="(11) 99999-9999"
              className="h-12"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setEtapaAtual(perguntas.length)}
            variant="outline"
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleEnviarResposta}
            disabled={enviando || !dadosContato.nome || !dadosContato.email}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            {enviando ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Resposta
                <CheckCircle2 className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Seus dados são protegidos e não serão compartilhados
        </p>
      </Card>
    </div>
  );
}

