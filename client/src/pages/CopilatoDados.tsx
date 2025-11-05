import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Send,
  Loader,
  MessageCircle,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function CopilatoDados() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const empresaId = usuario?.id || 1;
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: profile } = trpc.companyProfile.get.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  const { data: history } = trpc.dataCopilot.getHistory.useQuery(
    { empresaId, limit: 20 },
    { enabled: !!empresaId }
  );

  const askQuestionMutation = trpc.dataCopilot.askQuestion.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: inputValue,
          timestamp: new Date(),
        },
        {
          role: "assistant",
          content: data.resposta,
          timestamp: new Date(),
        },
      ]);
      setInputValue("");
    },
    onError: () => {
      toast.error("Erro ao processar pergunta");
    },
  });

  useEffect(() => {
    if (history && messages.length === 0) {
      const formattedMessages = history.flatMap((item: any) => [
        {
          role: "user",
          content: item.pergunta,
          timestamp: item.criadoEm,
        },
        {
          role: "assistant",
          content: item.resposta,
          timestamp: item.criadoEm,
        },
      ]);
      setMessages(formattedMessages);
    }
  }, [history]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      await askQuestionMutation.mutateAsync({
        empresaId,
        pergunta: inputValue,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Qual é minha qualidade de dados atual?",
    "Como posso melhorar minha conformidade LGPD?",
    "Quais são as prioridades para meu perfil?",
    "Como me comparo com empresas do meu setor?",
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              Copiloto de Dados
            </h1>
            <p className="text-purple-100 mt-1">
              Faça perguntas sobre seu perfil e receba insights com IA
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  Comece uma conversa fazendo uma pergunta
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.role === "user"
                          ? "text-purple-100"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder="Faça uma pergunta sobre seus dados..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Perguntas Sugeridas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputValue(question);
                }}
                className="p-3 text-left text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="text-gray-900 font-medium">{question}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Capabilities */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">
          O que posso fazer?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
          <div className="flex gap-2">
            <span>✓</span>
            <span>Analisar qualidade de dados</span>
          </div>
          <div className="flex gap-2">
            <span>✓</span>
            <span>Comparar com benchmarks</span>
          </div>
          <div className="flex gap-2">
            <span>✓</span>
            <span>Gerar recomendações</span>
          </div>
          <div className="flex gap-2">
            <span>✓</span>
            <span>Responder sobre conformidade</span>
          </div>
          <div className="flex gap-2">
            <span>✓</span>
            <span>Sugerir próximos passos</span>
          </div>
          <div className="flex gap-2">
            <span>✓</span>
            <span>Explicar métricas</span>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-3">Dicas</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>
            • Seja específico em suas perguntas para obter respostas mais
            precisas
          </li>
          <li>
            • O copiloto analisa seu perfil completo para fornecer insights
          </li>
          <li>
            • Você pode fazer perguntas de acompanhamento para aprofundar
          </li>
          <li>
            • Todas as conversas são salvas no histórico para referência futura
          </li>
        </ul>
      </Card>
    </div>
  );
}

