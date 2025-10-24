import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Database,
  CheckCircle2,
  Clock,
  Plus,
  FileSpreadsheet,
  Link as LinkIcon,
} from "lucide-react";

const fontesConectadas = [
  {
    id: 1,
    nome: "Cadastro de Sócios",
    tipo: "CSV",
    registros: "45.2k",
    ultimaSync: "Há 2 horas",
    status: "ativo",
    campos: ["Nome", "CPF", "Email", "Telefone", "Data Cadastro", "Plano"],
  },
  {
    id: 2,
    nome: "Vendas do Estádio",
    tipo: "Excel",
    registros: "128k",
    ultimaSync: "Há 5 min",
    status: "ativo",
    campos: ["Data", "Produto", "Valor", "Setor", "Horário", "CPF Cliente"],
  },
  {
    id: 3,
    nome: "Acesso Catraca",
    tipo: "API",
    registros: "892k",
    ultimaSync: "Sincronizando...",
    status: "sincronizando",
    campos: ["CPF", "Data/Hora", "Portão", "Tipo Ingresso"],
  },
];

export default function MeusDados() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Dados</h1>
          <p className="text-gray-500 mt-1">
            Conecte e gerencie suas fontes de dados
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <LinkIcon className="w-4 h-4" />
            Conectar API
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Upload className="w-4 h-4" />
            Upload de Arquivo
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fontes Conectadas</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Registros</p>
              <p className="text-3xl font-bold text-gray-900">1.06M</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Campos Mapeados</p>
              <p className="text-3xl font-bold text-gray-900">22</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Fontes Conectadas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Fontes de Dados Conectadas
        </h2>

        <div className="space-y-4">
          {fontesConectadas.map((fonte) => (
            <Card key={fonte.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FileSpreadsheet className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {fonte.nome}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {fonte.tipo}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {fonte.registros} registros
                      </span>
                    </div>
                  </div>
                </div>

                {fonte.status === "ativo" ? (
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

              {/* Campos */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Campos identificados:
                </p>
                <div className="flex flex-wrap gap-2">
                  {fonte.campos.map((campo, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-gray-50"
                    >
                      {campo}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Última sincronização: {fonte.ultimaSync}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Sincronizar Agora
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA para adicionar mais dados */}
      <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Plus className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Adicionar Mais Dados
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Quanto mais dados você conectar, mais precisa será a análise da IA
              </p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Fonte
          </Button>
        </div>
      </Card>
    </div>
  );
}

