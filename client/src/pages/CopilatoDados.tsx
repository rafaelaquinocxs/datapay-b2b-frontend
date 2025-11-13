import { PageTransition } from "@/components/PageTransition";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Send,
  Loader2,
  MessageCircle,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Brain,
  MessageSquare,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export default function CopilatoDados() {
  const empresaId = 240003;
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
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Premium */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Copiloto de Dados</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Faça perguntas sobre seu perfil e receba insights com IA</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Conversas Totais</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{messages.filter(m => m.role === "user").length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Insights Gerados</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{Math.floor(messages.filter(m => m.role === "assistant").length)}</p>
                </div>
                <Lightbulb className="w-8 h-8 text-yellow-500 opacity-20" />
              </div>
            </Card>
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Utilização</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">92%</p>
                </div>
                <Zap className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Chat Container */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 h-96 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
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
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-2 ${
                            msg.role === "user"
                              ? "text-purple-100"
                              : "text-gray-500 dark:text-gray-400"
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
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
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
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Perguntas Sugeridas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(question);
                    }}
                    className="p-4 text-left border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <p className="text-gray-900 dark:text-white font-medium text-sm">{question}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Capabilities */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 p-6">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">O que posso fazer?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Analisar qualidade de dados",
                "Comparar com benchmarks",
                "Gerar recomendações",
                "Responder sobre conformidade",
                "Sugerir próximos passos",
                "Explicar métricas",
              ].map((capability, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">💡 Dicas para Melhores Resultados</h3>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold flex-shrink-0">•</span>
                <span>Seja específico em suas perguntas para obter respostas mais precisas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold flex-shrink-0">•</span>
                <span>O copiloto analisa seu perfil completo para fornecer insights contextualizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold flex-shrink-0">•</span>
                <span>Você pode fazer perguntas de acompanhamento para aprofundar em tópicos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold flex-shrink-0">•</span>
                <span>Todas as conversas são salvas no histórico para referência futura</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}

