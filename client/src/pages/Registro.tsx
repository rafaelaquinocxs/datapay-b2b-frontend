import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Eye, EyeOff, Mail, Lock, User, Phone, TrendingUp } from "lucide-react";

export default function Registro() {
  const [, setLocation] = useLocation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const registroMutation = trpc.auth.registro.useMutation({
    onSuccess: (data) => {
      toast.success("Conta criada com sucesso! Bem-vindo ao DataPay!");
      // Salvar token no localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("empresaId", data.empresa.id.toString());
      localStorage.setItem("empresaNome", data.empresa.nome || "");
      
      // Redirecionar para o diagnóstico
      setLocation("/diagnostico");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar conta");
      setCarregando(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    setCarregando(true);
    registroMutation.mutate({ nome, email, senha, telefone });
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
              Crie sua conta gratuita
            </h2>
            <p className="mt-2 text-gray-600">
              Comece seu trial de 14 dias agora
            </p>
          </div>

          {/* Formulário */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Sua Empresa Ltda"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Corporativo *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@suaempresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {mostrarSenha ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmarSenha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                disabled={carregando}
              >
                {carregando ? "Criando conta..." : "Criar conta gratuita"}
              </Button>

              <p className="text-xs text-center text-gray-500">
                Ao criar uma conta, você concorda com nossos{" "}
                <a href="/termos" className="text-purple-600 hover:underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="/privacidade" className="text-purple-600 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/login">
                  <a className="text-purple-600 hover:text-purple-700 font-semibold">
                    Fazer login
                  </a>
                </Link>
              </p>
            </div>
          </Card>

          {/* Link para landing page */}
          <div className="text-center">
            <Link href="/landing">
              <a className="text-sm text-gray-500 hover:text-gray-700">
                ← Voltar para a página inicial
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Lado direito - Benefícios */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-12 items-center justify-center relative overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-md text-white space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Trial Gratuito de 14 Dias</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Comece grátis e veja seus dados gerarem lucro
          </h2>

          <p className="text-lg text-purple-100">
            Sem cartão de crédito. Sem compromisso. Cancele quando quiser.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Diagnóstico Gratuito</h3>
                <p className="text-sm text-purple-100">
                  Descubra o nível de maturidade dos seus dados em 5 minutos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Insights Imediatos</h3>
                <p className="text-sm text-purple-100">
                  IA analisa seus dados e sugere ações que geram receita
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
                  Time de especialistas para ajudar você a ter sucesso
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-purple-100 mt-1">Empresas</p>
              </div>
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-purple-100 mt-1">Satisfação</p>
              </div>
              <div>
                <p className="text-3xl font-bold">+30%</p>
                <p className="text-sm text-purple-100 mt-1">ROI Médio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

