import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  ExternalLink,
  FileSpreadsheet,
  Database,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Relatorios() {
  const [atualizando, setAtualizando] = useState(false);

  
  const diagnosticosQuery = trpc.diagnostico.listar.useQuery();

  const handleAtualizarDados = async () => {
    setAtualizando(true);
    try {
      await diagnosticosQuery.refetch();
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar dados");
    } finally {
      setAtualizando(false);
    }
  };

  const handleExportarCSV = async () => {
    try {
      const diagnosticos = diagnosticosQuery.data || [];
      
      // Criar CSV
      const headers = [
        "ID",
        "Empresa ID",
        "Score Geral",
        "Score Governança",
        "Score Integração",
        "Score Analítica",
        "Score Decisão",
        "Score ROI",
        "Desperdício Mensal",
        "Potencial Mensal",
        "Impacto Anual",
        "Data"
      ];
      
      const rows = diagnosticos.map(d => [
        d.id,
        d.empresaId,
        d.scoreGeral,
        d.scoreGovernanca,
        d.scoreIntegracao,
        d.scoreAnalitica,
        d.scoreDecisao,
        d.scoreRoi,
        d.desperdicioMensal,
        d.potencialMensal,
        d.impactoAnual,
        new Date(d.createdAt).toLocaleDateString('pt-BR')
      ]);
      
      const csv = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // Download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `diagnosticos_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      toast.success("Dados exportados com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar dados");
    }
  };



  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
          <p className="text-gray-600 mt-1">
            Visualize e analise os dados de diagnóstico de maturidade
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleAtualizarDados}
            disabled={atualizando}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${atualizando ? 'animate-spin' : ''}`} />
            Atualizar Dados
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportarCSV}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          

        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Diagnósticos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {diagnosticosQuery.data?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Score Médio</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {diagnosticosQuery.data && diagnosticosQuery.data.length > 0
                  ? Math.round(
                      diagnosticosQuery.data.reduce((acc, d) => acc + d.scoreGeral, 0) /
                        diagnosticosQuery.data.length
                    )
                  : 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Desperdício Total</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                R${" "}
                {diagnosticosQuery.data && diagnosticosQuery.data.length > 0
                  ? (
                      diagnosticosQuery.data.reduce(
                        (acc, d) => acc + (d.desperdicioMensal || 0),
                        0
                      ) / 1000
                    ).toFixed(0)
                  : 0}
                k
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Potencial Total</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                R${" "}
                {diagnosticosQuery.data && diagnosticosQuery.data.length > 0
                  ? (
                      diagnosticosQuery.data.reduce(
                        (acc, d) => acc + (d.potencialMensal || 0),
                        0
                      ) / 1000
                    ).toFixed(0)
                  : 0}
                k
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs de Relatórios */}
      <Tabs defaultValue="dados" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dados">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Dados Brutos
          </TabsTrigger>
          <TabsTrigger value="config">
            <Database className="w-4 h-4 mr-2" />
            Configuração
          </TabsTrigger>
        </TabsList>

        {/* Tab Dados Brutos */}
        <TabsContent value="dados" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Dados de Diagnósticos
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportarCSV}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Tudo
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Empresa
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Score Geral
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Desperdício
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Potencial
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosticosQuery.data && diagnosticosQuery.data.length > 0 ? (
                    diagnosticosQuery.data.map((diagnostico) => (
                      <tr key={diagnostico.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          #{diagnostico.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          Empresa #{diagnostico.empresaId}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              diagnostico.scoreGeral >= 80
                                ? "bg-green-50 text-green-700 border-green-200"
                                : diagnostico.scoreGeral >= 60
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : diagnostico.scoreGeral >= 40
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {diagnostico.scoreGeral}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-red-600 font-medium">
                          R$ {(diagnostico.desperdicioMensal || 0).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-sm text-green-600 font-medium">
                          R$ {(diagnostico.potencialMensal || 0).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(diagnostico.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        Nenhum diagnóstico encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab Configuração */}
        <TabsContent value="config" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Configuração do Banco de Dados
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Host do Banco de Dados
                </label>
                <code className="text-sm bg-white px-3 py-2 rounded border block">
                  Configurado no servidor
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  As credenciais do banco de dados são gerenciadas no servidor por segurança.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Nome do Banco
                </label>
                <code className="text-sm bg-white px-3 py-2 rounded border block">
                  datapay_enterprise
                </code>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Tabelas Disponíveis
                </label>
                <div className="space-y-2">
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    ✓ empresas
                  </code>
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    ✓ diagnosticos
                  </code>
                  <code className="text-sm bg-white px-3 py-2 rounded border block">
                    ✓ users
                  </code>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Atenção:</strong> As credenciais de acesso ao banco de dados são sensíveis.
                  Entre em contato com o administrador do sistema para obter as credenciais de leitura
                  necessárias para conectar o Looker Studio.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

