import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import jwt from "jsonwebtoken";
import * as db from "../db";
import { parse as parseCookieHeader } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "datapay-secret-key-change-in-production";
const CUSTOM_AUTH_COOKIE = "datapay_auth"; // Nome diferente para autenticação customizada

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  empresa: any | null; // Empresa autenticada via JWT customizado
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;
  let empresa: any | null = null;

  try {
    // Primeiro tentar autenticação Manus OAuth (sistema padrão)
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Se falhar, tentar autenticação customizada com JWT da empresa
    try {
      const cookies = parseCookieHeader(opts.req.headers.cookie || "");
      const token = cookies[CUSTOM_AUTH_COOKIE];
      
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET) as { empresaId: number; email: string };
        empresa = await db.getEmpresaById(decoded.empresaId);
      }
    } catch (jwtError) {
      // Autenticação falhou, usuário não autenticado
      empresa = null;
    }
    
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
    empresa,
  };
}

export { CUSTOM_AUTH_COOKIE };

