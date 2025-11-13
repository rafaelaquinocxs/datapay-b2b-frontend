import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Loader, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface LeadInfo {
  nome?: string;
  email?: string;
  empresa?: string;
  cargo?: string;
  telefone?: string;
  desafios?: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Olá! 👋 Bem-vindo ao DataPay! Sou seu assistente de vendas. Para entender melhor como podemos ajudar sua empresa, qual é o seu nome?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({});
  const [conversationStage, setConversationStage] = useState<
    "nome" | "email" | "empresa" | "cargo" | "desafios" | "agendamento" | "finalizado"
  >("nome");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      // Processar resposta baseada no estágio da conversa
      let assistantResponse = "";

      switch (conversationStage) {
        case "nome":
          setLeadInfo({ ...leadInfo, nome: userInput });
          assistantResponse = `Prazer, ${userInput}! 😊 Qual é o seu email corporativo?`;
          setConversationStage("email");
          break;

        case "email":
          setLeadInfo({ ...leadInfo, email: userInput });
          assistantResponse = `Ótimo, ${userInput}! Qual é o nome da sua empresa?`;
          setConversationStage("empresa");
          break;

        case "empresa":
          setLeadInfo({ ...leadInfo, empresa: userInput });
          assistantResponse = `${userInput} é uma ótima empresa! Qual é o seu cargo/posição?`;
          setConversationStage("cargo");
          break;

        case "cargo":
          setLeadInfo({ ...leadInfo, cargo: userInput });
          assistantResponse = `Perfeito! Como ${userInput}, você certamente enfrenta desafios com dados. Quais são os principais desafios que sua empresa enfrenta com dados e análises? (ex: dados dispersos, falta de insights, decisões lentas)`;
          setConversationStage("desafios");
          break;

        case "desafios":
          setLeadInfo({ ...leadInfo, desafios: userInput });
          assistantResponse = `Entendi perfeitamente! ${userInput} são desafios comuns que o DataPay resolve. Vou conectá-lo com nosso especialista para uma demonstração personalizada. Quando você gostaria de agendar uma reunião? (próximos 7 dias)`;
          setConversationStage("agendamento");
          break;

        case "agendamento":
          assistantResponse = `Ótimo! Vou agendar sua reunião. Por favor, clique no botão "Agendar Reunião" abaixo para escolher a data e hora que melhor se adequa.`;
          break;

        default:
          assistantResponse = "Como posso ajudá-lo mais?";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar mensagem");
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleReuniao = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Por favor, selecione data e hora");
      return;
    }

    try {
      // Enviar para WhatsApp com informações
      const mensagem = `Olá! Gostaria de agendar uma reunião com o DataPay.

*Informações do Lead:*
Nome: ${leadInfo.nome}
Email: ${leadInfo.email}
Empresa: ${leadInfo.empresa}
Cargo: ${leadInfo.cargo}
Desafios: ${leadInfo.desafios}

*Data e Hora Solicitada:*
${selectedDate} às ${selectedTime}

Obrigado!`;

      const whatsappUrl = `https://wa.me/5554992560212?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappUrl, "_blank");

      // Mensagem de confirmação no chat
      const confirmMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: `Perfeito! 🎉 Sua reunião foi agendada para ${selectedDate} às ${selectedTime}. Nosso especialista entrará em contato via WhatsApp para confirmar. Obrigado por escolher o DataPay!`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, confirmMessage]);
      setShowScheduleModal(false);
      setConversationStage("finalizado");
    } catch (error: any) {
      toast.error("Erro ao agendar reunião");
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-green-500 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Janela de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-green-500 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">Assistente DataPay</h3>
            <p className="text-sm opacity-90">Qualificação de Leads</p>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Digitando...</span>
                </div>
              </div>
            )}

            {conversationStage === "agendamento" && (
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Reunião
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {conversationStage !== "finalizado" && (
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua resposta..."
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Modal de Agendamento */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Reunião com Especialista</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Selecione uma hora</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Resumo:</strong>
                <br />
                Nome: {leadInfo.nome}
                <br />
                Email: {leadInfo.email}
                <br />
                Empresa: {leadInfo.empresa}
              </p>
            </div>

            <Button
              onClick={handleScheduleReuniao}
              className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              Confirmar Agendamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

