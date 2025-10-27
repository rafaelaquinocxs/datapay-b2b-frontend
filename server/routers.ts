import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  diagnostico: router({
    salvar: publicProcedure
      .input(
        z.object({
          empresa: z.object({
            nome: z.string().optional(),
            email: z.string().optional(),
            telefone: z.string().optional(),
            clientesAtivos: z.number(),
            clientesInativos: z.number().optional(),
            investimentoMarketing: z.number(),
            ticketMedio: z.number(),
            taxaRecompra: z.number().optional(),
          }),
          diagnostico: z.object({
            respostas: z.record(z.string(), z.number()),
            scoreGeral: z.number(),
            scoreGovernanca: z.number(),
            scoreIntegracao: z.number(),
            scoreAnalitica: z.number(),
            scoreDecisao: z.number(),
            scoreRoi: z.number(),
            desperdicioMensal: z.number(),
            potencialMensal: z.number(),
            impactoAnual: z.number(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        // Criar empresa
        const empresaId = await db.createEmpresa({
          nome: input.empresa.nome ?? null,
          email: input.empresa.email ?? null,
          telefone: input.empresa.telefone ?? null,
          clientesAtivos: input.empresa.clientesAtivos,
          clientesInativos: input.empresa.clientesInativos ?? null,
          investimentoMarketing: input.empresa.investimentoMarketing,
          ticketMedio: input.empresa.ticketMedio,
          taxaRecompra: input.empresa.taxaRecompra ?? null,
        });

        // Criar diagnóstico
        const diagnosticoId = await db.createDiagnostico({
          empresaId: Number(empresaId),
          respostas: input.diagnostico.respostas,
          scoreGeral: input.diagnostico.scoreGeral,
          scoreGovernanca: input.diagnostico.scoreGovernanca,
          scoreIntegracao: input.diagnostico.scoreIntegracao,
          scoreAnalitica: input.diagnostico.scoreAnalitica,
          scoreDecisao: input.diagnostico.scoreDecisao,
          scoreRoi: input.diagnostico.scoreRoi,
          desperdicioMensal: input.diagnostico.desperdicioMensal,
          potencialMensal: input.diagnostico.potencialMensal,
          impactoAnual: input.diagnostico.impactoAnual,
        });

        return {
          success: true,
          empresaId,
          diagnosticoId,
        };
      }),

    listar: publicProcedure.query(async () => {
      const diagnosticos = await db.getAllDiagnosticos();
      return diagnosticos;
    }),

    buscarPorId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const diagnostico = await db.getDiagnosticoById(input.id);
        return diagnostico;
      }),

    exportar: publicProcedure
      .input(
        z.object({
          empresaId: z.number().optional(),
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        // Buscar todos os diagnósticos
        let diagnosticos = await db.getAllDiagnosticos();

        // Aplicar filtros se fornecidos
        if (input?.empresaId) {
          diagnosticos = diagnosticos.filter(d => d.empresaId === input.empresaId);
        }

        if (input?.startDate) {
          const start = new Date(input.startDate);
          diagnosticos = diagnosticos.filter(d => new Date(d.createdAt) >= start);
        }

        if (input?.endDate) {
          const end = new Date(input.endDate);
          diagnosticos = diagnosticos.filter(d => new Date(d.createdAt) <= end);
        }

        // Buscar dados das empresas
        const empresas = await db.getAllEmpresas();
        const empresasMap = new Map(empresas.map(e => [e.id, e]));

        // Enriquecer dados
        const dadosEnriquecidos = diagnosticos.map(d => {
          const empresa = empresasMap.get(d.empresaId);
          
          const getNivelMaturidade = (score: number): string => {
            if (score >= 80) return 'Avançado';
            if (score >= 60) return 'Intermediário';
            if (score >= 40) return 'Básico';
            return 'Inicial';
          };

          return {
            diagnosticoId: d.id,
            empresaId: d.empresaId,
            nomeEmpresa: empresa?.nome || `Empresa #${d.empresaId}`,
            emailEmpresa: empresa?.email,
            clientesAtivos: empresa?.clientesAtivos,
            investimentoMarketing: empresa?.investimentoMarketing,
            ticketMedio: empresa?.ticketMedio,
            scoreGeral: d.scoreGeral,
            scoreGovernanca: d.scoreGovernanca,
            scoreIntegracao: d.scoreIntegracao,
            scoreAnalitica: d.scoreAnalitica,
            scoreDecisao: d.scoreDecisao,
            scoreRoi: d.scoreRoi,
            desperdicioMensal: d.desperdicioMensal,
            potencialMensal: d.potencialMensal,
            impactoAnual: d.impactoAnual,
            nivelMaturidade: getNivelMaturidade(d.scoreGeral),
            dataDiagnostico: d.createdAt,
          };
        });

        return {
          success: true,
          total: dadosEnriquecidos.length,
          data: dadosEnriquecidos,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
