import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Shield, 
  Lock, 
  AlertCircle, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock,
  Mail,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Bell,
  Smartphone,
  Key,
  Zap
} from "lucide-react";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("colaboradores");
  const [showNovoColaborador, setShowNovoColaborador] = useState(false);
  const [showNovoRole, setShowNovoRole] = useState(false);

  // Mock data - Em produção, virá da API tRPC
  const colaboradores = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@empresa.com",
      role: "Admin",
      departamento: "Executivo",
      cargo: "CEO",
      status: "ativo",
      dataAceite: "2025-01-15",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@empresa.com",
      role: "Gerente",
      departamento: "Marketing",
      cargo: "Gerente de Marketing",
      status: "ativo",
      dataAceite: "2025-01-20",
    },
    {
      id: 3,
      nome: "Carlos Oliveira",
      email: "carlos@empresa.com",
      role: "Analista",
      departamento: "BI",
      cargo: "Analista de Dados",
      status: "pendente",
      dataAceite: null,
    },
  ];

  const roles = [
    {
      id: 1,
      nome: "Admin",
      descricao: "Acesso total à plataforma",
      cor: "red",
      usuarios: 1,
      permissoes: ["visualizar", "criar", "editar", "deletar", "exportar", "gerenciar_usuarios"],
    },
    {
      id: 2,
      nome: "Gerente",
      descricao: "Gerencia ações e resultados",
      cor: "blue",
      usuarios: 1,
      permissoes: ["visualizar", "criar", "editar", "exportar", "executar_acoes"],
    },
    {
      id: 3,
      nome: "Analista",
      descricao: "Cria insights e pesquisas",
      cor: "green",
      usuarios: 1,
      permissoes: ["visualizar", "criar", "editar", "exportar"],
    },
    {
      id: 4,
      nome: "Visualizador",
      descricao: "Apenas visualiza relatórios",
      cor: "gray",
      usuarios: 0,
      permissoes: ["visualizar"],
    },
  ];

  const modulos = [
    "Meus Dados",
    "Análise da IA",
    "Pesquisas",
    "Ações Inteligentes",
    "Relatórios",
    "Laboratório",
    "Configurações",
  ];

  const auditLogs = [
    {
      id: 1,
      acao: "criar",
      modulo: "configuracoes",
      usuario: "João Silva",
      descricao: "Colaborador carlos@empresa.com convidado",
      resultado: "sucesso",
      data: "2025-11-02 14:32:15",
    },
    {
      id: 2,
      acao: "editar",
      modulo: "configuracoes",
      usuario: "João Silva",
      descricao: "Permissões do role Analista atualizadas",
      resultado: "sucesso",
      data: "2025-11-02 14:15:42",
    },
    {
      id: 3,
      acao: "deletar",
      modulo: "meus_dados",
      usuario: "Maria Santos",
      descricao: "Fonte de dados 'Salesforce' removida",
      resultado: "sucesso",
      data: "2025-11-02 13:45:20",
    },
    {
      id: 4,
      acao: "visualizar",
      modulo: "relatorios",
      usuario: "Carlos Oliveira",
      descricao: "Relatório de diagnóstico exportado",
      resultado: "sucesso",
      data: "2025-11-02 13:20:05",
    },
  ];

  const alertas = [
    {
      id: 1,
      tipo: "acesso_negado",
      severidade: "media",
      descricao: "Tentativa de acesso negada para usuário carlos@empresa.com em Configurações",
      usuario: "Carlos Oliveira",
      data: "2025-11-02 12:15:30",
      lido: false,
    },
    {
      id: 2,
      tipo: "mudanca_permissoes",
      severidade: "alta",
      descricao: "Permissões do role Gerente foram alteradas",
      usuario: "João Silva",
      data: "2025-11-02 11:45:20",
      lido: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Configurações</h1>
        <p className="text-lg text-gray-600">Gerencie colaboradores, permissões e segurança da sua empresa</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="colaboradores" className="flex items-center gap-2">
            <Users size={18} />
            <span className="hidden sm:inline">Colaboradores</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield size={18} />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="permissoes" className="flex items-center gap-2">
            <Lock size={18} />
            <span className="hidden sm:inline">Permissões</span>
          </TabsTrigger>
          <TabsTrigger value="auditoria" className="flex items-center gap-2">
            <Eye size={18} />
            <span className="hidden sm:inline">Auditoria</span>
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* ============================================================================ */}
        {/* TAB 1: COLABORADORES */}
        {/* ============================================================================ */}
        <TabsContent value="colaboradores" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Colaboradores</h2>
            <Dialog open={showNovoColaborador} onOpenChange={setShowNovoColaborador}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white">
                  <Plus size={18} className="mr-2" />
                  Convidar Colaborador
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Convidar Novo Colaborador</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="colaborador@empresa.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                      <option>Admin</option>
                      <option>Gerente</option>
                      <option>Analista</option>
                      <option>Visualizador</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <input
                      type="text"
                      placeholder="Ex: Marketing"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-green-500 text-white">
                    Enviar Convite
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Colaboradores</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <Users className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-3xl font-bold text-green-600">2</p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pendentes</p>
                  <p className="text-3xl font-bold text-orange-600">1</p>
                </div>
                <Clock className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Roles Configurados</p>
                  <p className="text-3xl font-bold text-blue-600">4</p>
                </div>
                <Shield className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Tabela de Colaboradores */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Departamento</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {colaboradores.map((colab) => (
                    <tr key={colab.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{colab.nome}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{colab.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className="bg-purple-100 text-purple-700">{colab.role}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{colab.departamento}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className={colab.status === "ativo" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                          {colab.status === "ativo" ? "Ativo" : "Pendente"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <Edit size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ============================================================================ */}
        {/* TAB 2: ROLES */}
        {/* ============================================================================ */}
        <TabsContent value="roles" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Roles (Papéis)</h2>
            <Dialog open={showNovoRole} onOpenChange={setShowNovoRole}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white">
                  <Plus size={18} className="mr-2" />
                  Novo Role
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Role</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Role</label>
                    <input
                      type="text"
                      placeholder="Ex: Supervisor"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea
                      placeholder="Descreva as responsabilidades deste role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-green-500 text-white">
                    Criar Role
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Grid de Roles */}
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{role.nome}</h3>
                    <p className="text-sm text-gray-600">{role.descricao}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">{role.usuarios} usuário(s)</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <p className="text-sm font-semibold text-gray-700">Permissões:</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissoes.map((perm) => (
                      <Badge key={perm} className="bg-gray-100 text-gray-700 text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                    <Trash2 size={16} className="mr-2" />
                    Deletar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ============================================================================ */}
        {/* TAB 3: PERMISSÕES */}
        {/* ============================================================================ */}
        <TabsContent value="permissoes" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Matriz de Permissões</h2>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Módulo</th>
                    {roles.map((role) => (
                      <th key={role.id} className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                        {role.nome}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modulos.map((modulo, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{modulo}</td>
                      {roles.map((role) => (
                        <td key={role.id} className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={role.permissoes.includes("visualizar")}
                            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white">
              Salvar Permissões
            </Button>
          </div>
        </TabsContent>

        {/* ============================================================================ */}
        {/* TAB 4: AUDITORIA */}
        {/* ============================================================================ */}
        <TabsContent value="auditoria" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Log de Auditoria</h2>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Data/Hora</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usuário</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ação</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Módulo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-600">{log.data}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{log.usuario}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className="bg-blue-100 text-blue-700 capitalize">{log.acao}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.modulo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.descricao}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className="bg-green-100 text-green-700">✓ {log.resultado}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ============================================================================ */}
        {/* TAB 5: SEGURANÇA */}
        {/* ============================================================================ */}
        <TabsContent value="seguranca" className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Segurança & Alertas</h2>

          {/* Alertas de Segurança */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Alertas Recentes</h3>
            {alertas.map((alerta) => (
              <Card key={alerta.id} className={`p-6 border-l-4 ${alerta.severidade === "alta" ? "border-red-500 bg-red-50" : "border-orange-500 bg-orange-50"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className={alerta.severidade === "alta" ? "text-red-600" : "text-orange-600"} size={20} />
                      <h4 className="font-semibold text-gray-900">{alerta.descricao}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Usuário:</strong> {alerta.usuario} | <strong>Data:</strong> {alerta.data}
                    </p>
                  </div>
                  <Badge className={alerta.severidade === "alta" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}>
                    {alerta.severidade === "alta" ? "Crítico" : "Médio"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Configurações de Segurança */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Configurações de Segurança</h3>

            <Card className="p-6 space-y-6">
              {/* 2FA */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Key className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Autenticação de Dois Fatores</h4>
                    <p className="text-sm text-gray-600">Ative 2FA para aumentar a segurança</p>
                  </div>
                </div>
                <Button variant="outline">Ativar</Button>
              </div>

              {/* SSO */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Single Sign-On (SSO)</h4>
                    <p className="text-sm text-gray-600">Configure SSO com seu provedor de identidade</p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>

              {/* Notificações */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Notificações de Segurança</h4>
                    <p className="text-sm text-gray-600">Receba alertas de atividades suspeitas</p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

