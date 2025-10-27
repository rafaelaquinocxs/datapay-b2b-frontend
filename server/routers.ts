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
  }),
});

export type AppRouter = typeof appRouter;
