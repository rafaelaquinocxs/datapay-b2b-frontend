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
  CheckCircle,
  Plus,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

export default function SobreEmpresa() {
  const [isEditing, setIsEditing] = useState(false);
  const [integracoes, setIntegracoes] = useState([
    "Salesforce",
    "SAP",
    "Google Analytics",
    "Power BI",
    "HubSpot",
    "Stripe",
    "Slack",
    "Jira",
  ]);
  const [novaIntegracao, setNovaIntegracao] = useState("");
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-950 p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Sobre a Empresa
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Conheça todos os detalhes da sua empresa. Essas informações alimentam nossa IA para análises inteligentes e insights precisos.
            </p>
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-purple-200 dark:border-purple-900">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Informações Básicas</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nome da Empresa</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">DataPay Enterprise</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CNPJ</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">12.345.678/0001-90</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Setor/Indústria</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Tecnologia & Dados</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Localização</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-cyan-200 dark:border-cyan-900">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-cyan-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Histórico</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ano de Fundação</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">2018</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Anos de Operação</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">6+ anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Clientes Ativos</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">500+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Países</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Missão, Visão, Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-rose-200 dark:border-rose-900">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Missão</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Transformar dados em inteligência acionável, capacitando empresas a tomar decisões baseadas em dados com confiança e precisão.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-amber-200 dark:border-amber-900">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Visão</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ser a plataforma líder em inteligência de dados, onde empresas de todos os tamanhos acessam insights profundos e executam estratégias inteligentes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Valores</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Inovação
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Integridade
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Excelência
                </li>
              </ul>
            </div>
          </div>

          {/* KPIs Monitorados */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KPIs Monitorados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Receita Anual", value: "R$ 45.2M", trend: "+32%" },
                { label: "Taxa de Crescimento", value: "28%", trend: "+5%" },
                { label: "Taxa de Retenção", value: "94%", trend: "+2%" },
                { label: "NPS Score", value: "72", trend: "+8" },
                { label: "Clientes Ativos", value: "500+", trend: "+120" },
                { label: "Taxa de Churn", value: "2.1%", trend: "-0.5%" },
                { label: "Ticket Médio", value: "R$ 90.4K", trend: "+12%" },
                { label: "CAC Payback", value: "8.2 meses", trend: "-1.3m" },
              ].map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{kpi.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">{kpi.trend}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dados Financeiros */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-900">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dados Financeiros</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Receita Anual</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">R$ 45.2M</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">+32% vs ano anterior</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Lucro Operacional</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">R$ 12.8M</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">28.3% de margem</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Investimento em R&D</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">R$ 6.4M</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">14.2% da receita</p>
              </div>
            </div>
          </div>

          {/* Equipe */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Equipe</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { dept: "Engenharia", count: 45, growth: "+15%" },
                { dept: "Produto", count: 12, growth: "+8%" },
                { dept: "Vendas", count: 28, growth: "+22%" },
                { dept: "Suporte", count: 18, growth: "+10%" },
                { dept: "Marketing", count: 14, growth: "+12%" },
                { dept: "Operações", count: 8, growth: "+5%" },
                { dept: "Financeiro", count: 6, growth: "+2%" },
                { dept: "RH", count: 5, growth: "+3%" },
              ].map((dept, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 border border-pink-200 dark:border-pink-900"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{dept.dept}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{dept.count}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">{dept.growth}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <strong>Total:</strong> 136 colaboradores | <strong>Distribuição:</strong> 60% Brasil, 25% Latam, 15% Global
            </p>
          </div>

          {/* Integrações Ativas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sistemas Utilizados</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integracoes.map((integration, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900 text-center hover:shadow-lg transition-all"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{integration}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">✓ Conectado</p>
                </div>
              ))}
              {/* Card Adicionar Mais */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4 border-2 border-dashed border-purple-300 dark:border-purple-700 text-center hover:shadow-lg transition-all cursor-pointer">
                <button
                  onClick={() => {
                    const novo = prompt("Nome do sistema:");
                    if (novo) setIntegracoes([...integracoes, novo]);
                  }}
                  className="w-full flex flex-col items-center justify-center gap-2"
                >
                  <Plus className="w-6 h-6 text-purple-600" />
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Adicionar</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Novo Sistema</p>
                </button>
              </div>
            </div>
          </div>

          {/* Certificações e Conformidade */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificações e Conformidade</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cert: "LGPD Compliant", status: "Ativo", year: "2023" },
                { cert: "ISO 27001", status: "Ativo", year: "2022" },
                { cert: "SOC 2 Type II", status: "Ativo", year: "2023" },
                { cert: "GDPR Compliant", status: "Ativo", year: "2023" },
              ].map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{cert.cert}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Desde {cert.year}</p>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-bold">{cert.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota para LLM */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-900">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Nota para IA:</strong> Essas informações são utilizadas para contextualizar análises, gerar insights personalizados e executar ações inteligentes. 
              Mantenha esses dados atualizados para garantir a precisão das recomendações e análises geradas pelo sistema.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

