import { useState } from "react";
import { X, CheckCircle2, Circle } from "lucide-react";

interface ModalAtivarAcaoProps {
  isOpen: boolean;
  onClose: () => void;
  acao: {
    id: number;
    titulo: string;
    descricao: string;
    potencialLucro: string;
    roi: string;
    acoes: string[];
    status: string;
    prioridade: string;
  } | null;
  onSalvarProgresso: (acoesCompletas: boolean[], novoStatus: string) => void;
}

export function ModalAtivarAcao({
  isOpen,
  onClose,
  acao,
  onSalvarProgresso,
}: ModalAtivarAcaoProps) {
  const [passosConcluidos, setPassosConcluidos] = useState<boolean[]>([]);
  const [novoStatus, setNovoStatus] = useState("em_andamento");

  if (!isOpen || !acao) return null;

  const totalPassos = acao.acoes?.length || 0;
  const passosConcluídosCount = passosConcluidos.filter(Boolean).length;
  const percentualConcluido = totalPassos > 0 ? (passosConcluídosCount / totalPassos) * 100 : 0;

  const handleTogglePasso = (index: number) => {
    const novosPassos = [...passosConcluidos];
    novosPassos[index] = !novosPassos[index];
    setPassosConcluidos(novosPassos);
  };

  const handleSalvar = () => {
    onSalvarProgresso(passosConcluidos, novoStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">{acao.titulo}</h2>
            <p className="text-purple-100 text-sm mt-1">Ativar e acompanhar execução</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-600 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Resumo da Ação */}
          <div className="bg-purple-50 rounded-lg p-4 space-y-3">
            <p className="text-gray-700">{acao.descricao}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Potencial de Lucro</p>
                <p className="text-lg font-bold text-green-600">{acao.potencialLucro}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ROI Estimado</p>
                <p className="text-lg font-bold text-blue-600">{acao.roi}</p>
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">Progresso da Implementação</h3>
              <span className="text-sm font-bold text-purple-600">
                {passosConcluídosCount}/{totalPassos} concluídos
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all duration-300"
                style={{ width: `${percentualConcluido}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">{Math.round(percentualConcluido)}% concluído</p>
          </div>

          {/* Checklist de Passos */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Passos para Implementar</h3>
            <div className="space-y-2">
              {acao.acoes?.map((passo, index) => (
                <button
                  key={index}
                  onClick={() => handleTogglePasso(index)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left group"
                >
                  <div className="mt-1">
                    {passosConcluidos[index] ? (
                      <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle size={20} className="text-gray-300 flex-shrink-0 group-hover:text-purple-400" />
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      passosConcluidos[index]
                        ? "text-gray-500 line-through"
                        : "text-gray-700 group-hover:text-purple-600"
                    }`}
                  >
                    {passo}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Status da Ação */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Status da Ação</label>
            <select
              value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="recomendada">Recomendada</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
              <option value="descartada">Descartada</option>
            </select>
          </div>

          {/* Prioridade */}
          <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">Prioridade</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                acao.prioridade === "Alta"
                  ? "bg-red-100 text-red-700"
                  : acao.prioridade === "Média"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {acao.prioridade}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Salvar Progresso
          </button>
        </div>
      </div>
    </div>
  );
}

