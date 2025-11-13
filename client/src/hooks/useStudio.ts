import { useState, useCallback } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

/**
 * Hook para gerenciar datasets sintéticos
 */
export function useDatasets() {
  const [isLoading, setIsLoading] = useState(false);
  const [datasets, setDatasets] = useState<any[]>([]);

  const listDatasets = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.listDatasets.query();
      if (result.success) {
        setDatasets(result.datasets);
        return result.datasets;
      }
    } catch (error) {
      console.error('Erro ao listar datasets:', error);
      toast.error('Erro ao carregar datasets');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateDataset = useCallback(async (input: {
    nome: string;
    descricao?: string;
    tipo: 'clientes' | 'transacoes' | 'comportamento' | 'pesquisa';
    quantidade: number;
    regiao?: string;
    sazonalidade?: string;
    calibracaoReal?: boolean;
    datasetRealId?: number;
  }) => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.generateDataset.mutate(input);
      if (result.success) {
        toast.success('Dataset gerado com sucesso!');
        await listDatasets(); // Recarregar lista
        return result;
      }
    } catch (error) {
      console.error('Erro ao gerar dataset:', error);
      toast.error('Erro ao gerar dataset');
    } finally {
      setIsLoading(false);
    }
  }, [listDatasets]);

  const deleteDataset = useCallback(async (datasetId: number) => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.deleteDataset.mutate({ datasetId });
      if (result.success) {
        toast.success('Dataset deletado com sucesso!');
        await listDatasets(); // Recarregar lista
        return result;
      }
    } catch (error) {
      console.error('Erro ao deletar dataset:', error);
      toast.error('Erro ao deletar dataset');
    } finally {
      setIsLoading(false);
    }
  }, [listDatasets]);

  return {
    datasets,
    isLoading,
    listDatasets,
    generateDataset,
    deleteDataset,
  };
}

/**
 * Hook para gerenciar simulações de campanhas
 */
export function useCampaignSimulations() {
  const [isLoading, setIsLoading] = useState(false);
  const [simulations, setSimulations] = useState<any[]>([]);

  const listSimulations = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.listCampaignSimulations.query();
      if (result.success) {
        setSimulations(result.simulations);
        return result.simulations;
      }
    } catch (error) {
      console.error('Erro ao listar simulações:', error);
      toast.error('Erro ao carregar simulações');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const simulateCampaign = useCallback(async (input: {
    nome: string;
    descricao?: string;
    tipo: 'email' | 'sms' | 'push' | 'web' | 'social';
    datasetId?: number;
    audiencia: number;
    taxaAbertura: number;
    taxaClique: number;
    taxaConversao: number;
    ticketMedio: number;
    custoPorContato: number;
  }) => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.simulateCampaign.mutate(input);
      if (result.success) {
        toast.success('Campanha simulada com sucesso!');
        await listSimulations(); // Recarregar lista
        return result;
      }
    } catch (error) {
      console.error('Erro ao simular campanha:', error);
      toast.error('Erro ao simular campanha');
    } finally {
      setIsLoading(false);
    }
  }, [listSimulations]);

  return {
    simulations,
    isLoading,
    listSimulations,
    simulateCampaign,
  };
}

/**
 * Hook para gerenciar simulações de pesquisas
 */
export function useSurveySimulations() {
  const [isLoading, setIsLoading] = useState(false);
  const [simulations, setSimulations] = useState<any[]>([]);

  const listSimulations = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.listSurveySimulations.query();
      if (result.success) {
        setSimulations(result.simulations);
        return result.simulations;
      }
    } catch (error) {
      console.error('Erro ao listar simulações:', error);
      toast.error('Erro ao carregar simulações');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const simulateSurvey = useCallback(async (input: {
    nome: string;
    descricao?: string;
    pesquisaId?: number;
    datasetId?: number;
    audiencia: number;
    taxaResposta: number;
    tempoMedioResposta: number;
    taxaAbandono: number;
  }) => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.simulateSurvey.mutate(input);
      if (result.success) {
        toast.success('Pesquisa simulada com sucesso!');
        await listSimulations(); // Recarregar lista
        return result;
      }
    } catch (error) {
      console.error('Erro ao simular pesquisa:', error);
      toast.error('Erro ao simular pesquisa');
    } finally {
      setIsLoading(false);
    }
  }, [listSimulations]);

  return {
    simulations,
    isLoading,
    listSimulations,
    simulateSurvey,
  };
}

/**
 * Hook para gerenciar projeções de comportamento
 */
export function useBehaviorProjections() {
  const [isLoading, setIsLoading] = useState(false);
  const [projections, setProjections] = useState<any[]>([]);

  const listProjections = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.listBehaviorProjections.query();
      if (result.success) {
        setProjections(result.projections);
        return result.projections;
      }
    } catch (error) {
      console.error('Erro ao listar projeções:', error);
      toast.error('Erro ao carregar projeções');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const projectBehavior = useCallback(async (input: {
    nome: string;
    descricao?: string;
    datasetId?: number;
    metrica: string;
    periodoHistorico: number;
    dataInicio?: Date;
    dataFim?: Date;
  }) => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.projectBehavior.mutate(input);
      if (result.success) {
        toast.success('Projeção criada com sucesso!');
        await listProjections(); // Recarregar lista
        return result;
      }
    } catch (error) {
      console.error('Erro ao criar projeção:', error);
      toast.error('Erro ao criar projeção');
    } finally {
      setIsLoading(false);
    }
  }, [listProjections]);

  return {
    projections,
    isLoading,
    listProjections,
    projectBehavior,
  };
}

/**
 * Hook para gerenciar histórico e configurações
 */
export function useStudioConfig() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);

  const getHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.getHistory.query();
      if (result.success) {
        setHistory(result.history);
        return result.history;
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      toast.error('Erro ao carregar histórico');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getConfigurations = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.getConfigurations.query();
      if (result.success) {
        setConfig(result.config);
        return result.config;
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateConfigurations = useCallback(async (input: {
    regiaoPadrao?: string;
    sazonalidadePadrao?: string;
    quantidadePadrao?: number;
    usarIAParaGerador?: boolean;
    usarIAParaSimulador?: boolean;
    usarIAParaProjecao?: boolean;
  }) => {
    try {
      setIsLoading(true);
      const result = await trpc.studio.updateConfigurations.mutate(input);
      if (result.success) {
        toast.success('Configurações atualizadas!');
        await getConfigurations(); // Recarregar
        return result;
      }
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      toast.error('Erro ao atualizar configurações');
    } finally {
      setIsLoading(false);
    }
  }, [getConfigurations]);

  return {
    history,
    config,
    isLoading,
    getHistory,
    getConfigurations,
    updateConfigurations,
  };
}

