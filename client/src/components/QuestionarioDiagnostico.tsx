import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Pergunta {
  id: number;
  dimensao: string;
  pergunta: string;
  opcoes: { valor: number; texto: string }[];
}

interface DadosEmpresa {
  clientesAtivos: string;
  clientesInativos: string;
  investimentoMarketing: string;
  ticketMedio: string;
  taxaRecompra: string;
}

const perguntas: Pergunta[] = [
  // Dimensão 1: Governança e Qualidade dos Dados
  {
    id: 1,
    dimensao: "Governança e Qualidade",
    pergunta:
      "Os dados da sua empresa são confiáveis, padronizados e facilmente acessíveis?",
    opcoes: [
      { valor: 0, texto: "Não, dados inconsistentes e difíceis de acessar" },
      { valor: 25, texto: "Parcialmente, alguns dados são confiáveis" },
      { valor: 50, texto: "Sim, maioria dos dados é confiável" },
      { valor: 75, texto: "Sim, dados bem padronizados e acessíveis" },
      { valor: 100, texto: "Excelente governança com processos automatizados" },
    ],
  },
  {
    id: 2,
    dimensao: "Governança e Qualidade",
    pergunta: "Existe uma pessoa ou equipe responsável pela qualidade dos dados?",
    opcoes: [
      { valor: 0, texto: "Não existe responsável definido" },
      { valor: 33, texto: "Responsabilidade informal ou compartilhada" },
      { valor: 66, texto: "Sim, há um responsável mas sem equipe dedicada" },
      { valor: 100, texto: "Sim, equipe dedicada de governança de dados" },
    ],
  },
  {
    id: 3,
    dimensao: "Governança e Qualidade",
    pergunta: "Com que frequência os dados são auditados para garantir qualidade?",
    opcoes: [
      { valor: 0, texto: "Nunca ou raramente" },
      { valor: 33, texto: "Apenas quando há problemas" },
      { valor: 66, texto: "Trimestralmente ou semestralmente" },
      { valor: 100, texto: "Mensalmente ou em tempo real" },
    ],
  },
  {
    id: 4,
    dimensao: "Governança e Qualidade",
    pergunta: "Os dados de clientes estão duplicados ou desatualizados?",
    opcoes: [
      { valor: 0, texto: "Sim, muitas duplicatas e dados antigos" },
      { valor: 33, texto: "Algumas duplicatas, mas gerenciáveis" },
      { valor: 66, texto: "Poucas duplicatas, dados relativamente atualizados" },
      { valor: 100, texto: "Não, dados únicos e sempre atualizados" },
    ],
  },

  // Dimensão 2: Integração de Fontes
  {
    id: 5,
    dimensao: "Integração de Fontes",
    pergunta: "Quantas fontes de dados diferentes a empresa utiliza?",
    opcoes: [
      { valor: 0, texto: "1-2 fontes (ex: apenas planilhas)" },
      { valor: 33, texto: "3-5 fontes (ex: CRM + ERP)" },
      { valor: 66, texto: "6-10 fontes (CRM, ERP, e-commerce, etc.)" },
      { valor: 100, texto: "10+ fontes totalmente integradas" },
    ],
  },
  {
    id: 6,
    dimensao: "Integração de Fontes",
    pergunta: "Os dados de diferentes sistemas estão integrados?",
    opcoes: [
      { valor: 0, texto: "Não, cada sistema é isolado" },
      { valor: 33, texto: "Integração manual via planilhas" },
      { valor: 66, texto: "Integração parcial automatizada" },
      { valor: 100, texto: "Totalmente integrados em tempo real" },
    ],
  },
  {
    id: 7,
    dimensao: "Integração de Fontes",
    pergunta:
      "É possível ter uma visão unificada do cliente em todos os canais?",
    opcoes: [
      { valor: 0, texto: "Não, dados fragmentados por canal" },
      { valor: 33, texto: "Parcialmente, com muito esforço manual" },
      { valor: 66, texto: "Sim, mas com algum atraso" },
      { valor: 100, texto: "Sim, visão 360º em tempo real" },
    ],
  },
  {
    id: 8,
    dimensao: "Integração de Fontes",
    pergunta: "Dados de campanhas de marketing estão conectados com vendas?",
    opcoes: [
      { valor: 0, texto: "Não, totalmente separados" },
      { valor: 33, texto: "Conexão manual mensal" },
      { valor: 66, texto: "Conexão semanal automatizada" },
      { valor: 100, texto: "Conexão em tempo real com atribuição clara" },
    ],
  },

  // Dimensão 3: Capacidade Analítica
  {
    id: 9,
    dimensao: "Capacidade Analítica",
    pergunta: "Que tipo de análise de dados a empresa realiza?",
    opcoes: [
      { valor: 0, texto: "Apenas relatórios estáticos mensais" },
      { valor: 33, texto: "Dashboards básicos semanais" },
      { valor: 66, texto: "Dashboards interativos com BI" },
      { valor: 100, texto: "Análises preditivas com IA/Machine Learning" },
    ],
  },
  {
    id: 10,
    dimensao: "Capacidade Analítica",
    pergunta: "A empresa consegue prever comportamento de clientes?",
    opcoes: [
      { valor: 0, texto: "Não, apenas análises retrospectivas" },
      { valor: 33, texto: "Previsões básicas baseadas em histórico" },
      { valor: 66, texto: "Modelos preditivos simples" },
      { valor: 100, texto: "IA avançada para predição de churn, CLV, etc." },
    ],
  },
  {
    id: 11,
    dimensao: "Capacidade Analítica",
    pergunta: "Quanto tempo leva para gerar um relatório importante?",
    opcoes: [
      { valor: 0, texto: "Mais de 1 semana" },
      { valor: 33, texto: "2-5 dias" },
      { valor: 66, texto: "1 dia ou menos" },
      { valor: 100, texto: "Instantâneo (dashboards em tempo real)" },
    ],
  },
  {
    id: 12,
    dimensao: "Capacidade Analítica",
    pergunta: "A empresa utiliza segmentação de clientes?",
    opcoes: [
      { valor: 0, texto: "Não, todos os clientes são tratados igual" },
      { valor: 33, texto: "Segmentação básica (ex: B2B vs B2C)" },
      { valor: 66, texto: "Segmentação por comportamento e valor" },
      { valor: 100, texto: "Micro-segmentação dinâmica com IA" },
    ],
  },

  // Dimensão 4: Tomada de Decisão Baseada em Dados
  {
    id: 13,
    dimensao: "Tomada de Decisão",
    pergunta: "As decisões estratégicas são baseadas em dados ou intuição?",
    opcoes: [
      { valor: 0, texto: "Principalmente intuição e experiência" },
      { valor: 33, texto: "Mix de intuição e alguns dados" },
      { valor: 66, texto: "Maioria das decisões baseadas em dados" },
      { valor: 100, texto: "100% data-driven com testes A/B constantes" },
    ],
  },
  {
    id: 14,
    dimensao: "Tomada de Decisão",
    pergunta: "A liderança tem acesso fácil a métricas importantes?",
    opcoes: [
      { valor: 0, texto: "Não, precisa solicitar relatórios" },
      { valor: 33, texto: "Acesso semanal via email" },
      { valor: 66, texto: "Dashboard acessível a qualquer momento" },
      { valor: 100, texto: "Dashboards mobile em tempo real" },
    ],
  },
  {
    id: 15,
    dimensao: "Tomada de Decisão",
    pergunta: "A empresa testa hipóteses antes de grandes investimentos?",
    opcoes: [
      { valor: 0, texto: "Não, decisões são tomadas sem testes" },
      { valor: 33, texto: "Testes ocasionais" },
      { valor: 66, texto: "Testes frequentes em campanhas" },
      { valor: 100, texto: "Cultura de experimentação com A/B tests constantes" },
    ],
  },
  {
    id: 16,
    dimensao: "Tomada de Decisão",
    pergunta: "Existe uma cultura de questionamento baseado em dados?",
    opcoes: [
      { valor: 0, texto: "Não, decisões são aceitas sem questionamento" },
      { valor: 33, texto: "Algumas pessoas questionam com dados" },
      { valor: 66, texto: "Maioria da equipe usa dados para argumentar" },
      { valor: 100, texto: "Cultura forte de data-driven em todos os níveis" },
    ],
  },

  // Dimensão 5: ROI em Dados
  {
    id: 17,
    dimensao: "ROI em Dados",
    pergunta: "A empresa consegue medir o impacto de campanhas de marketing?",
    opcoes: [
      { valor: 0, texto: "Não, sem visibilidade de ROI" },
      { valor: 33, texto: "ROI aproximado de algumas campanhas" },
      { valor: 66, texto: "ROI detalhado da maioria das campanhas" },
      { valor: 100, texto: "Atribuição multi-touch em tempo real" },
    ],
  },
  {
    id: 18,
    dimensao: "ROI em Dados",
    pergunta: "A empresa sabe quanto custa adquirir um novo cliente (CAC)?",
    opcoes: [
      { valor: 0, texto: "Não sabemos o CAC" },
      { valor: 33, texto: "CAC estimado anualmente" },
      { valor: 66, texto: "CAC calculado mensalmente por canal" },
      { valor: 100, texto: "CAC em tempo real com otimização automática" },
    ],
  },
  {
    id: 19,
    dimensao: "ROI em Dados",
    pergunta: "A empresa consegue prever o valor de vida do cliente (LTV)?",
    opcoes: [
      { valor: 0, texto: "Não calculamos LTV" },
      { valor: 33, texto: "LTV básico baseado em histórico" },
      { valor: 66, texto: "LTV segmentado por tipo de cliente" },
      { valor: 100, texto: "LTV preditivo com IA para cada cliente" },
    ],
  },
  {
    id: 20,
    dimensao: "ROI em Dados",
    pergunta: "Há clareza sobre quanto os dados geram de receita?",
    opcoes: [
      { valor: 0, texto: "Não, dados são vistos apenas como custo" },
      { valor: 33, texto: "Alguns insights geram ações pontuais" },
      { valor: 66, texto: "Dados impactam decisões que geram receita" },
      {
        valor: 100,
        texto: "ROI claro de dados com aumento mensurável de receita",
      },
    ],
  },
];

interface QuestionarioDiagnosticoProps {
  onConcluir: (respostas: Record<number, number>, dadosEmpresa: DadosEmpresa) => void;
}

export default function QuestionarioDiagnostico({
  onConcluir,
}: QuestionarioDiagnosticoProps) {
  const [etapa, setEtapa] = useState<"dados" | "questionario">("dados");
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [respostaAtual, setRespostaAtual] = useState<number | null>(null);

  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    clientesAtivos: "",
    clientesInativos: "",
    investimentoMarketing: "",
    ticketMedio: "",
    taxaRecompra: "",
  });

  const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
  const pergunta = perguntas[perguntaAtual];

  const handleProximaDados = () => {
    // Validar se todos os campos foram preenchidos
    if (
      !dadosEmpresa.clientesAtivos ||
      !dadosEmpresa.investimentoMarketing ||
      !dadosEmpresa.ticketMedio
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    setEtapa("questionario");
  };

  const handleProxima = () => {
    if (respostaAtual === null) {
      alert("Por favor, selecione uma resposta");
      return;
    }

    const novasRespostas = { ...respostas, [pergunta.id]: respostaAtual };
    setRespostas(novasRespostas);

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setRespostaAtual(null);
    } else {
      // Concluído
      onConcluir(novasRespostas, dadosEmpresa);
    }
  };

  const handleAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
      setRespostaAtual(respostas[perguntas[perguntaAtual - 1].id] || null);
    } else {
      setEtapa("dados");
    }
  };

  if (etapa === "dados") {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dados da Empresa
              </h2>
              <p className="text-gray-600">
                Precisamos de algumas informações para calcular o potencial de
                ROI
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="clientesAtivos" className="text-sm font-medium">
                  Número de clientes ativos *
                </Label>
                <Input
                  id="clientesAtivos"
                  type="number"
                  placeholder="Ex: 50000"
                  value={dadosEmpresa.clientesAtivos}
                  onChange={(e) =>
                    setDadosEmpresa({
                      ...dadosEmpresa,
                      clientesAtivos: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="clientesInativos"
                  className="text-sm font-medium"
                >
                  Número de clientes inativos (opcional)
                </Label>
                <Input
                  id="clientesInativos"
                  type="number"
                  placeholder="Ex: 15000"
                  value={dadosEmpresa.clientesInativos}
                  onChange={(e) =>
                    setDadosEmpresa({
                      ...dadosEmpresa,
                      clientesInativos: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="investimentoMarketing"
                  className="text-sm font-medium"
                >
                  Investimento mensal em marketing (R$) *
                </Label>
                <Input
                  id="investimentoMarketing"
                  type="number"
                  placeholder="Ex: 500000"
                  value={dadosEmpresa.investimentoMarketing}
                  onChange={(e) =>
                    setDadosEmpresa({
                      ...dadosEmpresa,
                      investimentoMarketing: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="ticketMedio" className="text-sm font-medium">
                  Ticket médio de venda (R$) *
                </Label>
                <Input
                  id="ticketMedio"
                  type="number"
                  placeholder="Ex: 250"
                  value={dadosEmpresa.ticketMedio}
                  onChange={(e) =>
                    setDadosEmpresa({
                      ...dadosEmpresa,
                      ticketMedio: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="taxaRecompra" className="text-sm font-medium">
                  Taxa de recompra (%) - opcional
                </Label>
                <Input
                  id="taxaRecompra"
                  type="number"
                  placeholder="Ex: 35"
                  value={dadosEmpresa.taxaRecompra}
                  onChange={(e) =>
                    setDadosEmpresa({
                      ...dadosEmpresa,
                      taxaRecompra: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleProximaDados}
              >
                Continuar para Questionário
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-purple-100 text-purple-700">
              {pergunta.dimensao}
            </Badge>
            <span className="text-sm text-gray-600">
              Pergunta {perguntaAtual + 1} de {perguntas.length}
            </span>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>

        {/* Pergunta */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {pergunta.pergunta}
          </h2>

          <RadioGroup
            value={respostaAtual?.toString()}
            onValueChange={(value) => setRespostaAtual(parseInt(value))}
          >
            <div className="space-y-3">
              {pergunta.opcoes.map((opcao) => (
                <div
                  key={opcao.valor}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    respostaAtual === opcao.valor
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setRespostaAtual(opcao.valor)}
                >
                  <RadioGroupItem
                    value={opcao.valor.toString()}
                    id={`opcao-${opcao.valor}`}
                  />
                  <Label
                    htmlFor={`opcao-${opcao.valor}`}
                    className="flex-1 cursor-pointer text-gray-900"
                  >
                    {opcao.texto}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Navegação */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleAnterior}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleProxima}
            disabled={respostaAtual === null}
          >
            {perguntaAtual < perguntas.length - 1
              ? "Próxima"
              : "Ver Resultado"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

