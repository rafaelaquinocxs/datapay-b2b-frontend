import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { BookOpen, Save, Loader2 } from "lucide-react";

export default function BaseConhecimento() {
  const { empresa } = useAuth();
  const [carregando, setCarregando] = useState(false);

  // Estados do formulário
  const [urlSite, setUrlSite] = useState("");
  const [missao, setMissao] = useState("");
  const [visao, setVisao] = useState("");
  const [valores, setValores] = useState("");
  const [produtosServicos, setProdutosServicos] = useState("");
  const [publicoAlvo, setPublicoAlvo] = useState("");
  const [diferenciais, setDiferenciais] = useState("");
  const [historicoSucesso, setHistoricoSucesso] = useState("");

  // Query para obter base existente
  const { data: baseExistente } = trpc.baseConhecimento.obter.useQuery(
    { empresaId: empresa?.id || 0 },
    { enabled: !!empresa?.id }
  );

  // Mutation para salvar
  const salvarBase = trpc.baseConhecimento.salvar.useMutation({
    onSuccess: () => {
      toast.success("Base de conhecimento salva com sucesso!");
      setCarregando(false);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao salvar");
      setCarregando(false);
    },
  });

  // Carregar dados existentes
  useEffect(() => {
    if (baseExistente) {
      setUrlSite(baseExistente.urlSite || "");
      setMissao(baseExistente.missao || "");
      setVisao(baseExistente.visao || "");
      setValores(baseExistente.valores || "");
      setProdutosServicos(baseExistente.produtosServicos || "");
      setPublicoAlvo(baseExistente.publicoAlvo || "");
      setDiferenciais(baseExistente.diferenciais || "");
      setHistoricoSucesso(baseExistente.historicoSucesso || "");
    }
  }, [baseExistente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    if (!empresa?.id) {
      toast.error("Empresa não identificada");
      setCarregando(false);
      return;
    }

    await salvarBase.mutateAsync({
      empresaId: empresa.id,
      urlSite,
      missao,
      visao,
      valores,
      produtosServicos,
      publicoAlvo,
      diferenciais,
      historicoSucesso,
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Base de Conhecimento
          </h1>
        </div>
        <p className="text-gray-600">
          Forneça informações sobre sua empresa para que a IA gere insights mais
          personalizados e relevantes
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Coluna 1 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informações Básicas
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>URL do Site</Label>
                  <Input
                    placeholder="https://www.suaempresa.com.br"
                    value={urlSite}
                    onChange={(e) => setUrlSite(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Missão</Label>
                  <Textarea
                    placeholder="Qual é a missão da sua empresa?"
                    rows={3}
                    value={missao}
                    onChange={(e) => setMissao(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Visão</Label>
                  <Textarea
                    placeholder="Qual é a visão de futuro da sua empresa?"
                    rows={3}
                    value={visao}
                    onChange={(e) => setVisao(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Valores</Label>
                  <Textarea
                    placeholder="Quais são os valores da sua empresa?"
                    rows={3}
                    value={valores}
                    onChange={(e) => setValores(e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detalhes do Negócio
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Produtos e Serviços</Label>
                  <Textarea
                    placeholder="Descreva os principais produtos e serviços que você oferece"
                    rows={3}
                    value={produtosServicos}
                    onChange={(e) => setProdutosServicos(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Público-Alvo</Label>
                  <Textarea
                    placeholder="Quem são seus clientes ideais? Idade, perfil, comportamento..."
                    rows={3}
                    value={publicoAlvo}
                    onChange={(e) => setPublicoAlvo(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Diferenciais Competitivos</Label>
                  <Textarea
                    placeholder="O que te diferencia da concorrência?"
                    rows={3}
                    value={diferenciais}
                    onChange={(e) => setDiferenciais(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Histórico de Sucesso
              </h3>
              <div>
                <Label>Campanhas e Ações que Funcionaram</Label>
                <Textarea
                  placeholder="Descreva campanhas, promoções ou ações de marketing que tiveram bons resultados no passado"
                  rows={5}
                  value={historicoSucesso}
                  onChange={(e) => setHistoricoSucesso(e.target.value)}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={carregando}
            className="bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {carregando ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Base de Conhecimento
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

