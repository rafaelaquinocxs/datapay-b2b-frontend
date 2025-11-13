import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Check, X, Mail, User, Calendar } from "lucide-react";

interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  // Carregar usuários
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Erro ao carregar usuários");

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar usuário");
      }

      const data = await response.json();
      setUsers([...users, data.user]);
      setFormData({ email: "", name: "" });
      setShowCreateForm(false);
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar status");

      const data = await response.json();
      setUsers(users.map((u) => (u.id === userId ? data.user : u)));
      toast.success(currentStatus ? "Usuário desativado" : "Usuário ativado");
    } catch (error) {
      toast.error("Erro ao atualizar status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar usuário");

      setUsers(users.filter((u) => u.id !== userId));
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    } finally {
      setLoading(false);
    }
  };

  const activeCount = users.filter((u) => u.isActive).length;
  const totalCount = users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Painel Admin</h1>
          <p className="text-slate-400">Gerenciar contas de clientes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total de Usuários</p>
                <p className="text-3xl font-bold text-white">{totalCount}</p>
              </div>
              <User className="w-12 h-12 text-indigo-500 opacity-20" />
            </div>
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Usuários Ativos</p>
                <p className="text-3xl font-bold text-green-500">{activeCount}</p>
              </div>
              <Check className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Usuários Inativos</p>
                <p className="text-3xl font-bold text-red-500">{totalCount - activeCount}</p>
              </div>
              <X className="w-12 h-12 text-red-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <Card className="bg-slate-800 border-slate-700 p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Criar Nova Conta</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="usuario@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome
                </label>
                <Input
                  type="text"
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Criar Usuário
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Create Button */}
        {!showCreateForm && (
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 mb-8"
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Nova Conta
          </Button>
        )}

        {/* Users Table */}
        <Card className="bg-slate-800 border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Criado em
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-white">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{user.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleToggleStatus(user.id, user.isActive)}
                          disabled={loading}
                          variant="outline"
                          className={
                            user.isActive
                              ? "border-red-600 text-red-400 hover:bg-red-500/10"
                              : "border-green-600 text-green-400 hover:bg-green-500/10"
                          }
                        >
                          {user.isActive ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={loading}
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-slate-400">Nenhum usuário criado ainda</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

