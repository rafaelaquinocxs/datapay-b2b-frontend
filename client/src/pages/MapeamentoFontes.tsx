import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Database,
  Settings,
  Loader,
} from "lucide-react";

interface FieldMapping {
  id?: number;
  sourceField: string;
  targetField: string;
  tipo: string;
  validadores: string[];
  transformacao?: string;
}

export default function MapeamentoFontes() {
  const dataSourceId = 1;
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<FieldMapping | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const { data: existingMappings } = trpc.fieldMappings.getAll.useQuery(
    { dataSourceId },
    { enabled: !!dataSourceId }
  );

  const saveMutation = trpc.fieldMappings.save.useMutation({
    onSuccess: () => {
      toast.success("Mapeamento salvo com sucesso!");
      setShowModal(false);
    },
    onError: () => {
      toast.error("Erro ao salvar mapeamento");
    },
  });

  const handleSave = async () => {
    await saveMutation.mutateAsync({
      dataSourceId,
      mappings,
    });
  };

  const handleAddMapping = () => {
    setSelectedMapping({
      sourceField: "",
      targetField: "",
      tipo: "string",
      validadores: [],
    });
    setShowModal(true);
  };

  const handleSaveMapping = () => {
    if (!selectedMapping?.sourceField || !selectedMapping?.targetField) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    if (selectedMapping.id) {
      setMappings(
        mappings.map((m) => (m.id === selectedMapping.id ? selectedMapping : m))
      );
    } else {
      setMappings([...mappings, { ...selectedMapping, id: Date.now() }]);
    }

    setShowModal(false);
    setSelectedMapping(null);
  };

  const handleRemoveMapping = (id: number | undefined) => {
    if (id) {
      setMappings(mappings.filter((m) => m.id !== id));
    }
  };

  const TIPOS = ["string", "number", "date", "boolean", "email", "phone"];
  const VALIDADORES = ["required", "unique", "email", "phone", "date", "min_length", "max_length"];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mapeamento de Campos</h1>
          <p className="text-gray-600 mt-1">
            Defina como os campos da sua fonte se mapeiam para o sistema
          </p>
        </div>
        <Button
          onClick={handleAddMapping}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Campo
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          <button className="pb-3 px-1 border-b-2 border-purple-600 text-purple-600 font-medium">
            Mapeamento
          </button>
          <button className="pb-3 px-1 text-gray-600 hover:text-gray-900">
            Preview
          </button>
          <button className="pb-3 px-1 text-gray-600 hover:text-gray-900">
            Validações
          </button>
        </div>
      </div>

      {/* Mapeamentos */}
      {mappings.length === 0 ? (
        <Card className="p-12 text-center">
          <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum mapeamento definido
          </h3>
          <p className="text-gray-600 mb-6">
            Comece adicionando os campos que deseja mapear
          </p>
          <Button
            onClick={handleAddMapping}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeiro Campo
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {mappings.map((mapping) => (
            <Card key={mapping.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Campo Origem</p>
                    <p className="font-semibold text-gray-900">
                      {mapping.sourceField}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400" />

                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Campo Destino</p>
                    <p className="font-semibold text-gray-900">
                      {mapping.targetField}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Tipo</p>
                    <Badge variant="outline">{mapping.tipo}</Badge>
                  </div>

                  {mapping.validadores.length > 0 && (
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Validadores</p>
                      <div className="flex gap-1 flex-wrap">
                        {mapping.validadores.map((v) => (
                          <Badge key={v} variant="secondary" className="text-xs">
                            {v}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedMapping(mapping);
                      setShowModal(true);
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    text-red-600
                    onClick={() => handleRemoveMapping(mapping.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Botões de Ação */}
      {mappings.length > 0 && (
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Preview de Dados
          </Button>
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            {saveMutation.isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Salvar Mapeamento
              </>
            )}
          </Button>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedMapping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedMapping.id ? "Editar" : "Adicionar"} Mapeamento
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Campo Origem
                </label>
                <input
                  type="text"
                  value={selectedMapping.sourceField}
                  onChange={(e) =>
                    setSelectedMapping({
                      ...selectedMapping,
                      sourceField: e.target.value,
                    })
                  }
                  placeholder="Ex: customer_name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Campo Destino
                </label>
                <input
                  type="text"
                  value={selectedMapping.targetField}
                  onChange={(e) =>
                    setSelectedMapping({
                      ...selectedMapping,
                      targetField: e.target.value,
                    })
                  }
                  placeholder="Ex: nome_cliente"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tipo de Dado
              </label>
              <select
                value={selectedMapping.tipo}
                onChange={(e) =>
                  setSelectedMapping({
                    ...selectedMapping,
                    tipo: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Validadores
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VALIDADORES.map((v) => (
                  <label key={v} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedMapping.validadores.includes(v)}
                      onChange={(e) => {
                        const newValidadores = e.target.checked
                          ? [...selectedMapping.validadores, v]
                          : selectedMapping.validadores.filter((x) => x !== v);
                        setSelectedMapping({
                          ...selectedMapping,
                          validadores: newValidadores,
                        });
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedMapping(null);
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveMapping}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Salvar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

