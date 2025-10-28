import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Database,
  ShoppingBag,
  Building2,
  BarChart,
} from "lucide-react";

const conectores = [
  {
    id: 1,
    nome: "Salesforce",
    categoria: "CRM",
    icon: "SF",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    status: "ativo",
    registros: "1.2M",
    ultimaSync: "5 min atrás",
    descricao: "Accounts, Contacts, Opportunities, Leads",
  },
  {
    id: 2,
    nome: "VTEX",
    categoria: "E-commerce",
    icon: "VX",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    status: "ativo",
    registros: "850k",
    ultimaSync: "12 min atrás",
    descricao: "Clientes, Pedidos, Carrinhos, Pagamentos",
  },
  {
    id: 3,
    nome: "TOTVS Protheus",
    categoria: "ERP",
    icon: "TV",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    status: "sincronizando",
    registros: "2.1M",
    ultimaSync: "Sincronizando...",
    descricao: "Clientes, Pedidos, Produtos, Notas Fiscais",
  },
  {
    id: 4,
    nome: "SAP S/4HANA",
    categoria: "ERP",
    icon: "SAP",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    status: "ativo",
    registros: "3.5M",
    ultimaSync: "1 hora atrás",
    descricao: "Business Partners, Ordens de Venda, Faturas",
  },
  {
    id: 5,
    nome: "Google Analytics",
    categoria: "Analytics",
    icon: "GA",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    status: "ativo",
    registros: "5.2M",
    ultimaSync: "30 min atrás",
    descricao: "Eventos, Sessões, Conversões, Usuários",
  },
];

const conectoresDisponiveis = [
  {
    nome: "Microsoft Dynamics 365",
    categoria: "CRM",
    icon: "D365",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    nome: "Shopify Plus",
    categoria: "E-commerce",
    icon: "SH",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    nome: "Oracle NetSuite",
    categoria: "ERP",
    icon: "NS",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    nome: "HubSpot",
    categoria: "CRM",
    icon: "HS",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function Conectores() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conectores</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas integrações e fontes de dados
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Conector
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Buscar conectores..."
          className="pl-10 h-12"
        />
      </div>

      {/* Conectores Ativos */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Conectores Ativos ({conectores.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {conectores.map((conector) => (
            <Card key={conector.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${conector.iconBg} flex items-center justify-center`}
                  >
                    <span className={`${conector.iconColor} font-bold text-sm`}>
                      {conector.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {conector.nome}
                    </h3>
                    <p className="text-sm text-gray-500">{conector.categoria}</p>
                  </div>
                </div>

                {conector.status === "ativo" ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Ativo
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                    <Clock className="w-3 h-3 mr-1" />
                    Sincronizando
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">{conector.descricao}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500">Registros</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {conector.registros}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Última Sync</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {conector.ultimaSync}
                    </p>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Conectores Disponíveis */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Conectores Disponíveis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conectoresDisponiveis.map((conector, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all hover:border-purple-300 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`w-16 h-16 rounded-xl ${conector.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <span className={`${conector.iconColor} font-bold`}>
                    {conector.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{conector.nome}</h3>
                  <p className="text-xs text-gray-500 mt-1">{conector.categoria}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Conectar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12.8M</p>
              <p className="text-sm text-gray-600">Total de Registros</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2.4M</p>
              <p className="text-sm text-gray-600">Perfis Unificados</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Conectores Ativos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <BarChart className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">99.8%</p>
              <p className="text-sm text-gray-600">Taxa de Sucesso</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

