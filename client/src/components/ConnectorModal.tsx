import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Clock, ExternalLink, Copy, Check } from "lucide-react";

interface ConnectorGuide {
  title: string;
  description: string;
  steps: Array<{
    number: number;
    title: string;
    description: string;
    image?: string;
  }>;
  credentialFields: Array<{
    name: string;
    label: string;
    type: "text" | "password" | "email" | "url";
    placeholder: string;
    required: boolean;
    help?: string;
  }>;
  documentationUrl: string;
}

const CONNECTOR_GUIDES: { [key: string]: ConnectorGuide } = {
  totvs: {
    title: "TOTVS Protheus",
    description: "Conecte sua conta TOTVS para sincronizar dados de ERP",
    steps: [
      {
        number: 1,
        title: "Acesse o Portal TOTVS",
        description: "Faça login em https://api.totvs.com.br com suas credenciais de administrador",
      },
      {
        number: 2,
        title: "Crie uma Aplicação",
        description: "Vá para Configurações > Aplicações > Nova Aplicação",
      },
      {
        number: 3,
        title: "Configure OAuth",
        description: "Defina a URL de callback como: https://datapay.com/auth/callback",
      },
      {
        number: 4,
        title: "Copie as Credenciais",
        description: "Copie o Client ID e Client Secret gerados",
      },
    ],
    credentialFields: [
      {
        name: "clientId",
        label: "Client ID",
        type: "text",
        placeholder: "Cole o Client ID aqui",
        required: true,
        help: "Encontre em Aplicações > Detalhes",
      },
      {
        name: "clientSecret",
        label: "Client Secret",
        type: "password",
        placeholder: "Cole o Client Secret aqui",
        required: true,
        help: "Mantenha seguro! Não compartilhe com ninguém",
      },
    ],
    documentationUrl: "https://api.totvs.com.br/docs",
  },

  sap: {
    title: "SAP S/4HANA",
    description: "Conecte sua conta SAP para sincronizar dados de ERP",
    steps: [
      {
        number: 1,
        title: "Acesse o SAP Business Accelerator Hub",
        description: "Faça login em https://api.sap.com com suas credenciais",
      },
      {
        number: 2,
        title: "Crie uma Aplicação",
        description: "Vá para Minha Conta > Aplicações > Registrar Aplicação",
      },
      {
        number: 3,
        title: "Configure as Permissões",
        description: "Selecione as APIs necessárias (Business Partners, Materials, etc)",
      },
      {
        number: 4,
        title: "Obtenha as Credenciais",
        description: "Copie o Client ID e Client Secret",
      },
    ],
    credentialFields: [
      {
        name: "clientId",
        label: "Client ID",
        type: "text",
        placeholder: "Cole o Client ID aqui",
        required: true,
      },
      {
        name: "clientSecret",
        label: "Client Secret",
        type: "password",
        placeholder: "Cole o Client Secret aqui",
        required: true,
      },
    ],
    documentationUrl: "https://api.sap.com/docs",
  },

  salesforce: {
    title: "Salesforce",
    description: "Conecte sua conta Salesforce para sincronizar contatos, deals e campanhas",
    steps: [
      {
        number: 1,
        title: "Acesse Salesforce Setup",
        description: "Faça login em https://login.salesforce.com e vá para Setup",
      },
      {
        number: 2,
        title: "Crie uma Aplicação Conectada",
        description: "Vá para Apps > App Manager > Nova Aplicação Conectada",
      },
      {
        number: 3,
        title: "Configure OAuth",
        description: "Ative OAuth e defina Callback URL: https://datapay.com/auth/callback",
      },
      {
        number: 4,
        title: "Copie as Credenciais",
        description: "Copie Consumer Key e Consumer Secret",
      },
    ],
    credentialFields: [
      {
        name: "clientId",
        label: "Consumer Key",
        type: "text",
        placeholder: "Cole o Consumer Key aqui",
        required: true,
      },
      {
        name: "clientSecret",
        label: "Consumer Secret",
        type: "password",
        placeholder: "Cole o Consumer Secret aqui",
        required: true,
      },
    ],
    documentationUrl: "https://developer.salesforce.com/docs",
  },

  hubspot: {
    title: "HubSpot",
    description: "Conecte sua conta HubSpot para sincronizar contatos, deals e campanhas",
    steps: [
      {
        number: 1,
        title: "Acesse HubSpot",
        description: "Faça login em https://app.hubspot.com",
      },
      {
        number: 2,
        title: "Vá para Configurações",
        description: "Clique no ícone de engrenagem > Configurações",
      },
      {
        number: 3,
        title: "Crie uma Chave de API",
        description: "Vá para Integrações > Chaves de API > Criar chave",
      },
      {
        number: 4,
        title: "Copie a Chave",
        description: "Copie a chave de API gerada",
      },
    ],
    credentialFields: [
      {
        name: "apiKey",
        label: "API Key",
        type: "password",
        placeholder: "Cole a chave de API aqui",
        required: true,
        help: "Encontre em Integrações > Chaves de API",
      },
    ],
    documentationUrl: "https://developers.hubspot.com/docs/api",
  },

  stripe: {
    title: "Stripe",
    description: "Conecte sua conta Stripe para sincronizar transações e clientes",
    steps: [
      {
        number: 1,
        title: "Acesse Stripe Dashboard",
        description: "Faça login em https://dashboard.stripe.com",
      },
      {
        number: 2,
        title: "Vá para Configurações",
        description: "Clique em Configurações > Chaves de API",
      },
      {
        number: 3,
        title: "Copie a Chave Secreta",
        description: "Copie a Chave Secreta (não a Chave Publicável)",
      },
      {
        number: 4,
        title: "Cole aqui",
        description: "Cole a chave no campo abaixo",
      },
    ],
    credentialFields: [
      {
        name: "apiKey",
        label: "Chave Secreta",
        type: "password",
        placeholder: "sk_live_...",
        required: true,
        help: "Comece com sk_live_ ou sk_test_",
      },
    ],
    documentationUrl: "https://stripe.com/docs/keys",
  },

  slack: {
    title: "Slack",
    description: "Conecte seu workspace Slack para sincronizar mensagens e usuários",
    steps: [
      {
        number: 1,
        title: "Acesse Slack API",
        description: "Vá para https://api.slack.com/apps",
      },
      {
        number: 2,
        title: "Crie uma Aplicação",
        description: "Clique em 'Create New App' > 'From scratch'",
      },
      {
        number: 3,
        title: "Configure OAuth",
        description: "Vá para OAuth & Permissions e defina Redirect URL",
      },
      {
        number: 4,
        title: "Copie o Bot Token",
        description: "Copie o Bot User OAuth Token",
      },
    ],
    credentialFields: [
      {
        name: "botToken",
        label: "Bot Token",
        type: "password",
        placeholder: "xoxb-...",
        required: true,
        help: "Comece com xoxb-",
      },
    ],
    documentationUrl: "https://api.slack.com/docs",
  },

  jira: {
    title: "Jira",
    description: "Conecte sua conta Jira para sincronizar issues e sprints",
    steps: [
      {
        number: 1,
        title: "Acesse Jira",
        description: "Faça login em seu Jira Cloud",
      },
      {
        number: 2,
        title: "Crie um Token de API",
        description: "Vá para Configurações > Segurança > Tokens de API > Criar token",
      },
      {
        number: 3,
        title: "Copie o Token",
        description: "Copie o token gerado",
      },
      {
        number: 4,
        title: "Cole aqui",
        description: "Cole o token e seu email de login",
      },
    ],
    credentialFields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "seu.email@empresa.com",
        required: true,
      },
      {
        name: "apiToken",
        label: "Token de API",
        type: "password",
        placeholder: "Cole o token aqui",
        required: true,
      },
    ],
    documentationUrl: "https://developer.atlassian.com/cloud/jira/rest/",
  },

  aws: {
    title: "AWS",
    description: "Conecte sua conta AWS para sincronizar recursos e métricas",
    steps: [
      {
        number: 1,
        title: "Acesse AWS Console",
        description: "Faça login em https://console.aws.amazon.com",
      },
      {
        number: 2,
        title: "Crie um Usuário IAM",
        description: "Vá para IAM > Usuários > Criar usuário",
      },
      {
        number: 3,
        title: "Configure Permissões",
        description: "Adicione permissões para EC2, S3, RDS, CloudWatch",
      },
      {
        number: 4,
        title: "Crie Chaves de Acesso",
        description: "Vá para Credenciais de segurança > Chaves de acesso",
      },
    ],
    credentialFields: [
      {
        name: "accessKeyId",
        label: "Access Key ID",
        type: "text",
        placeholder: "AKIA...",
        required: true,
      },
      {
        name: "secretAccessKey",
        label: "Secret Access Key",
        type: "password",
        placeholder: "Cole a chave secreta aqui",
        required: true,
      },
      {
        name: "region",
        label: "Região",
        type: "text",
        placeholder: "us-east-1",
        required: true,
        help: "Ex: us-east-1, eu-west-1",
      },
    ],
    documentationUrl: "https://docs.aws.amazon.com/",
  },

  azure: {
    title: "Azure",
    description: "Conecte sua conta Azure para sincronizar VMs e databases",
    steps: [
      {
        number: 1,
        title: "Acesse Azure Portal",
        description: "Faça login em https://portal.azure.com",
      },
      {
        number: 2,
        title: "Registre uma Aplicação",
        description: "Vá para Azure AD > Registros de aplicativo > Novo registro",
      },
      {
        number: 3,
        title: "Configure Permissões",
        description: "Adicione permissões para ler recursos",
      },
      {
        number: 4,
        title: "Crie um Segredo",
        description: "Vá para Certificados e segredos > Novo segredo do cliente",
      },
    ],
    credentialFields: [
      {
        name: "subscriptionId",
        label: "Subscription ID",
        type: "text",
        placeholder: "Cole o Subscription ID",
        required: true,
      },
      {
        name: "tenantId",
        label: "Tenant ID",
        type: "text",
        placeholder: "Cole o Tenant ID",
        required: true,
      },
      {
        name: "clientId",
        label: "Client ID",
        type: "text",
        placeholder: "Cole o Client ID",
        required: true,
      },
      {
        name: "clientSecret",
        label: "Client Secret",
        type: "password",
        placeholder: "Cole o Client Secret",
        required: true,
      },
    ],
    documentationUrl: "https://docs.microsoft.com/azure/",
  },
};

interface ConnectorModalProps {
  isOpen: boolean;
  connectorId: string;
  connectorName: string;
  onClose: () => void;
  onConnect: (credentials: Record<string, string>) => Promise<void>;
}

export function ConnectorModal({
  isOpen,
  connectorId,
  connectorName,
  onClose,
  onConnect,
}: ConnectorModalProps) {
  const [step, setStep] = useState<"guide" | "credentials" | "success">("guide");
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const guide = CONNECTOR_GUIDES[connectorId];

  if (!guide) {
    return null;
  }

  const handleConnect = async () => {
    setLoading(true);
    setError(null);

    try {
      await onConnect(credentials);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{guide.title}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={step} onValueChange={(v) => setStep(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guide" disabled={step === "success"}>
              <span className="flex items-center gap-2">
                <span className="text-sm">1. Guia</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="credentials" disabled={step === "guide"}>
              <span className="flex items-center gap-2">
                <span className="text-sm">2. Credenciais</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="success" disabled={step !== "success"}>
              <span className="flex items-center gap-2">
                <span className="text-sm">3. Sucesso</span>
              </span>
            </TabsTrigger>
          </TabsList>

          {/* GUIA */}
          <TabsContent value="guide" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">{guide.description}</p>

            <div className="space-y-4">
              {guide.steps.map((step) => (
                <div key={step.number} className="flex gap-4 p-4 border rounded-lg bg-card">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => window.open(guide.documentationUrl, "_blank")}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Documentação
              </Button>
              <Button onClick={() => setStep("credentials")} className="flex-1">
                Próximo: Credenciais
              </Button>
            </div>
          </TabsContent>

          {/* CREDENCIAIS */}
          <TabsContent value="credentials" className="space-y-4 mt-4">
            <div className="space-y-4">
              {guide.credentialFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={credentials[field.name] || ""}
                    onChange={(e) =>
                      setCredentials({ ...credentials, [field.name]: e.target.value })
                    }
                    className="text-sm"
                  />
                  {field.help && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {field.help}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => setStep("guide")} className="flex-1">
                Voltar
              </Button>
              <Button onClick={handleConnect} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  "Conectar"
                )}
              </Button>
            </div>
          </TabsContent>

          {/* SUCESSO */}
          <TabsContent value="success" className="space-y-4 mt-4">
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Conectado com Sucesso!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {connectorName} foi conectado e começará a sincronizar dados em breve.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left mb-6">
                <p className="text-sm font-medium text-green-900 mb-2">Próximas etapas:</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✓ Dados serão sincronizados a cada hora</li>
                  <li>✓ Você receberá alertas de erros por email</li>
                  <li>✓ Histórico completo disponível em "Meus Dados"</li>
                </ul>
              </div>

              <Button onClick={onClose} className="w-full">
                Fechar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default ConnectorModal;

