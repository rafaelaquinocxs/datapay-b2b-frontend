import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Shield, 
  Lock, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock,
  Eye,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("colaboradores");
  const [showNovoColaborador, setShowNovoColaborador] = useState(false);
  const [showNovoRole, setShowNovoRole] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", role: "Analista", departamento: "" });

  // Queries tRPC
  const colaboradoresQuery = trpc.configuracoes.colaboradores.listar.useQuery();
  const rolesQuery = trpc.configuracoes.roles.listar.useQuery();
  const permissoesQuery = trpc.configuracoes.permissoes.porRole.useQuery({ roleId: 1 });
  const auditLogQuery = trpc.configuracoes.auditoria.listar.useQuery();

  // Mutations tRPC
  const criarColaboradorMutation = trpc.configuracoes.colaboradores.criar.useMutation({
    onSuccess: () => {
      toast.success("Colaborador convidado com sucesso!");
      colaboradoresQuery.refetch();
      setShowNovoColaborador(false);
      setFormData({ nome: "", email: "", role: "Analista", departamento: "" });
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const deletarColaboradorMutation = trpc.configuracoes.colaboradores.deletar.useMutation({
    onSuccess: () => {
      toast.success("Colaborador removido com sucesso!");
      colaboradoresQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleConvidarColaborador = async () => {
    if (!formData.nome || !formData.email) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    await criarColaboradorMutation.mutateAsync({
      nome: formData.nome,
      email: formData.email,
      role: formData.role,
      departamento: formData.departamento,
    });
  };

  const handleDeletarColaborador = async (id: number) => {
    if (confirm("Tem certeza que deseja remover este colaborador?")) {
      await deletarColaboradorMutation.mutateAsync({ id });
    }
  };

  const colaboradores = colaboradoresQuery.data || [];
  const roles = rolesQuery.data || [];
  const auditLogs = auditLogQuery.data || [];

  // Calcular KPIs
  const totalColaboradores = colaboradores.length;
  const ativosCount = colaboradores.filter((c: any) => c.status === "ativo").length;
  const pendentesCount = colaboradores.filter((c: any) => c.status === "pendente").length;
  const rolesCount = roles.length;

  const modulos = [
    "Meus Dados",
    "Análise da IA",
    "Pesquisas",
    "Ações Inteligentes",
    "Relatórios",
    "Laboratório",
    "Configurações",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Configurações</h1>
        <p className="text-lg text-gray-600">Gerencie colaboradores, permissões e auditoria da sua empresa</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="colaborador@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {roles.map((role: any) => (
                        <option key={role.id} value={role.nome}>{role.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <input
                      type="text"
                      placeholder="Ex: Marketing"
                      value={formData.departamento}
                      onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <Button 
                    onClick={handleConvidarColaborador}
                    disabled={criarColaboradorMutation.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-green-500 text-white"
                  >
                    {criarColaboradorMutation.isPending ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Convite"
                    )}
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
                  <p className="text-3xl font-bold text-gray-900">{totalColaboradores}</p>
                </div>
                <Users className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ativos</p>
                  <p className="text-3xl font-bold text-green-600">{ativosCount}</p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pendentes</p>
                  <p className="text-3xl font-bold text-orange-600">{pendentesCount}</p>
                </div>
                <Clock className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Roles Configurados</p>
                  <p className="text-3xl font-bold text-blue-600">{rolesCount}</p>
                </div>
                <Shield className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Tabela de Colaboradores */}
          {colaboradoresQuery.isLoading ? (
            <Card className="p-12 flex items-center justify-center">
              <Loader2 className="animate-spin text-purple-600" size={32} />
            </Card>
          ) : colaboradores.length === 0 ? (
            <Card className="p-12 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Nenhum colaborador adicionado ainda</p>
              </div>
            </Card>
          ) : (
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
                    {colaboradores.map((colab: any) => (
                      <tr key={colab.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{colab.nome}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{colab.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge className="bg-purple-100 text-purple-700">{colab.role}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{colab.departamento || "-"}</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge className={colab.status === "ativo" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                            {colab.status === "ativo" ? "Ativo" : "Pendente"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <Edit size={16} className="text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleDeletarColaborador(colab.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
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
          {rolesQuery.isLoading ? (
            <Card className="p-12 flex items-center justify-center">
              <Loader2 className="animate-spin text-purple-600" size={32} />
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {roles.map((role: any) => (
                <Card key={role.id} className="p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{role.nome}</h3>
                      <p className="text-sm text-gray-600">{role.descricao}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">{role.usuariosCount || 0} usuário(s)</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-gray-700">Permissões:</p>
                    <div className="flex flex-wrap gap-2">
                      {(role.permissoes || []).map((perm: string) => (
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
          )}
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
                    {roles.map((role: any) => (
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
                      {roles.map((role: any) => (
                        <td key={role.id} className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={true}
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

          {auditLogQuery.isLoading ? (
            <Card className="p-12 flex items-center justify-center">
              <Loader2 className="animate-spin text-purple-600" size={32} />
            </Card>
          ) : auditLogs.length === 0 ? (
            <Card className="p-12 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Nenhum log de auditoria disponível</p>
              </div>
            </Card>
          ) : (
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
                    {auditLogs.map((log: any) => (
                      <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(log.criadoEm).toLocaleString('pt-BR')}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{log.usuarioNome || "Sistema"}</td>
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

