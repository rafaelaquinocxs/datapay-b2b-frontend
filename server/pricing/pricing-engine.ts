/**
 * MOTOR DE PRECIFICAÇÃO
 * Calcula custos baseado em:
 * - Volume de dados processados (GB/mês)
 * - Número de conectores
 * - Frequência de sincronização
 * - Retenção de dados
 */

export interface UsageMetrics {
  userId: string;
  month: string; // "2024-01"
  
  // Dados processados
  totalDataProcessedGB: number;
  totalRecordsProcessed: number;
  
  // Conectores
  activeConnectors: number;
  
  // Sincronizações
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  
  // Retenção
  dataRetentionDays: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyBase: number;
  
  // Limites inclusos
  includedDataGB: number;
  includedConnectors: number;
  includedSyncsPerDay: number;
  
  // Preços adicionais
  pricePerExtraGB: number;
  pricePerExtraConnector: number;
  pricePerExtraSync: number;
  
  // Features
  features: string[];
}

// Planos disponíveis
export const PRICING_PLANS: Record<string, PricingPlan> = {
  starter: {
    id: "starter",
    name: "Starter",
    monthlyBase: 99,
    
    includedDataGB: 10,
    includedConnectors: 3,
    includedSyncsPerDay: 5,
    
    pricePerExtraGB: 5,
    pricePerExtraConnector: 29,
    pricePerExtraSync: 0.5,
    
    features: [
      "Até 3 conectores",
      "10 GB de dados/mês",
      "5 sincronizações/dia",
      "Suporte por email",
      "Retenção 30 dias",
    ],
  },
  
  professional: {
    id: "professional",
    name: "Professional",
    monthlyBase: 299,
    
    includedDataGB: 100,
    includedConnectors: 15,
    includedSyncsPerDay: 50,
    
    pricePerExtraGB: 3,
    pricePerExtraConnector: 19,
    pricePerExtraSync: 0.3,
    
    features: [
      "Até 15 conectores",
      "100 GB de dados/mês",
      "50 sincronizações/dia",
      "Suporte prioritário",
      "Retenção 90 dias",
      "Alertas por email",
      "API access",
    ],
  },
  
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    monthlyBase: 999,
    
    includedDataGB: 1000,
    includedConnectors: 100,
    includedSyncsPerDay: 500,
    
    pricePerExtraGB: 1,
    pricePerExtraConnector: 9,
    pricePerExtraSync: 0.1,
    
    features: [
      "Conectores ilimitados",
      "1 TB de dados/mês",
      "500 sincronizações/dia",
      "Suporte 24/7",
      "Retenção 365 dias",
      "Webhooks",
      "API access",
      "SLA 99.9%",
      "Dedicated account manager",
    ],
  },
};

export class PricingEngine {
  /**
   * Calcular custo total do mês
   */
  static calculateMonthlyCost(plan: PricingPlan, usage: UsageMetrics): number {
    let totalCost = plan.monthlyBase;

    // Custo de dados extras
    const extraDataGB = Math.max(0, usage.totalDataProcessedGB - plan.includedDataGB);
    totalCost += extraDataGB * plan.pricePerExtraGB;

    // Custo de conectores extras
    const extraConnectors = Math.max(0, usage.activeConnectors - plan.includedConnectors);
    totalCost += extraConnectors * plan.pricePerExtraConnector;

    // Custo de sincronizações extras
    const syncsPerDay = usage.totalSyncs / 30; // Média diária
    const extraSyncsPerDay = Math.max(0, syncsPerDay - plan.includedSyncsPerDay);
    totalCost += extraSyncsPerDay * 30 * plan.pricePerExtraSync;

    return Math.round(totalCost * 100) / 100;
  }

  /**
   * Recomendar plano baseado em uso
   */
  static recommendPlan(usage: UsageMetrics): { plan: PricingPlan; reason: string } {
    // Se usar muito, recomendar Enterprise
    if (
      usage.totalDataProcessedGB > 100 ||
      usage.activeConnectors > 15 ||
      usage.totalSyncs / 30 > 50
    ) {
      return {
        plan: PRICING_PLANS.enterprise,
        reason: "Seu uso requer o plano Enterprise",
      };
    }

    // Se usar moderadamente, recomendar Professional
    if (
      usage.totalDataProcessedGB > 10 ||
      usage.activeConnectors > 3 ||
      usage.totalSyncs / 30 > 5
    ) {
      return {
        plan: PRICING_PLANS.professional,
        reason: "Seu uso requer o plano Professional",
      };
    }

    // Caso contrário, Starter
    return {
      plan: PRICING_PLANS.starter,
      reason: "Plano Starter é suficiente para seu uso",
    };
  }

  /**
   * Calcular economia ao mudar de plano
   */
  static calculateSavings(
    currentPlan: PricingPlan,
    newPlan: PricingPlan,
    usage: UsageMetrics
  ): number {
    const currentCost = this.calculateMonthlyCost(currentPlan, usage);
    const newCost = this.calculateMonthlyCost(newPlan, usage);
    return Math.round((currentCost - newCost) * 100) / 100;
  }

  /**
   * Obter breakdown de custos
   */
  static getCostBreakdown(plan: PricingPlan, usage: UsageMetrics) {
    const baseCost = plan.monthlyBase;
    const extraDataGB = Math.max(0, usage.totalDataProcessedGB - plan.includedDataGB);
    const dataCost = extraDataGB * plan.pricePerExtraGB;
    const extraConnectors = Math.max(0, usage.activeConnectors - plan.includedConnectors);
    const connectorCost = extraConnectors * plan.pricePerExtraConnector;
    const syncsPerDay = usage.totalSyncs / 30;
    const extraSyncsPerDay = Math.max(0, syncsPerDay - plan.includedSyncsPerDay);
    const syncCost = extraSyncsPerDay * 30 * plan.pricePerExtraSync;
    const totalCost = baseCost + dataCost + connectorCost + syncCost;

    return {
      baseCost: Math.round(baseCost * 100) / 100,
      dataCost: Math.round(dataCost * 100) / 100,
      connectorCost: Math.round(connectorCost * 100) / 100,
      syncCost: Math.round(syncCost * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      breakdown: [
        { label: "Plano Base", value: baseCost, percentage: (baseCost / totalCost) * 100 },
        { label: "Dados Extras", value: dataCost, percentage: (dataCost / totalCost) * 100 },
        { label: "Conectores Extras", value: connectorCost, percentage: (connectorCost / totalCost) * 100 },
        { label: "Sincronizações Extras", value: syncCost, percentage: (syncCost / totalCost) * 100 },
      ],
    };
  }

  /**
   * Estimar custo anual
   */
  static estimateAnnualCost(plan: PricingPlan, usage: UsageMetrics): number {
    const monthlyCost = this.calculateMonthlyCost(plan, usage);
    return Math.round(monthlyCost * 12 * 100) / 100;
  }

  /**
   * Calcular ROI baseado em economia de tempo
   */
  static calculateROI(
    monthlyCost: number,
    hoursAutoSaved: number,
    hourlyRate: number
  ): { roi: number; paybackMonths: number } {
    const monthlySavings = hoursAutoSaved * hourlyRate;
    const roi = ((monthlySavings - monthlyCost) / monthlyCost) * 100;
    const paybackMonths = monthlyCost / monthlySavings;

    return {
      roi: Math.round(roi * 100) / 100,
      paybackMonths: Math.round(paybackMonths * 100) / 100,
    };
  }
}

/**
 * Exemplo de uso:
 * 
 * const usage: UsageMetrics = {
 *   userId: "user-123",
 *   month: "2024-01",
 *   totalDataProcessedGB: 50,
 *   totalRecordsProcessed: 1000000,
 *   activeConnectors: 8,
 *   totalSyncs: 1200,
 *   successfulSyncs: 1150,
 *   failedSyncs: 50,
 *   dataRetentionDays: 90,
 * };
 * 
 * // Calcular custo com plano Professional
 * const cost = PricingEngine.calculateMonthlyCost(PRICING_PLANS.professional, usage);
 * console.log(`Custo mensal: R$ ${cost}`);
 * 
 * // Recomendar plano
 * const recommendation = PricingEngine.recommendPlan(usage);
 * console.log(`Recomendação: ${recommendation.plan.name} - ${recommendation.reason}`);
 * 
 * // Obter breakdown
 * const breakdown = PricingEngine.getCostBreakdown(PRICING_PLANS.professional, usage);
 * console.log(`Breakdown:`, breakdown);
 */

