import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";
import Diagnostico from "./Diagnostico";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [mostrarDiagnostico, setMostrarDiagnostico] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DataPay</h1>
              <p className="text-xs text-gray-500">Enterprise</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setLocation("/login")}
            >
              Entrar
            </Button>
            <Button
              onClick={() => setLocation("/registro")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Plataforma de Ações Inteligentes
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforme seus dados em{" "}
            <span className="text-purple-600">ações que geram lucro</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A IA analisa seus dados, identifica oportunidades e sugere campanhas criativas
            que aumentam suas vendas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setMostrarDiagnostico(true)}
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
            >
              <Target className="w-5 h-5 mr-2" />
              Diagnóstico Gratuito
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/registro")}
              className="text-lg px-8 py-6"
            >
              Ver Demonstração
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Sem cartão de crédito • Diagnóstico em 5 minutos
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 border-2 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Análise Inteligente</h3>
            <p className="text-gray-600">
              IA identifica padrões e oportunidades escondidas nos seus dados
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ações Criativas</h3>
            <p className="text-gray-600">
              Sugestões de campanhas e parcerias baseadas em dados reais
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pesquisas Gamificadas</h3>
            <p className="text-gray-600">
              Colete dados faltantes com engajamento e recompensas
            </p>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-16 bg-purple-50 rounded-3xl my-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-purple-600 font-semibold mb-4">
            CONFIADO POR GRANDES EMPRESAS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <span className="text-2xl font-bold">Magazine Luiza</span>
            <span className="text-2xl font-bold">Ambev</span>
            <span className="text-2xl font-bold">Nike</span>
            <span className="text-2xl font-bold">Renner</span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher o DataPay?
          </h2>
          <div className="space-y-6">
            {[
              "Reduza até 30% o custo de aquisição de clientes",
              "Aumente em 20% a taxa de conversão com segmentação inteligente",
              "Identifique oportunidades de upsell e cross-sell automaticamente",
              "Previna churn com análise preditiva de comportamento",
              "Crie campanhas personalizadas em escala",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Pronto para transformar seus dados?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Faça um diagnóstico gratuito e descubra o potencial dos seus dados
            </p>
            <Button
              size="lg"
              onClick={() => setMostrarDiagnostico(true)}
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Começar Diagnóstico Gratuito
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 DataPay Enterprise. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Modal de Diagnóstico */}
      <Dialog open={mostrarDiagnostico} onOpenChange={setMostrarDiagnostico}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Diagnóstico de Maturidade em Dados</DialogTitle>
            <DialogDescription>
              Responda 20 perguntas e descubra o potencial dos seus dados
            </DialogDescription>
          </DialogHeader>
          <Diagnostico />
        </DialogContent>
      </Dialog>
    </div>
  );
}

