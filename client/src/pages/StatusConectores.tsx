import { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Download,
  Filter,
  Search,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

interface ConnectorStatus {
  id: string;
  nome: string;
  categoria: string;
  status: "ready" | "debugging" | "coming" | "error";
  implementado: boolean;
  dataImplementacao?: string;
  ultimaSincronizacao?: string;
  erros?: string[];
  descricao: string;
  endpoints: string[];
}

const CONECTORES_STATUS: ConnectorStatus[] = [
  // ERP
  {
    id: "totvs",
    nome: "TOTVS Protheus",
    categoria: "ERP",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-15",
    ultimaSincronizacao: "2024-01-20 14:30",
    descricao: "Integração completa com TOTVS Protheus",
    endpoints: ["Manifesto", "Materiais", "Lançamentos Contábeis", "GeoService"],
  },
  {
    id: "sap",
    nome: "SAP S/4HANA",
    categoria: "ERP",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-15",
    ultimaSincronizacao: "2024-01-20 15:00",
    descricao: "Integração completa com SAP S/4HANA",
    endpoints: ["Parceiros Comerciais", "Materiais", "Ordens de Compra", "Dados Financeiros"],
  },

  // CRM
  {
    id: "salesforce",
    nome: "Salesforce",
    categoria: "CRM",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-16",
    ultimaSincronizacao: "2024-01-20 16:00",
    descricao: "Integração com Salesforce Cloud",
    endpoints: ["Contas", "Contatos", "Oportunidades", "Leads", "Tarefas"],
  },
  {
    id: "hubspot",
    nome: "HubSpot",
    categoria: "CRM",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-17",
    ultimaSincronizacao: "2024-01-20 16:30",
    descricao: "Integração com HubSpot CRM",
    endpoints: ["Contatos", "Deals", "Campanhas", "Empresas"],
  },

  // Analytics & BI
  {
    id: "google-analytics",
    nome: "Google Analytics",
    categoria: "Analytics",
    status: "debugging",
    implementado: true,
    dataImplementacao: "2024-01-18",
    ultimaSincronizacao: "2024-01-20 10:00",
    erros: ["Erro de autenticação OAuth", "Limite de taxa excedido"],
    descricao: "Integração com Google Analytics 4",
    endpoints: ["Tráfego", "Conversões", "Usuários", "Páginas"],
  },
  {
    id: "power-bi",
    nome: "Power BI",
    categoria: "BI",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-19",
    ultimaSincronizacao: "2024-01-20 17:00",
    descricao: "Integração com Microsoft Power BI",
    endpoints: ["Grupos", "Datasets", "Relatórios", "Dashboards"],
  },
  {
    id: "tableau",
    nome: "Tableau",
    categoria: "BI",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-19",
    ultimaSincronizacao: "2024-01-20 17:30",
    descricao: "Integração com Tableau Server",
    endpoints: ["Workbooks", "Dashboards", "Datasources", "Usuários"],
  },

  // Pagamentos
  {
    id: "stripe",
    nome: "Stripe",
    categoria: "Pagamentos",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 18:00",
    descricao: "Integração com Stripe Payments",
    endpoints: ["Clientes", "Transações", "Faturas", "Subscrições"],
  },

  // Comunicação
  {
    id: "slack",
    nome: "Slack",
    categoria: "Comunicação",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 18:30",
    descricao: "Integração com Slack Workspace",
    endpoints: ["Usuários", "Canais", "Mensagens", "Grupos"],
  },

  // Projeto
  {
    id: "jira",
    nome: "Jira",
    categoria: "Projeto",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 19:00",
    descricao: "Integração com Jira Cloud",
    endpoints: ["Projetos", "Issues", "Sprints", "Boards"],
  },

  // Cloud
  {
    id: "aws",
    nome: "AWS",
    categoria: "Cloud",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 19:30",
    descricao: "Integração com Amazon Web Services",
    endpoints: ["EC2", "S3", "RDS", "CloudWatch"],
  },
  {
    id: "azure",
    nome: "Azure",
    categoria: "Cloud",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 20:00",
    descricao: "Integração com Microsoft Azure",
    endpoints: ["VMs", "Storage", "Databases", "Monitoring"],
  },

  // Tráfego Pago
  {
    id: "meta",
    nome: "Meta (Facebook/Instagram Ads)",
    categoria: "Tráfego Pago",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 20:30",
    descricao: "Integração com Meta Ads Manager",
    endpoints: ["Campanhas", "Anúncios", "Insights", "Contas"],
  },

  // E-commerce
  {
    id: "shopify",
    nome: "Shopify",
    categoria: "E-commerce",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 21:00",
    descricao: "Integração com Shopify Store",
    endpoints: ["Produtos", "Pedidos", "Clientes", "Shop"],
  },
  {
    id: "woocommerce",
    nome: "WooCommerce",
    categoria: "E-commerce",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 21:30",
    descricao: "Integração com WooCommerce",
    endpoints: ["Produtos", "Pedidos", "Clientes", "Status"],
  },
  {
    id: "magento",
    nome: "Magento",
    categoria: "E-commerce",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 22:00",
    descricao: "Integração com Magento Commerce",
    endpoints: ["Produtos", "Pedidos", "Clientes", "Configurações"],
  },

  // Bancos de Dados
  {
    id: "postgresql",
    nome: "PostgreSQL",
    categoria: "Banco de Dados",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 22:30",
    descricao: "Integração com PostgreSQL Database",
    endpoints: ["Tabelas", "Colunas", "Dados", "Estatísticas"],
  },
  {
    id: "mysql",
    nome: "MySQL",
    categoria: "Banco de Dados",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 23:00",
    descricao: "Integração com MySQL Database",
    endpoints: ["Tabelas", "Colunas", "Dados", "Estatísticas"],
  },

  // Arquivo
  {
    id: "csv",
    nome: "CSV/Excel",
    categoria: "Arquivo",
    status: "ready",
    implementado: true,
    dataImplementacao: "2024-01-20",
    ultimaSincronizacao: "2024-01-20 23:30",
    descricao: "Upload de arquivos CSV e Excel",
    endpoints: ["Upload", "Validação", "Importação", "Mapeamento"],
  },
];

export default function StatusConectores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const categorias = ["Todos", ...new Set(CONECTORES_STATUS.map((c) => c.categoria))];
  const statusOptions = ["Todos", "ready", "debugging", "coming", "error"];

  const filteredConectores = CONECTORES_STATUS.filter((conector) => {
    const matchesSearch = conector.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || conector.categoria === selectedCategory;
    const matchesStatus = statusFilter === "Todos" || conector.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "debugging":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "coming":
        return <Clock className="w-5 h-5 text-gray-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ready":
        return "Pronto";
      case "debugging":
        return "Debugando";
      case "coming":
        return "Em Breve";
      case "error":
        return "Erro";
      default:
        return status;
    }
  };

  const stats = {
    total: CONECTORES_STATUS.length,
    pronto: CONECTORES_STATUS.filter((c) => c.status === "ready").length,
    debugando: CONECTORES_STATUS.filter((c) => c.status === "debugging").length,
    erro: CONECTORES_STATUS.filter((c) => c.status === "error").length,
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Status de Conectores</h1>
          <p className="text-slate-600 dark:text-slate-400">Visualize o status de implementação de todos os conectores</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Pronto</p>
            <p className="text-3xl font-bold text-green-600">{stats.pronto}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Debugando</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.debugando}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Erro</p>
            <p className="text-3xl font-bold text-red-600">{stats.erro}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar conectores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>

        {/* Filtros por Categoria e Status */}
        <div className="mb-8 flex flex-wrap gap-2">
          <div className="flex gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setSelectedCategory(categoria)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === categoria
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela de Status */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Conector</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Implementado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Última Sincronização</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Endpoints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredConectores.map((conector) => (
                <tr key={conector.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{conector.nome}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{conector.categoria}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(conector.status)}
                      <span className="text-sm font-medium">{getStatusLabel(conector.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {conector.implementado ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {conector.ultimaSincronizacao || "Nunca"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {conector.endpoints.map((endpoint, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                        >
                          {endpoint}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Erros Conhecidos */}
        {CONECTORES_STATUS.some((c) => c.erros && c.erros.length > 0) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Erros Conhecidos</h2>
            <div className="space-y-3">
              {CONECTORES_STATUS.filter((c) => c.erros && c.erros.length > 0).map((conector) => (
                <div key={conector.id} className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">{conector.nome}</h3>
                  <ul className="space-y-1">
                    {conector.erros?.map((erro, idx) => (
                      <li key={idx} className="text-sm text-red-800 dark:text-red-200 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {erro}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

