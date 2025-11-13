import { Router } from "express";
import {
  isAdmin,
  createUser,
  listUsers,
  toggleUserStatus,
  deleteUser,
  getUserByEmail,
} from "../auth/auth-enhanced";

const router = Router();

/**
 * Middleware para verificar se é admin
 */
const adminOnly = async (req: any, res: any, next: any) => {
  try {
    const email = req.headers["x-user-email"];

    if (!email || !isAdmin(email)) {
      return res.status(403).json({ error: "Acesso negado - apenas admin" });
    }

    req.adminEmail = email;
    next();
  } catch (error) {
    res.status(500).json({ error: "Erro de autenticação" });
  }
};

/**
 * GET /api/admin/users
 * Listar todos os usuários
 */
router.get("/users", adminOnly, async (req: any, res: any) => {
  try {
    const users = await listUsers(req.adminEmail);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Erro" });
  }
});

/**
 * POST /api/admin/users/create
 * Criar novo usuário
 */
router.post("/users/create", adminOnly, async (req: any, res: any) => {
  try {
    const { email, name, companyId } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Email e nome são obrigatórios" });
    }

    const user = await createUser(req.adminEmail, {
      email,
      name,
      companyId,
      role: "user",
    });

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Erro" });
  }
});

/**
 * POST /api/admin/users/:userId/toggle
 * Ativar/desativar usuário
 */
router.post("/users/:userId/toggle", adminOnly, async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ error: "isActive deve ser boolean" });
    }

    const user = await toggleUserStatus(req.adminEmail, userId, isActive);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Erro" });
  }
});

/**
 * DELETE /api/admin/users/:userId
 * Deletar usuário
 */
router.delete("/users/:userId", adminOnly, async (req: any, res: any) => {
  try {
    const { userId } = req.params;

    await deleteUser(req.adminEmail, userId);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Erro" });
  }
});

/**
 * GET /api/admin/users/:email
 * Obter usuário por email
 */
router.get("/users/:email", adminOnly, async (req: any, res: any) => {
  try {
    const { email } = req.params;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Erro" });
  }
});

export default router;

