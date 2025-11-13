import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  // Rota para iniciar fluxo de signin
  app.get("/api/oauth/signin/:provider", (req: Request, res: Response) => {
    const provider = req.params.provider?.toLowerCase();
    const redirectUri = `${req.protocol}://${req.get('host')}/api/oauth/callback`;
    const state = btoa(redirectUri);
    
    console.log(`[OAuth] Iniciando signin para provider: ${provider}`);
    console.log(`[OAuth] Redirect URI: ${redirectUri}`);
    console.log(`[OAuth] State: ${state}`);
    
    const oAuthServerUrl = process.env.OAUTH_SERVER_URL || "";
    if (!oAuthServerUrl) {
      console.error("[OAuth] OAUTH_SERVER_URL não configurado");
      res.status(500).json({ error: "OAuth server not configured" });
      return;
    }
    
    const signinUrl = `${oAuthServerUrl}/signin/${provider}?state=${encodeURIComponent(state)}`;
    console.log(`[OAuth] Redirecionando para: ${signinUrl}`);
    res.redirect(302, signinUrl);
  });

  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    console.log("[OAuth] Callback iniciado");
    console.log("[OAuth] URL completa:", req.url);
    console.log("[OAuth] Headers:", JSON.stringify(req.headers, null, 2));
    
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    
    console.log("[OAuth] Code:", code ? "presente" : "ausente");
    console.log("[OAuth] State:", state ? "presente" : "ausente");

    if (!code || !state) {
      console.error("[OAuth] Erro: code ou state ausentes");
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      console.log("[OAuth] Trocando code por token...");
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      console.log("[OAuth] Token obtido com sucesso");
      
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      console.log("[OAuth] UserInfo obtido:", JSON.stringify(userInfo, null, 2));

      if (!userInfo.openId) {
        console.error("[OAuth] Erro: openId ausente no userInfo");
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      
      console.log("[OAuth] Criando/atualizando usuário no banco...");

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });
      console.log("[OAuth] Usuário criado/atualizado com sucesso");

      console.log("[OAuth] Criando session token...");
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });
      console.log("[OAuth] Session token criado com sucesso");

      const cookieOptions = getSessionCookieOptions(req);
      console.log("[OAuth] Cookie options:", JSON.stringify(cookieOptions, null, 2));
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      console.log("[OAuth] Cookie setado com sucesso");

      console.log("[OAuth] Redirecionando para /dashboard...");
      res.redirect(302, "/dashboard");
      console.log("[OAuth] Redirect enviado");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
