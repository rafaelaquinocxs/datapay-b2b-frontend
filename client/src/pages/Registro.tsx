import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Registro() {
  const handleGoogleSignup = () => {
    // Usar a mesma função de login do Google
    // O OAuth do Manus cria a conta automaticamente se não existir
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">DataPay</h1>
                <p className="text-sm text-gray-500">Enterprise</p>
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Crie sua conta
            </h2>
            <p className="mt-2 text-gray-600">
              Comece a transformar seus dados em lucro
            </p>
          </div>

          {/* Card de Registro */}
          <Card className="p-8">
            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignup}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 flex items-center justify-center gap-3 h-12"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Criar conta com Google
              </Button>

              <div className="text-center text-sm text-gray-500">
                Acesso rápido e seguro com sua conta Google
              </div>

              <div className="text-center text-xs text-gray-500 pt-2">
                Ao criar uma conta, você concorda com nossos{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </Card>

          {/* Link para login */}
          <div className="text-center">
            <span className="text-sm text-gray-500">Já tem uma conta? </span>
            <Link href="/login" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Faça login
            </Link>
          </div>

          {/* Link para landing page */}
          <div className="text-center">
            <Link href="/landing" className="text-sm text-gray-500 hover:text-gray-700">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>

      {/* Lado direito - Imagem/Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-12 items-center justify-center relative overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-md text-white space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Plataforma de Ações Inteligentes</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Junte-se às empresas que transformam dados em lucro
          </h2>

          <p className="text-lg text-purple-100">
            Nossa IA analisa seus dados, identifica oportunidades e sugere ações criativas
            que aumentam suas vendas de forma mensurável.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Configuração em 5 minutos</h3>
                <p className="text-sm text-purple-100">
                  Conecte suas fontes de dados e comece a receber insights imediatamente
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">ROI Comprovado</h3>
                <p className="text-sm text-purple-100">
                  Empresas aumentam em média 23% suas vendas no primeiro trimestre
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Suporte Dedicado</h3>
                <p className="text-sm text-purple-100">
                  Time de especialistas para ajudar você a extrair o máximo valor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

