import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader,
  Database,
  Cloud,
  Key,
} from "lucide-react";

const CONECTORES = [
  { id: "csv", nome: "CSV", icon: "📄", descricao: "Upload de arquivo CSV" },
  { id: "excel", nome: "Excel", icon: "📊", descricao: "Upload de arquivo Excel" },
  { id: "postgresql", nome: "PostgreSQL", icon: "🗄️", descricao: "Banco de dados PostgreSQL" },
  { id: "mysql", nome: "MySQL", icon: "🗄️", descricao: "Banco de dados MySQL" },
  { id: "salesforce", nome: "Salesforce", icon: "☁️", descricao: "CRM Salesforce" },
  { id: "sap", nome: "SAP B1", icon: "🏢", descricao: "SAP Business One" },
  { id: "vtex", nome: "VTEX", icon: "🛒", descricao: "Plataforma VTEX" },
  { id: "api", nome: "API", icon: "🔌", descricao: "API Personalizada" },
];

const ENTIDADES = [
  "clientes",
  "pedidos",
  "itens_pedido",
  "produtos",
  "estoque",
  "pagamentos",
];

export default function AdicionarFonte() {
  const empresaId = 1;
  const [passo, setPasso] = useState(1);
  const [conectorSelecionado, setConectorSelecionado] = useState<string>("");
  const [nomeConexao, setNomeConexao] = useState("");
  const [entidade, setEntidade] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Passo 2: Autenticação
  const [host, setHost] = useState("");
  const [porta, setPorta] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const createMutation = trpc.dataSources.create.useMutation({
    onSuccess: () => {
      toast.success("Fonte criada com sucesso!");
      resetForm();
    },
    onError: () => {
      toast.error("Erro ao criar fonte");
    },
  });

  const resetForm = () => {
    setPasso(1);
    setConectorSelecionado("");
    setNomeConexao("");
    setEntidade("");
    setArquivo(null);
    setHost("");
    setPorta("");
    setUsuario("");
    setSenha("");
    setApiUrl("");
    setApiKey("");
  };

  const handleProxPasso = async () => {
    if (passo === 1 && !conectorSelecionado) {
      toast.error("Selecione um conector");
      return;
    }
    if (passo === 2 && !nomeConexao) {
      toast.error("Digite um nome para a conexão");
      return;
    }
    if (passo === 3 && !entidade) {
      toast.error("Selecione uma entidade");
      return;
    }

    if (passo === 4) {
      // Criar fonte
      setIsLoading(true);
      try {
        await createMutation.mutateAsync({
          empresaId,
          nome: nomeConexao,
          conector: conectorSelecionado,
          entidade,
          configuracao: {
            host,
            porta,
            usuario,
            senha,
            apiUrl,
            apiKey,
            arquivo: arquivo?.name,
          },
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setPasso(passo + 1);
    }
  };

  const handleAnterior = () => {
    if (passo > 1) setPasso(passo - 1);
  };

  const conector = CONECTORES.find((c) => c.id === conectorSelecionado);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  n <= passo
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {n}
              </div>
              {n < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    n < passo ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Conector</span>
          <span>Autenticação</span>
          <span>Mapeamento</span>
          <span>Agendamento</span>
        </div>
      </div>

      {/* Passo 1: Escolher Conector */}
      {passo === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Escolha um conector</h2>
          <p className="text-gray-600">Selecione a fonte de dados que deseja conectar</p>

          <div className="grid grid-cols-2 gap-3">
            {CONECTORES.map((c) => (
              <Card
                key={c.id}
                className={`p-4 cursor-pointer transition-all ${
                  conectorSelecionado === c.id
                    ? "border-2 border-purple-600 bg-purple-50"
                    : "border-2 border-gray-200 hover:border-purple-300"
                }`}
                onClick={() => setConectorSelecionado(c.id)}
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <h3 className="font-semibold text-gray-900">{c.nome}</h3>
                <p className="text-xs text-gray-600">{c.descricao}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Passo 2: Autenticação/Upload */}
      {passo === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {conector?.nome} - Autenticação
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Nome da Conexão
            </label>
            <input
              type="text"
              value={nomeConexao}
              onChange={(e) => setNomeConexao(e.target.value)}
              placeholder="Ex: Salesforce - Leads"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {(conectorSelecionado === "csv" || conectorSelecionado === "excel") && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Arquivo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept={conectorSelecionado === "csv" ? ".csv" : ".xlsx,.xls"}
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  className="w-full"
                />
                {arquivo && (
                  <p className="text-sm text-gray-600 mt-2">
                    ✓ {arquivo.name} ({(arquivo.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
            </div>
          )}

          {(conectorSelecionado === "postgresql" || conectorSelecionado === "mysql") && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Host
                  </label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="localhost"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Porta
                  </label>
                  <input
                    type="text"
                    value={porta}
                    onChange={(e) => setPorta(e.target.value)}
                    placeholder="5432"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Testar Conexão
              </Button>
            </>
          )}

          {(conectorSelecionado === "api" || conectorSelecionado === "salesforce") && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  URL da API
                </label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.exemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  API Key / Token
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Passo 3: Mapeamento */}
      {passo === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Mapeamento de Entidade</h2>
          <p className="text-gray-600">Selecione qual entidade esses dados representam</p>

          <div className="space-y-2">
            {ENTIDADES.map((ent) => (
              <Card
                key={ent}
                className={`p-4 cursor-pointer transition-all ${
                  entidade === ent
                    ? "border-2 border-purple-600 bg-purple-50"
                    : "border border-gray-200 hover:border-purple-300"
                }`}
                onClick={() => setEntidade(ent)}
              >
                <div className="flex items-center">
                  <Database className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900 capitalize">{ent}</span>
                  {entidade === ent && (
                    <CheckCircle2 className="w-5 h-5 ml-auto text-purple-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Passo 4: Agendamento */}
      {passo === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Agendamento</h2>
          <p className="text-gray-600">Configure como e quando sincronizar os dados</p>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Resumo da Configuração</h3>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>✓ Conector: <strong>{conector?.nome}</strong></li>
                  <li>✓ Nome: <strong>{nomeConexao}</strong></li>
                  <li>✓ Entidade: <strong className="capitalize">{entidade}</strong></li>
                </ul>
              </div>
            </div>
          </Card>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Frequência de Sincronização
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600">
              <option>Tempo real (webhook)</option>
              <option>A cada 15 minutos</option>
              <option>A cada hora</option>
              <option>Diariamente</option>
              <option>Semanalmente</option>
            </select>
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          onClick={handleAnterior}
          disabled={passo === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <Button
          onClick={handleProxPasso}
          disabled={isLoading}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : passo === 4 ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Conectar Fonte
            </>
          ) : (
            <>
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

