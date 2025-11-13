import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Database,
  Brain,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Upload,
  Zap,
} from "lucide-react";

export default function Inicio() {
  // Simular estado: empresa sem dados ainda
  const temDados = false;

  if (!temDados) {
    // Onboarding: Empresa ainda não conectou dados
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Bem-vindo ao DataPay Enterprise
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforme seus dados em ações inteligentes que geram lucro.
              Nossa IA analisa, identifica oportunidades e sugere campanhas criativas.
            </p>
          </div>

          {/* Como Funciona */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Como o DataPay funciona?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Passo 1 */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-sm font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900">Conecte seus dados</h3>
                <p className="text-sm text-gray-600">
                  Upload de planilhas ou integração com ERPs, CRMs e e-commerce
                </p>
              </div>

              {/* Passo 2 */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto text-sm font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900">IA analisa tudo</h3>
                <p className="text-sm text-gray-600">
                  Identifica padrões, gaps de informação e oportunidades escondidas
                </p>
              </div>

              {/* Passo 3 */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto text-sm font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900">Pesquisas gamificadas</h3>
                <p className="text-sm text-gray-600">
                  Preenche lacunas com perguntas inteligentes no app white-label
                </p>
              </div>

              {/* Passo 4 */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center mx-auto text-sm font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900">Ações inteligentes</h3>
                <p className="text-sm text-gray-600">
                  Sugestões criativas de campanhas, parcerias e ofertas personalizadas
                </p>
              </div>
            </div>
          </Card>

          {/* Exemplo Real */}
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Exemplo: Sport Club Internacional</h3>
                <p className="text-purple-100 leading-relaxed">
                  <strong className="text-white">Dados existentes:</strong> Horários de entrada no estádio,
                  compras no intervalo, frequência de jogos, vendas de camisetas pós-jogo.
                </p>
                <p className="text-purple-100 leading-relaxed">
                  <strong className="text-white">IA identifica:</strong> 30% mais compras de refrigerante
                  no intervalo. Falta saber: qual sabor preferido?
                </p>
                <p className="text-purple-100 leading-relaxed">
                  <strong className="text-white">Ação sugerida:</strong> Parceria Inter + Coca-Cola com
                  pesquisa gamificada no app. Resultado: oferta personalizada de combo no intervalo.
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Conectar Meus Dados Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500">
              Sem compromisso • Análise gratuita dos primeiros insights
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard: Empresa já tem dados conectados
  return (
    <div className="p-8 space-y-8">
      {/* Header com Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel de Controle</h1>
          <p className="text-gray-500 mt-1">
            Última atualização há 5 minutos
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 px-4 py-2">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Tudo funcionando
        </Badge>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fontes Conectadas</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Insights da IA</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pesquisas Ativas</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ações Sugeridas</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Próximas Ações Recomendadas */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Próximas Ações Recomendadas pela IA
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">
                  Revisar 12 novos insights da IA
                </p>
                <p className="text-sm text-gray-500">
                  Oportunidades de lucro identificadas
                </p>
              </div>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Ver Agora
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

