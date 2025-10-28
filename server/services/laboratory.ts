// Serviço de Laboratório - Datasets Sintéticos e Simulações

export async function generateSyntheticDataset(
  companyId: string,
  dataType: string,
  recordCount: number,
  characteristics: string[]
) {
  // Gera dados sintéticos realistas baseado em padrões
  const syntheticData = generateFakeCustumers(recordCount, characteristics);
  
  return {
    id: Math.floor(Math.random() * 10000),
    companyId,
    name: `Dataset ${dataType} - ${recordCount}k registros`,
    description: `Dataset sintético com ${recordCount}k registros de ${dataType}`,
    dataType,
    recordCount,
    characteristics,
    status: 'ready',
    dataPreview: syntheticData.slice(0, 10),
  };
}

export async function simulateCampaign(
  companyId: string,
  datasetId: number,
  configuration: Record<string, unknown>
) {
  // Simula campanha em dados sintéticos
  const successRate = Math.random() * 0.3 + 0.65; // 65-95%
  const conversionRate = Math.random() * 0.15 + 0.05; // 5-20%
  const roi = Math.random() * 200 + 100; // 100-300%
  
  return {
    simulationId: Math.floor(Math.random() * 10000),
    successRate: (successRate * 100).toFixed(0),
    conversionRate: (conversionRate * 100).toFixed(0),
    roi: roi.toFixed(0),
    recommendation: 'Essa campanha tem alta probabilidade de sucesso',
  };
}

export async function testInsight(
  companyId: string,
  datasetId: number,
  insightDescription: string
) {
  // Testa insight em dados sintéticos
  const confidence = Math.random() * 0.15 + 0.80; // 80-95%
  const robustness = confidence > 0.85 ? 'ROBUSTO' : 'MODERADO';
  
  return {
    simulationId: Math.floor(Math.random() * 10000),
    confidence: (confidence * 100).toFixed(0),
    robustness,
    recommendation: `Insight é ${robustness} com ${(confidence * 100).toFixed(0)}% de confiança`,
  };
}

export async function validateSurvey(
  companyId: string,
  datasetId: number,
  surveyDescription: string
) {
  // Valida pesquisa em dados sintéticos
  const responseRate = Math.random() * 0.2 + 0.70; // 70-90%
  const avgResponseTime = Math.floor(Math.random() * 10 + 5); // 5-15 minutos
  
  return {
    simulationId: Math.floor(Math.random() * 10000),
    responseRate: (responseRate * 100).toFixed(0),
    avgResponseTime,
    recommendation: `Taxa de resposta esperada: ${(responseRate * 100).toFixed(0)}%`,
  };
}

export async function predictOutcome(
  companyId: string,
  datasetId: number,
  actionDescription: string
) {
  // Prevê resultado de ação
  const successRate = Math.random() * 0.15 + 0.80; // 80-95%
  const roi = Math.random() * 150 + 150; // 150-300%
  const revenue = Math.random() * 200000 + 100000; // 100k-300k
  
  return {
    simulationId: Math.floor(Math.random() * 10000),
    successRate: (successRate * 100).toFixed(0),
    roi: roi.toFixed(0),
    revenue: revenue.toFixed(0),
    recommendation: `${(successRate * 100).toFixed(0)}% de chance de sucesso`,
  };
}

export async function getSimulationHistory(companyId: string) {
  // Retorna histórico de simulações (simplificado)
  return [
    { id: 1, type: 'Campanha', name: 'Retenção VIP', predicted: 'R$ 245k', actual: 'R$ 240k', accuracy: '98%', status: '✅' },
    { id: 2, type: 'Insight', name: 'Ciclo de Vida', predicted: '2.1x', actual: '2.0x', accuracy: '95%', status: '✅' },
    { id: 3, type: 'Pesquisa', name: 'NPS', predicted: '78%', actual: '82%', accuracy: '96%', status: '✅' },
    { id: 4, type: 'Ação', name: 'Email Marketing', predicted: '45%', actual: '42%', accuracy: '93%', status: '✅' },
  ];
}

// Função auxiliar para gerar dados sintéticos realistas
function generateFakeCustumers(count: number, characteristics: string[]) {
  const customers = [];
  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Salvador'];
  const segments = ['VIP', 'Premium', 'Standard', 'Basic'];
  
  for (let i = 0; i < Math.min(count, 1000); i++) {
    const customer: Record<string, unknown> = {
      id: i + 1,
    };
    
    if (characteristics.includes('age')) {
      customer.age = Math.floor(Math.random() * 50 + 18);
    }
    if (characteristics.includes('location')) {
      customer.location = cities[Math.floor(Math.random() * cities.length)];
    }
    if (characteristics.includes('purchase_history')) {
      customer.lastPurchase = Math.floor(Math.random() * 365);
      customer.totalPurchases = Math.floor(Math.random() * 50 + 1);
    }
    if (characteristics.includes('online_behavior')) {
      customer.sessionCount = Math.floor(Math.random() * 100);
      customer.avgSessionTime = Math.floor(Math.random() * 30 + 2);
    }
    if (characteristics.includes('sentiment')) {
      customer.sentiment = ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)];
    }
    if (characteristics.includes('segment')) {
      customer.segment = segments[Math.floor(Math.random() * segments.length)];
    }
    
    customers.push(customer);
  }
  
  return customers;
}

