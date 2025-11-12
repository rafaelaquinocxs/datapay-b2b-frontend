import { PageTransition } from "@/components/PageTransition";
import {
  Building2,
  Users,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Globe,
  Calendar,
  DollarSign,
  Briefcase,
  Zap,
  CheckCircle2,
  Plus,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  FileText,
  Upload,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface EmpresaData {
  nomeEmpresa: string;
  cnpj: string;
  setor: string;
  localizacao: string;
  anoFundacao: string;
  website: string;
  email: string;
  telefone: string;
  descricao: string;
  funcionarios: string;
  receita: string;
  missao: string;
  visao: string;
  valores: string[];
  integracoes: string[];
}

const SETORES = [
  "Tecnologia & Dados",
  "Varejo",
  "Financeiro",
  "Saúde",
  "E-commerce",
  "Educação",
  "Manufatura",
  "Serviços",
];

const VALORES_PADRAO = [
  "Inovação",
  "Integridade",
  "Excelência",
  "Colaboração",
  "Sustentabilidade",
  "Transparência",
];

export default function SobreEmpresa() {
  const [modo, setModo] = useState<"visualizar" | "editar">("visualizar");
  const [empresaData, setEmpresaData] = useState<EmpresaData>({
    nomeEmpresa: "",
    cnpj: "",
    setor: "",
    localizacao: "",
    anoFundacao: "",
    website: "",
    email: "",
    telefone: "",
    descricao: "",
    funcionarios: "",
    receita: "",
    missao: "",
    visao: "",
    valores: [],
    integracoes: [],
  });

  const [novaIntegracao, setNovaIntegracao] = useState("");

  const isPreenchido = empresaData.nomeEmpresa && empresaData.cnpj && empresaData.setor;

  const handleChange = (field: keyof EmpresaData, value: string) => {
    setEmpresaData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleValor = (valor: string) => {
    setEmpresaData((prev) => ({
      ...prev,
      valores: prev.valores.includes(valor)
        ? prev.valores.filter((v) => v !== valor)
        : [...prev.valores, valor],
    }));
  };

  const handleAdicionarIntegracao = () => {
    if (novaIntegracao.trim()) {
      setEmpresaData((prev) => ({
        ...prev,
        integracoes: [...prev.integracoes, novaIntegracao],
      }));
      setNovaIntegracao("");
      toast.success("Integração adicionada!");
    }
  };

  const handleRemoverIntegracao = (index: number) => {
    setEmpresaData((prev) => ({
      ...prev,
      integracoes: prev.integracoes.filter((_, i) => i !== index),
    }));
  };

  const handleSalvar = () => {
    if (!isPreenchido) {
      toast.error("Preencha os campos obrigatórios (Nome, CNPJ, Setor)");
      return;
    }
    setModo("visualizar");
    toast.success("Dados da empresa salvos com sucesso!");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Sobre a Empresa</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {isPreenchido
                      ? "Informações da sua empresa alimentam nossa IA para análises inteligentes"
                      : "Preencha os dados da sua empresa para começar"}
                  </p>
                </div>
              </div>
              {isPreenchido && (
                <Button
                  onClick={() => setModo(modo === "visualizar" ? "editar" : "visualizar")}
                  className={modo === "editar" ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "border-gray-300 dark:border-gray-700"}
                  variant={modo === "editar" ? "default" : "outline"}
                >
                  {modo === "editar" ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Modo Visualizar */}
          {isPreenchido && modo === "visualizar" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Funcionários</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {empresaData.funcionarios || "—"}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receita Anual</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {empresaData.receita || "—"}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Integrações</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {empresaData.integracoes.length}
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-orange-500 opacity-20" />
                  </div>
                </Card>
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Valores</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {empresaData.valores.length}
                      </p>
                    </div>
                    <Award className="w-8 h-8 text-blue-500 opacity-20" />
                  </div>
                </Card>
              </div>

              {/* Informações Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Informações Básicas</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Nome</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.nomeEmpresa}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">CNPJ</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.cnpj}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Setor</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.setor}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Localização</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.localizacao}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Contato */}
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-5 h-5 text-pink-600" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Contato</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Email</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Telefone</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.telefone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Website</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.website}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Ano de Fundação</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {empresaData.anoFundacao}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Descrição */}
              {empresaData.descricao && (
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Sobre</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {empresaData.descricao}
                  </p>
                </Card>
              )}

              {/* Missão e Visão */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {empresaData.missao && (
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Missão
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {empresaData.missao}
                    </p>
                  </Card>
                )}
                {empresaData.visao && (
                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      Visão
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {empresaData.visao}
                    </p>
                  </Card>
                )}
              </div>

              {/* Valores */}
              {empresaData.valores.length > 0 && (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Valores da Empresa
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {empresaData.valores.map((valor, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-4 py-2 text-sm">
                        {valor}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Integrações */}
              {empresaData.integracoes.length > 0 && (
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    Sistemas Utilizados ({empresaData.integracoes.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {empresaData.integracoes.map((integracao, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                      >
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {integracao}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Modo Editar/Criar */}
          {(modo === "editar" || !isPreenchido) && (
            <div className="space-y-6">
              {/* Seção 1: Informações Básicas */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  Informações Básicas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      value={empresaData.nomeEmpresa}
                      onChange={(e) => handleChange("nomeEmpresa", e.target.value)}
                      placeholder="Ex: DataPay Enterprise"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      CNPJ *
                    </label>
                    <input
                      type="text"
                      value={empresaData.cnpj}
                      onChange={(e) => handleChange("cnpj", e.target.value)}
                      placeholder="Ex: 12.345.678/0001-90"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Setor/Indústria *
                    </label>
                    <select
                      value={empresaData.setor}
                      onChange={(e) => handleChange("setor", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Selecione um setor</option>
                      {SETORES.map((setor) => (
                        <option key={setor} value={setor}>
                          {setor}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={empresaData.localizacao}
                      onChange={(e) => handleChange("localizacao", e.target.value)}
                      placeholder="Ex: São Paulo, SP - Brasil"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Ano de Fundação
                    </label>
                    <input
                      type="text"
                      value={empresaData.anoFundacao}
                      onChange={(e) => handleChange("anoFundacao", e.target.value)}
                      placeholder="Ex: 2018"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Número de Funcionários
                    </label>
                    <input
                      type="text"
                      value={empresaData.funcionarios}
                      onChange={(e) => handleChange("funcionarios", e.target.value)}
                      placeholder="Ex: 500+"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Seção 2: Contato */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-pink-600" />
                  Informações de Contato
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={empresaData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Ex: contato@empresa.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={empresaData.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                      placeholder="Ex: (11) 3000-0000"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={empresaData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="Ex: www.empresa.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Seção 3: Descrição, Missão e Visão */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Descrição e Estratégia
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Descrição da Empresa
                    </label>
                    <textarea
                      value={empresaData.descricao}
                      onChange={(e) => handleChange("descricao", e.target.value)}
                      placeholder="Descreva sua empresa, seu negócio e o que oferece..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Missão
                    </label>
                    <textarea
                      value={empresaData.missao}
                      onChange={(e) => handleChange("missao", e.target.value)}
                      placeholder="Qual é a missão da sua empresa?"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Visão
                    </label>
                    <textarea
                      value={empresaData.visao}
                      onChange={(e) => handleChange("visao", e.target.value)}
                      placeholder="Qual é a visão da sua empresa para o futuro?"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Receita Anual
                    </label>
                    <input
                      type="text"
                      value={empresaData.receita}
                      onChange={(e) => handleChange("receita", e.target.value)}
                      placeholder="Ex: R$ 50 milhões"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Seção 4: Valores */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Valores da Empresa
                </h3>
                <div className="flex flex-wrap gap-3">
                  {VALORES_PADRAO.map((valor) => (
                    <button
                      key={valor}
                      onClick={() => handleToggleValor(valor)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        empresaData.valores.includes(valor)
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          empresaData.valores.includes(valor)
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {valor}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Seção 5: Integrações */}
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  Sistemas Utilizados
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={novaIntegracao}
                      onChange={(e) => setNovaIntegracao(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAdicionarIntegracao();
                        }
                      }}
                      placeholder="Ex: Salesforce, SAP, Google Analytics..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button
                      onClick={handleAdicionarIntegracao}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {empresaData.integracoes.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {empresaData.integracoes.map((integracao, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between group hover:border-red-500 dark:hover:border-red-400 transition-colors"
                        >
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {integracao}
                          </p>
                          <button
                            onClick={() => handleRemoverIntegracao(idx)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Botões de Ação */}
              <div className="flex gap-3 pt-6">
                {isPreenchido && (
                  <Button
                    onClick={() => setModo("visualizar")}
                    variant="outline"
                    className="flex-1 border-gray-300 dark:border-gray-700"
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  onClick={handleSalvar}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isPreenchido ? "Atualizar Dados" : "Criar Perfil"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

