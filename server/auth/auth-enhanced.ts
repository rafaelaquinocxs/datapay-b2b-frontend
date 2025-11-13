import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

/**
 * AUTENTICAÇÃO MELHORADA
 * Separar admin vs usuário
 * Admin: holding@datapay.app.br
 * Usuários: criados pelo admin
 */

export type UserRole = "admin" | "user";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser extends AuthUser {
  role: "admin";
}

export interface RegularUser extends AuthUser {
  role: "user";
  companyId?: string;
}

const ADMIN_EMAIL = "holding@datapay.app.br";

/**
 * Verificar se é admin
 */
export function isAdmin(email: string): boolean {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Obter role do usuário
 */
export async function getUserRole(email: string): Promise<UserRole> {
  if (isAdmin(email)) {
    return "admin";
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  return user[0].role as UserRole;
}

/**
 * Criar novo usuário (apenas admin pode fazer)
 */
export async function createUser(
  adminEmail: string,
  userData: {
    email: string;
    name: string;
    companyId?: string;
    role?: UserRole;
  }
): Promise<AuthUser> {
  // Verificar se é admin
  if (!isAdmin(adminEmail)) {
    throw new Error("Apenas admin pode criar usuários");
  }

  // Verificar se usuário já existe
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Usuário já existe");
  }

  // Criar usuário
  const newUser = await db
    .insert(users)
    .values({
      email: userData.email,
      name: userData.name,
      role: userData.role || "user",
      companyId: userData.companyId,
      isActive: true,
    })
    .returning();

  return {
    id: newUser[0].id,
    email: newUser[0].email,
    name: newUser[0].name,
    role: newUser[0].role as UserRole,
    isActive: newUser[0].isActive,
    createdAt: newUser[0].createdAt,
    updatedAt: newUser[0].updatedAt,
  };
}

/**
 * Listar todos os usuários (apenas admin)
 */
export async function listUsers(adminEmail: string) {
  if (!isAdmin(adminEmail)) {
    throw new Error("Apenas admin pode listar usuários");
  }

  const allUsers = await db.select().from(users);

  return allUsers.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }));
}

/**
 * Ativar/desativar usuário (apenas admin)
 */
export async function toggleUserStatus(
  adminEmail: string,
  userId: string,
  isActive: boolean
): Promise<AuthUser> {
  if (!isAdmin(adminEmail)) {
    throw new Error("Apenas admin pode alterar status de usuário");
  }

  const updated = await db
    .update(users)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  if (updated.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  return {
    id: updated[0].id,
    email: updated[0].email,
    name: updated[0].name,
    role: updated[0].role as UserRole,
    isActive: updated[0].isActive,
    createdAt: updated[0].createdAt,
    updatedAt: updated[0].updatedAt,
  };
}

/**
 * Deletar usuário (apenas admin)
 */
export async function deleteUser(
  adminEmail: string,
  userId: string
): Promise<void> {
  if (!isAdmin(adminEmail)) {
    throw new Error("Apenas admin pode deletar usuários");
  }

  // Não permitir deletar a si mesmo
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (user.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  if (user[0].email === ADMIN_EMAIL) {
    throw new Error("Não é possível deletar o admin");
  }

  await db.delete(users).where(eq(users.id, userId));
}

/**
 * Obter usuário por email
 */
export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    role: user[0].role as UserRole,
    isActive: user[0].isActive,
    createdAt: user[0].createdAt,
    updatedAt: user[0].updatedAt,
  };
}

/**
 * Middleware de autenticação
 */
export function authMiddleware(requiredRole?: UserRole) {
  return async (req: any, res: any, next: any) => {
    try {
      // Obter email do header (implementar com JWT real)
      const email = req.headers["x-user-email"];

      if (!email) {
        return res.status(401).json({ error: "Não autenticado" });
      }

      // Obter usuário
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      if (!user.isActive) {
        return res.status(403).json({ error: "Usuário inativo" });
      }

      // Verificar role se necessário
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ error: "Permissão negada" });
      }

      // Adicionar usuário ao request
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: "Erro de autenticação" });
    }
  };
}

