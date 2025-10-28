import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Database,
  Upload,
  Plug,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  Cloud,
} from "lucide-react";

export default function MeusDados() {
  const empresa = { id: 1, nome: "Empresa Demo" }; // Mock para apresenta\u00e7\u00e3o
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoConexao, setTipoConexao] = useState<string>("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Formulário de conexão API
  const [nomeConexao, setNomeConexao] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  // Query para listar fontes
  const { data: fontes, refetch } = trpc.fontesDados.listar.useQuery(
    { empresaId: empresa?.id || 0 },
    { enabled: !!empresa?.id }
  );

  // Mutation para adicionar fonte
  const adicionarFonte = trpc.fontesDados.adicionar.useMutation({
    onSuccess: () => {
      toast.success("Fonte de dados adicionada com sucesso!");
      refetch();
      setModalAberto(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao adicionar fonte");
      setCarregando(false);
    },
  });

  // Mutation para remover fonte
  const removerFonte = trpc.fontesDados.remover.useMutation({
    onSuccess: () => {
      toast.success("Fonte removida com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao remover fonte");
    },
  });

  const resetForm = () => {
    setTipoConexao("");
    setArquivo(null);
    setNomeConexao("");
    setApiUrl("");
    setApiKey("");
    setCarregando(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    if (!empresa?.id) {
      toast.error("Empresa não identificada");
      setCarregando(false);
      return;
    }

    try {
      if (tipoConexao === "csv" || tipoConexao === "excel") {
        if (!arquivo) {
          toast.error("Selecione um arquivo");
          setCarregando(false);
          return;
        }

        // Simular processamento do arquivo
        await new Promise((resolve) => setTimeout(resolve, 2000));

        await adicionarFonte.mutateAsync({
          empresaId: empresa.id,
          nome: arquivo.name,
          tipo: tipoConexao,
          configuracao: {
            nomeArquivo: arquivo.name,
            tamanho: arquivo.size,
          },
        });
      } else {
        // Conexão via API
        if (!nomeConexao || !apiUrl || !apiKey) {
          toast.error("Preencha todos os campos");
          setCarregando(false);
          return;
        }

        await adicionarFonte.mutateAsync({
          empresaId: empresa.id,
          nome: nomeConexao,
          tipo: tipoConexao,
          configuracao: {
            apiUrl,
            apiKey,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar fonte:", error);
    }
  };

  const handleRemover = async (id: number) => {
    if (confirm("Tem certeza que deseja remover esta fonte de dados?")) {
      await removerFonte.mutateAsync({ id });
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "csv":
      case "excel":
        return <FileSpreadsheet className="w-5 h-5" />;
      default:
        return <Cloud className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "conectado":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "sincronizando":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case "erro":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Dados</h1>
          <p className="text-gray-600">
            Conecte e gerencie suas fontes de dados
          </p>
        </div>
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plug className="w-4 h-4 mr-2" />
              Adicionar Fonte
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Fonte de Dados</DialogTitle>
              <DialogDescription>
                Escolha como deseja conectar seus dados
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de Conexão */}
              <div className="space-y-2">
                <Label>Tipo de Conexão</Label>
                <Select value={tipoConexao} onValueChange={setTipoConexao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">Upload CSV</SelectItem>
                    <SelectItem value="excel">Upload Excel</SelectItem>
                    <SelectItem value="totvs">TOTVS Protheus</SelectItem>
                    <SelectItem value="sap">SAP Business One</SelectItem>
                    <SelectItem value="salesforce">Salesforce</SelectItem>
                    <SelectItem value="vtex">VTEX</SelectItem>
                    <SelectItem value="linx">Linx</SelectItem>
                    <SelectItem value="api">API Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upload de Arquivo */}
              {(tipoConexao === "csv" || tipoConexao === "excel") && (
                <div className="space-y-2">
                  <Label>Arquivo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <Input
                      type="file"
                      accept={tipoConexao === "csv" ? ".csv" : ".xlsx,.xls"}
                      onChange={handleFileChange}
                      className="max-w-xs mx-auto"
                    />
                    {arquivo && (
                      <p className="text-sm text-gray-600 mt-2">
                        {arquivo.name} ({(arquivo.size / 1024).toFixed(2)} KB)
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Conexão via API */}
              {tipoConexao &&
                tipoConexao !== "csv" &&
                tipoConexao !== "excel" && (
                  <>
                    <div className="space-y-2">
                      <Label>Nome da Conexão</Label>
                      <Input
                        placeholder="Ex: CRM Principal"
                        value={nomeConexao}
                        onChange={(e) => setNomeConexao(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL da API</Label>
                      <Input
                        placeholder="https://api.exemplo.com"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>API Key / Token</Label>
                      <Input
                        type="password"
                        placeholder="••••••••••••••••"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                  </>
                )}

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setModalAberto(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={carregando || !tipoConexao}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {carregando ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Plug className="w-4 h-4 mr-2" />
                      Conectar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Fontes */}
      {fontes && fontes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fontes.map((fonte) => (
            <Card key={fonte.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    {getTipoIcon(fonte.tipo)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {fonte.nome}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {fonte.tipo}
                    </p>
                  </div>
                </div>
                {getStatusIcon(fonte.status || "conectado")}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Registros:</span>
                  <span className="font-medium">
                    {fonte.totalRegistros?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última sync:</span>
                  <span className="font-medium">
                    {fonte.ultimaSincronizacao
                      ? new Date(fonte.ultimaSincronizacao).toLocaleDateString()
                      : "Nunca"}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleRemover(fonte.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remover
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhuma fonte conectada
          </h3>
          <p className="text-gray-600 mb-6">
            Comece adicionando sua primeira fonte de dados
          </p>
          <Button
            onClick={() => setModalAberto(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plug className="w-4 h-4 mr-2" />
            Adicionar Fonte
          </Button>
        </Card>
      )}
    </div>
  );
}

