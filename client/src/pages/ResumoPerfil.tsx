import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Download,
  Share2,
  Edit,
  Loader,
  FileText,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function ResumoPerfil() {
  const empresaId = 1;
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  const { data: profile } = trpc.companyProfile.get.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  const { data: executiveSummary } = trpc.profileGovernance.getExecutiveSummary.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  const saveSummaryMutation = trpc.profileGovernance.saveExecutiveSummary.useMutation({
    onSuccess: () => {
      toast.success("Resumo gerado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao gerar resumo");
    },
  });

  useEffect(() => {
    if (executiveSummary) {
      setSummary(executiveSummary);
    }
  }, [executiveSummary]);

  const generateSummary = async () => {
    if (!profile) {
      toast.error("Perfil não encontrado");
      return;
    }

    setIsGenerating(true);
    try {
      const conteudo = `## Resumo Executivo - ${profile.setor || "Empresa"}

### 1. Identidade & Posicionamento
Missão: ${profile.missao || "Não definida"}
Visão: ${profile.visao || "Não definida"}
Valores: ${profile.valores || "Não definidos"}

### 2. Público-Alvo & Mercado
Público-Alvo: ${profile.publicoAlvo || "Não definido"}

### 3. Operação & Dados
ERPs Utilizados: ${Array.isArray(profile.erpsUtilizados) ? profile.erpsUtilizados.join(", ") : "Nenhum"}
Frequência de Atualização: ${profile.frequenciaAtualizacao || "Não definida"}
Qualidade de Dados: ${profile.qualidadeDados || 0}%

### 4. Objetivos & Restrições
Restrições: ${profile.restricoes || "Sem restrições definidas"}
Budget Mensal: R$ ${profile.budget?.toLocaleString("pt-BR") || "0"}

### 5. Conformidade & Política
LGPD Compliance: ${profile.lgpdCompliance ? "Sim" : "Não"}
Sensibilidade de Dados: ${profile.sensibilidadeDados || "Não definida"}`;

      const prioridades = [
        { titulo: "Completar Perfil", impacto: "Alto", prazo: "1 semana" },
        { titulo: "Implementar LGPD", impacto: "Crítico", prazo: "2 semanas" },
        { titulo: "Otimizar Qualidade de Dados", impacto: "Alto", prazo: "1 mês" },
      ];

      await saveSummaryMutation.mutateAsync({
        empresaId,
        versao: (summary?.versao || 0) + 1,
        titulo: `Resumo Executivo - ${new Date().toLocaleDateString("pt-BR")}`,
        conteudo,
        prioridades,
      });

      setSummary({
        titulo: `Resumo Executivo - ${new Date().toLocaleDateString("pt-BR")}`,
        conteudo,
        prioridades,
        versao: (summary?.versao || 0) + 1,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resumo Executivo</h1>
            <p className="text-blue-100 mt-1">
              Visão consolidada do perfil da sua empresa
            </p>
          </div>
          <FileText className="w-16 h-16 opacity-20" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={generateSummary}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Gerar Resumo
            </>
          )}
        </Button>

        <Button variant="outline" disabled={!summary}>
          <Download className="w-4 h-4 mr-2" />
          Baixar PDF
        </Button>

        <Button variant="outline" disabled={!summary}>
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar
        </Button>

        <Button
          variant="outline"
          onClick={() => (window.location.href = "/base-conhecimento")}
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar Perfil
        </Button>
      </div>

      {summary ? (
        <>
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {summary.titulo}
                </h2>
                <p className="text-sm text-gray-500">
                  Versão {summary.versao} • Gerado em{" "}
                  {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="text-gray-700 whitespace-pre-wrap">
                {summary.conteudo}
              </div>
            </div>
          </Card>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recomendações Prioritárias
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summary.prioridades?.map((item: any, idx: number) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.impacto === "Crítico"
                          ? "bg-red-100"
                          : item.impacto === "Alto"
                            ? "bg-orange-100"
                            : "bg-yellow-100"
                      }`}
                    >
                      <AlertCircle
                        className={`w-5 h-5 ${
                          item.impacto === "Crítico"
                            ? "text-red-600"
                            : item.impacto === "Alto"
                              ? "text-orange-600"
                              : "text-yellow-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {item.titulo}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Prazo: {item.prazo}
                      </p>
                      <Badge
                        className="mt-2"
                        variant={
                          item.impacto === "Crítico"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {item.impacto}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Métricas do Perfil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completude</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {profile?.dataQualityScore || 0}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {profile?.status === "publicado"
                        ? "Publicado"
                        : "Rascunho"}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Versão</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {profile?.versao || 1}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">LGPD</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {profile?.lgpdCompliance ? "✓" : "✗"}
                    </p>
                  </div>
                  <CheckCircle2
                    className={`w-8 h-8 ${
                      profile?.lgpdCompliance
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                </div>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum resumo gerado
          </h3>
          <p className="text-gray-600 mb-6">
            Clique no botão acima para gerar o resumo executivo do seu perfil
          </p>
          <Button
            onClick={generateSummary}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Gerar Primeiro Resumo
          </Button>
        </Card>
      )}
    </div>
  );
}
