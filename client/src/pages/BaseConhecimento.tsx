import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  ChevronRight,
  ChevronLeft,
  Save,
  FileText,
  Target,
  Lock,
  Loader,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const BLOCOS = [
  {
    id: 1,
    titulo: "Identidade & Mercado",
    descricao: "Missão, visão, valores e público-alvo",
    icon: FileText,
  },
  {
    id: 2,
    titulo: "Operação & Dados",
    descricao: "ERPs, fontes de dados e qualidade",
    icon: Target,
  },
  {
    id: 3,
    titulo: "Objetivos & KPIs",
    descricao: "Metas, restrições e budget",
    icon: Target,
  },
  {
    id: 4,
    titulo: "Regras & Política",
    descricao: "LGPD, comunicação e sensibilidade",
    icon: Lock,
  },
];

export default function BaseConhecimento() {
  const empresaId = 1;
  const [blocoAtual, setBlocoAtual] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [dataQualityScore, setDataQualityScore] = useState(0);

  const [formData, setFormData] = useState({
    missao: "",
    visao: "",
    valores: "",
    publicoAlvo: "",
    personas: [] as string[],
    segmentos: [] as string[],
    concorrentes: [] as string[],
    erpsUtilizados: [] as string[],
    fontesConectadas: [] as string[],
    qualidadeDados: 0,
    frequenciaAtualizacao: "diária",
    metasTrimestrais: [] as string[],
    restricoes: "",
    budget: 0,
    lgpdCompliance: 0,
    janelaComunicacao: "",
    sensibilidadeDados: "media",
  });

  const { data: profile, isLoading } = trpc.companyProfile.get.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  useEffect(() => {
    if (profile) {
      setFormData({
        missao: profile.missao || "",
        visao: profile.visao || "",
        valores: profile.valores || "",
        publicoAlvo: profile.publicoAlvo || "",
        personas: (profile.personas as string[]) || [],
        segmentos: (profile.segmentos as string[]) || [],
        concorrentes: (profile.concorrentes as string[]) || [],
        erpsUtilizados: (profile.erpsUtilizados as string[]) || [],
        fontesConectadas: (profile.fontesConectadas as string[]) || [],
        qualidadeDados: profile.qualidadeDados || 0,
        frequenciaAtualizacao: profile.frequenciaAtualizacao || "diária",
        metasTrimestrais: (profile.metasTrimestrais as string[]) || [],
        restricoes: profile.restricoes || "",
        budget: profile.budget || 0,
        lgpdCompliance: profile.lgpdCompliance || 0,
        janelaComunicacao: profile.janelaComunicacao || "",
        sensibilidadeDados: profile.sensibilidadeDados || "media",
      });
    }
  }, [profile]);

  const { data: qualityData } = trpc.companyProfile.calculateDataQuality.useQuery(
    { empresaId },
    { enabled: !!empresaId }
  );

  useEffect(() => {
    if (qualityData) {
      setDataQualityScore(qualityData.score);
    }
  }, [qualityData]);


  const saveMutation = trpc.companyProfile.upsert.useMutation({
    onSuccess: () => {
      toast.success("Perfil salvo com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao salvar perfil");
      console.error(error);
    },
  });

  const publishMutation = trpc.companyProfile.publish.useMutation({
    onSuccess: () => {
      toast.success("Perfil publicado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao publicar perfil");
      console.error(error);
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveMutation.mutateAsync({
        empresaId,
        ...formData,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (dataQualityScore < 50) {
      toast.error("Complete pelo menos 50% dos campos antes de publicar");
      return;
    }
    await publishMutation.mutateAsync({ empresaId });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddItem = (field: string, item: string) => {
    if (item.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof formData] as string[]), item],
      }));
    }
  };

  const handleRemoveItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof formData] as string[]).filter(
        (_, i) => i !== index
      ),
    }));
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Base de Conhecimento</h1>
            <p className="text-purple-100 mt-1">
              Construa o perfil completo da sua empresa
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{dataQualityScore}%</div>
            <p className="text-purple-100 text-sm">Qualidade de Dados</p>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-2 mt-6">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(blocoAtual / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Blocos de Navegação */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {BLOCOS.map((bloco) => (
          <button
            key={bloco.id}
            onClick={() => setBlocoAtual(bloco.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              blocoAtual === bloco.id
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200 bg-white hover:border-purple-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  blocoAtual === bloco.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {bloco.id}
              </div>
              <h3 className="font-semibold text-gray-900">{bloco.titulo}</h3>
            </div>
            <p className="text-xs text-gray-500">{bloco.descricao}</p>
          </button>
        ))}
      </div>

      {/* Conteúdo do Bloco */}
      <Card className="p-8">
        {blocoAtual === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Identidade & Mercado
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Missão
              </label>
              <textarea
                value={formData.missao}
                onChange={(e) => handleInputChange("missao", e.target.value)}
                placeholder="O que sua empresa faz?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Visão
              </label>
              <textarea
                value={formData.visao}
                onChange={(e) => handleInputChange("visao", e.target.value)}
                placeholder="Aonde sua empresa quer chegar?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Valores
              </label>
              <textarea
                value={formData.valores}
                onChange={(e) => handleInputChange("valores", e.target.value)}
                placeholder="Quais são os valores da sua empresa?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Público-Alvo
              </label>
              <textarea
                value={formData.publicoAlvo}
                onChange={(e) =>
                  handleInputChange("publicoAlvo", e.target.value)
                }
                placeholder="Quem são seus clientes ideais?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
        )}

        {blocoAtual === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Operação & Dados
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                ERPs Utilizados
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Ex: SAP, TOTVS, Salesforce"
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem(
                        "erpsUtilizados",
                        (e.target as HTMLInputElement).value
                      );
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.erpsUtilizados.map((erp, idx) => (
                  <Badge key={idx} variant="secondary">
                    {erp}
                    <button
                      onClick={() => handleRemoveItem("erpsUtilizados", idx)}
                      className="ml-2 text-xs"
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Frequência de Atualização de Dados
              </label>
              <select
                value={formData.frequenciaAtualizacao}
                onChange={(e) =>
                  handleInputChange("frequenciaAtualizacao", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="diária">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
                <option value="trimestral">Trimestral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Qualidade de Dados Esperada (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.qualidadeDados}
                onChange={(e) =>
                  handleInputChange("qualidadeDados", parseInt(e.target.value))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {blocoAtual === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Objetivos & KPIs
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Restrições Operacionais
              </label>
              <textarea
                value={formData.restricoes}
                onChange={(e) => handleInputChange("restricoes", e.target.value)}
                placeholder="Quais são as limitações ou restrições?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Budget Mensal (R$)
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  handleInputChange("budget", parseInt(e.target.value))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {blocoAtual === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Regras & Política
            </h2>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.lgpdCompliance === 1}
                  onChange={(e) =>
                    handleInputChange("lgpdCompliance", e.target.checked ? 1 : 0)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold text-gray-900">
                  Empresa está em conformidade com LGPD
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Janela de Comunicação (ex: seg-sex 9-18)
              </label>
              <input
                type="text"
                value={formData.janelaComunicacao}
                onChange={(e) =>
                  handleInputChange("janelaComunicacao", e.target.value)
                }
                placeholder="seg-sex 9-18"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Sensibilidade de Dados
              </label>
              <select
                value={formData.sensibilidadeDados}
                onChange={(e) =>
                  handleInputChange("sensibilidadeDados", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Botões de Ação */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            onClick={() => setBlocoAtual(Math.max(1, blocoAtual - 1))}
            disabled={blocoAtual === 1}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={() => setBlocoAtual(Math.min(4, blocoAtual + 1))}
            disabled={blocoAtual === 4}
            variant="outline"
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={isSaving || saveMutation.isPending}
            variant="outline"
          >
            {isSaving || saveMutation.isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Rascunho
              </>
            )}
          </Button>

          <Button
            onClick={handlePublish}
            disabled={dataQualityScore < 50 || publishMutation.isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {publishMutation.isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Publicando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Publicar Perfil
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Alertas */}
      {dataQualityScore < 50 && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                Complete seu perfil
              </h3>
              <p className="text-sm text-yellow-800 mt-1">
                Você precisa completar pelo menos 50% dos campos para publicar
                seu perfil. Qualidade atual: {dataQualityScore}%
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

