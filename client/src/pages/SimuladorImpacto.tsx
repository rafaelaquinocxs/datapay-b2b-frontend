import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  RotateCcw,
} from "lucide-react";

export default function SimuladorImpacto() {
  const [adesao, setAdesao] = useState(65);
  const [conversao, setConversao] = useState(14.2);
  const [ticketMedio, setTicketMedio] = useState(45.5);

  const clientesSegmento = 2810;
  const clientesAlcancados = Math.round((clientesSegmento * adesao) / 100);
  const conversoes = Math.round((clientesAlcancados * conversao) / 100);
  const receitaEstimada = conversoes * ticketMedio;

  const handleReset = () => {
    setAdesao(65);
    setConversao(14.2);
    setTicketMedio(45.5);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Simulador de Impacto</h1>
        <p className="text-gray-600 mt-1">Ajuste os parâmetros e veja o impacto estimado em tempo real</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Controles */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Parâmetros</h3>

            {/* Adesão */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-900">Taxa de Adesão</label>
                <span className="text-lg font-bold text-purple-600">{adesao}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={adesao}
                onChange={(e) => setAdesao(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-2">
                Percentual de clientes que receberão a ação
              </p>
            </div>

            {/* Conversão */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-900">Taxa de Conversão</label>
                <span className="text-lg font-bold text-blue-600">{conversao.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="0.1"
                value={conversao}
                onChange={(e) => setConversao(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-2">
                Percentual de clientes que converterão
              </p>
            </div>

            {/* Ticket Médio */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-900">Ticket Médio</label>
                <span className="text-lg font-bold text-green-600">R$ {ticketMedio.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="0.5"
                value={ticketMedio}
                onChange={(e) => setTicketMedio(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-2">
                Valor médio de cada transação
              </p>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar Valores
            </Button>
          </Card>
        </div>

        {/* Resultados */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Estimativas</h3>

            <div className="space-y-4">
              {/* Clientes Alcançados */}
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Clientes Alcançados</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-900">
                    {((adesao / 100) * 100).toFixed(0)}%
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {clientesAlcancados.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  de {clientesSegmento.toLocaleString()} clientes no segmento
                </p>
              </div>

              {/* Conversões Esperadas */}
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Conversões Esperadas</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-900">
                    {conversao.toFixed(1)}%
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {conversoes.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  clientes que converterão
                </p>
              </div>

              {/* Receita Estimada */}
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Receita Estimada</span>
                  </div>
                  <Badge className="bg-green-100 text-green-900">
                    R$ {ticketMedio.toFixed(2)}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  R$ {receitaEstimada.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  receita total estimada
                </p>
              </div>

              {/* Impacto */}
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-gray-600">Impacto vs Baseline</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-900">
                    +67%
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-orange-600">
                  +R$ {(receitaEstimada * 0.67).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  acréscimo em relação ao cenário atual
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Dica</h4>
            <p className="text-sm text-blue-800">
              Ajuste os sliders para explorar diferentes cenários. Quanto maior a adesão e conversão, maior o impacto potencial.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
