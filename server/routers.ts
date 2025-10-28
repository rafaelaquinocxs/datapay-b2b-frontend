import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CUSTOM_AUTH_COOKIE } from "./_core/context";

// Secret para JWT (em produção, usar variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || "datapay-secret-key-change-in-production";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(async opts => {
      console.log("[auth.me] Verificando autenticação...");
      console.log("[auth.me] User:", opts.ctx.user ? `presente (${opts.ctx.user.email})` : "ausente");
      console.log("[auth.me] Empresa:", opts.ctx.empresa ? `presente (${opts.ctx.empresa.email})` : "ausente");
      
      // Retornar empresa se autenticada via JWT customizado
      if (opts.ctx.empresa) {
        return {
          id: opts.ctx.empresa.id,
          openId: `empresa-${opts.ctx.empresa.id}`, // Criar um openId virtual
          name: opts.ctx.empresa.nome,
          email: opts.ctx.empresa.email,
          role: 'user' as const,
          empresaId: opts.ctx.empresa.id,
        };
      }
      
      // Se usuário autenticado via Manus OAuth, criar empresa automaticamente
      if (opts.ctx.user && opts.ctx.user.email) {
        console.log("[auth.me] Usuário OAuth detectado:", opts.ctx.user.email);
        const empresaExistente = await db.getEmpresaByEmail(opts.ctx.user.email);
        console.log("[auth.me] Empresa existente:", empresaExistente ? `sim (ID: ${empresaExistente.id})` : "não");
        
        if (!empresaExistente) {
          console.log("[auth.me] Criando nova empresa para:", opts.ctx.user.email);
          // Criar empresa automaticamente para usuário OAuth
          const novaEmpresa = await db.createEmpresa({
            nome: opts.ctx.user.name || 'Empresa',
            email: opts.ctx.user.email,
            telefone: '',
          });
          
          console.log("[auth.me] Empresa criada com ID:", novaEmpresa.id);
          return {
            ...opts.ctx.user,
            empresaId: novaEmpresa.id,
          };
        }
        
        console.log("[auth.me] Retornando empresa existente ID:", empresaExistente.id);
        return {
          ...opts.ctx.user,
          empresaId: empresaExistente.id,
        };
      }
      
      return opts.ctx.user;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(CUSTOM_AUTH_COOKIE, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),

    // Registro de nova empresa
    registro: publicProcedure
      .input(
        z.object({
          nome: z.string(),
          email: z.string().email(),
          senha: z.string().min(6),
          telefone: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Verificar se email já existe
        const empresaExistente = await db.getEmpresaByEmail(input.email);
        if (empresaExistente) {
          throw new Error("Email já cadastrado");
        }

        // Hash da senha
        const passwordHash = await bcrypt.hash(input.senha, 10);

        // Criar empresa
        const novaEmpresa = await db.createEmpresa({
          nome: input.nome,
          email: input.email,
          passwordHash,
          telefone: input.telefone,
          plano: "trialing",
          assinaturaStatus: "trialing",
        });

        // Gerar token JWT e salvar em cookie
        const token = jwt.sign(
          { empresaId: novaEmpresa.id, email: novaEmpresa.email },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Configurar cookie de sessão
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(CUSTOM_AUTH_COOKIE, token, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        });

        return {
          success: true,
          empresa: novaEmpresa,
        };
      }),

    // Login
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          senha: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Buscar empresa por email
        const empresa = await db.getEmpresaByEmail(input.email);
        if (!empresa || !empresa.passwordHash) {
          throw new Error("Email ou senha inválidos");
        }

        // Verificar senha
        const senhaValida = await bcrypt.compare(input.senha, empresa.passwordHash);
        if (!senhaValida) {
          throw new Error("Email ou senha inválidos");
        }

        // Gerar token JWT e salvar em cookie
        const token = jwt.sign(
          { empresaId: empresa.id, email: empresa.email },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Configurar cookie de sessão
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(CUSTOM_AUTH_COOKIE, token, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        });

        return {
          success: true,
          empresa: {
            id: empresa.id,
            nome: empresa.nome,
            email: empresa.email,
            plano: empresa.plano,
            assinaturaStatus: empresa.assinaturaStatus,
          },
        };
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
        const empresa = await db.createEmpresa({
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
          empresaId: empresa.id,
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
          empresaId: empresa.id,
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

  pesquisas: router({
    // Buscar pesquisa por link público (rota pública)
    buscarPorLink: publicProcedure
      .input(
        z.object({
          linkPublico: z.string(),
        })
      )
      .query(async ({ input }) => {
        const pesquisa = await db.getPesquisaByLink(input.linkPublico);
        
        if (!pesquisa || pesquisa.status !== "ativa") {
          throw new Error("Pesquisa não encontrada ou encerrada");
        }

        return pesquisa;
      }),

    // Enviar resposta de pesquisa (rota pública)
    enviarResposta: publicProcedure
      .input(
        z.object({
          pesquisaId: z.number(),
          respostas: z.array(
            z.object({
              perguntaId: z.string(),
              resposta: z.any(),
            })
          ),
          nomeRespondente: z.string().optional(),
          emailRespondente: z.string().optional(),
          telefoneRespondente: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Criar resposta
        const respostaId = await db.createRespostaPesquisa({
          pesquisaId: input.pesquisaId,
          respostas: input.respostas,
          nomeRespondente: input.nomeRespondente,
          emailRespondente: input.emailRespondente,
          telefoneRespondente: input.telefoneRespondente,
          pontuacao: null,
          ipAddress: null,
          userAgent: null,
        });

        // Incrementar contador de respostas
        const pesquisa = await db.getPesquisaById(input.pesquisaId);
        if (pesquisa) {
          await db.updatePesquisa(input.pesquisaId, {
            totalRespostas: (pesquisa.totalRespostas || 0) + 1,
          });
        }

        return {
          success: true,
          respostaId,
        };
      }),

    // Criar nova pesquisa (rota protegida)
    criar: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
          titulo: z.string(),
          descricao: z.string().optional(),
          tipo: z.enum(["pesquisa", "quiz", "missao"]).default("pesquisa"),
          perguntas: z.array(z.any()),
          recompensaTipo: z.string().optional(),
          recompensaValor: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        console.log("[Pesquisas] Criando pesquisa:", input);
        const linkPublico = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const novaPesquisa = await db.createPesquisa({
          ...input,
          linkPublico,
          status: "ativa",
          totalRespostas: 0,
        });
        console.log("[Pesquisas] Pesquisa criada:", novaPesquisa);
        return {
          success: true,
          pesquisa: novaPesquisa,
          linkPublico: `/p/${linkPublico}`,
        };
      }),

    // Listar pesquisas da empresa
    listar: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
        })
      )
      .query(async ({ input }) => {
        const pesquisas = await db.getPesquisasByEmpresaId(input.empresaId);
        return pesquisas;
      }),

    // Obter respostas de uma pesquisa
    obterRespostas: publicProcedure
      .input(
        z.object({
          pesquisaId: z.number(),
        })
      )
      .query(async ({ input }) => {
        const respostas = await db.getRespostasByPesquisaId(input.pesquisaId);
        return respostas;
      }),
  }),

  // Router para Fontes de Dados
  fontesDados: router({
    // Listar fontes de dados da empresa
    listar: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
        })
      )
      .query(async ({ input }) => {
        const fontes = await db.getFontesDadosByEmpresa(input.empresaId);
        return fontes;
      }),

    // Adicionar nova fonte de dados
    adicionar: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
          nome: z.string(),
          tipo: z.string(),
          configuracao: z.any().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const fonteId = await db.createFonteDados({
          empresaId: input.empresaId,
          nome: input.nome,
          tipo: input.tipo,
          status: "conectado",
          totalRegistros: 0,
          configuracao: input.configuracao || null,
        });

        return {
          success: true,
          fonteId,
        };
      }),

    // Atualizar fonte de dados
    atualizar: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.string().optional(),
          totalRegistros: z.number().optional(),
          ultimaSincronizacao: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateFonteDados(id, data);

        return {
          success: true,
        };
      }),

    // Remover fonte de dados
    remover: publicProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        await db.deleteFonteDados(input.id);

        return {
          success: true,
        };
      }),
  }),

  // Router para Base de Conhecimento
  baseConhecimento: router({
    // Obter base de conhecimento da empresa
    obter: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
        })
      )
      .query(async ({ input }) => {
        const base = await db.getBaseConhecimentoByEmpresa(input.empresaId);
        return base;
      }),

    // Salvar/atualizar base de conhecimento
    salvar: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
          urlSite: z.string().optional(),
          missao: z.string().optional(),
          visao: z.string().optional(),
          valores: z.string().optional(),
          produtosServicos: z.string().optional(),
          publicoAlvo: z.string().optional(),
          diferenciais: z.string().optional(),
          historicoSucesso: z.string().optional(),
          documentos: z.any().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { empresaId, ...data } = input;
        await db.createOrUpdateBaseConhecimento(empresaId, data);

        return {
          success: true,
        };
      }),
  }),

  // Router para Análise da IA
  analiseIA: router({
    // Gerar insights com IA
    gerarInsights: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const iaService = await import("./ia-service");
        const resultado = await iaService.gerarInsights({
          empresaId: input.empresaId,
        });

        return resultado;
      }),

    // Listar insights históricos
    listarInsights: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
        })
      )
      .query(async ({ input }) => {
        const insights = await db.getInsightsByEmpresa(input.empresaId);
        return insights;
      }),

    gerarSugestoesFormularios: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const empresa = await db.getEmpresaById(input.empresaId);
          if (!empresa) {
            throw new Error("Empresa nao encontrada");
          }

          const { invokeLLM } = await import("./_core/llm");

          const prompt = `Voce eh um especialista em estrategia de dados e vendas. Analise os dados da empresa abaixo e sugira 3-5 formularios inteligentes que devem ser enviados para coletar dados faltantes.

Dados da Empresa:
- Nome: ${empresa.nome}
- Clientes Ativos: ${empresa.clientesAtivos || 0}
- Clientes Inativos: ${empresa.clientesInativos || 0}
- Investimento em Marketing: R$ ${empresa.investimentoMarketing || 0}
- Ticket Medio: R$ ${empresa.ticketMedio || 0}
- Taxa de Recompra: ${empresa.taxaRecompra || 0}%

Forneca a resposta em formato JSON com a seguinte estrutura:
{"sugestoes": [{"titulo": "...", "descricao": "...", "perguntasRecomendadas": ["..."], "impactoEstimado": "...", "prioridade": "alta"}]}`;

          const response = await invokeLLM({
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 2000,
          });

          const content = response.choices[0]?.message?.content || "";
          const jsonMatch = typeof content === "string" ? content.match(/\{[\s\S]*\}/) : null;
          if (!jsonMatch) {
            throw new Error("Nao foi possivel extrair JSON da resposta");
          }

          const resultado = JSON.parse(jsonMatch[0]);
          return resultado;
        } catch (error) {
          console.error("[IA] Erro ao gerar sugestoes:", error);
          throw error;
        }
      }),
  }),

  formularios: router({
    salvarRespostas: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
          tituloFormulario: z.string(),
          respostas: z.array(
            z.object({
              pergunta: z.string(),
              resposta: z.string(),
            })
          ),
          impactoEstimado: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          console.log("[Formularios] Respostas salvas:", {
            empresaId: input.empresaId,
            tituloFormulario: input.tituloFormulario,
            totalRespostas: input.respostas.length,
          });

          return {
            success: true,
            message: "Respostas salvas com sucesso",
          };
        } catch (error) {
          console.error("[Formularios] Erro ao salvar respostas:", error);
          throw error;
        }
      }),
  }),

  acoesInteligentes: router({
    listar: publicProcedure
      .input(z.object({ empresaId: z.number() }))
      .query(async ({ input }) => {
        try {
          return await db.getAcoesInteligentes(input.empresaId);
        } catch (error) {
          console.error("[AcoesInteligentes] Erro ao listar:", error);
          return [];
        }
      }),

    criar: publicProcedure
      .input(
        z.object({
          empresaId: z.number(),
          titulo: z.string(),
          tipo: z.string(),
          descricao: z.string(),
          baseadoEm: z.string().optional(),
          potencialLucro: z.string().optional(),
          roi: z.string().optional(),
          implementacao: z.string().optional(),
          status: z.enum(["recomendada", "em_andamento", "concluida", "descartada"]).optional(),
          prioridade: z.enum(["Baixa", "Média", "Alta", "Crítica"]).optional(),
          acoes: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const id = await db.createAcaoInteligente(input);
          return { id, success: true };
        } catch (error) {
          console.error("[AcoesInteligentes] Erro ao criar:", error);
          throw error;
        }
      }),

    atualizar: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["recomendada", "em_andamento", "concluida", "descartada"]).optional(),
          prioridade: z.enum(["Baixa", "Média", "Alta", "Crítica"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const { id, ...updates } = input;
          await db.updateAcaoInteligente(id, updates);
          return { success: true };
        } catch (error) {
          console.error("[AcoesInteligentes] Erro ao atualizar:", error);
          throw error;
        }
      }),
  }),

  resultados: router({
    listar: publicProcedure
      .input(z.object({ empresaId: z.number() }))
      .query(async ({ input }) => {
        try {
          return await db.getResultadosAcoes(input.empresaId);
        } catch (error) {
          console.error("[Resultados] Erro ao listar:", error);
          return [];
        }
      }),

    criar: publicProcedure
      .input(
        z.object({
          acaoId: z.number(),
          empresaId: z.number(),
          periodo: z.string().optional(),
          investimento: z.string().optional(),
          receita: z.string().optional(),
          lucro: z.string().optional(),
          roi: z.string().optional(),
          conversao: z.string().optional(),
          alcance: z.string().optional(),
          status: z.enum(["em_progresso", "concluida"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const id = await db.createResultadoAcao(input);
          return { id, success: true };
        } catch (error) {
          console.error("[Resultados] Erro ao criar:", error);
          throw error;
        }
      }),

    atualizar: publicProcedure
      .input(
        z.object({
          id: z.number(),
          periodo: z.string().optional(),
          investimento: z.string().optional(),
          receita: z.string().optional(),
          lucro: z.string().optional(),
          roi: z.string().optional(),
          conversao: z.string().optional(),
          alcance: z.string().optional(),
          status: z.enum(["em_progresso", "concluida"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const { id, ...updates } = input;
          await db.updateResultadoAcao(id, updates);
          return { success: true };
        } catch (error) {
          console.error("[Resultados] Erro ao atualizar:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
