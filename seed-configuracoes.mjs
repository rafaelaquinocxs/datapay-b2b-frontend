import { db } from "./server/db.ts";

async function seed() {
  console.log("🌱 Iniciando seed de dados de teste...");

  try {
    // Inserir roles
    const roles = await db.query.roles.findMany();
    if (roles.length === 0) {
      console.log("📝 Criando roles...");
      await db.createRole({
        nome: "Admin",
        descricao: "Acesso total à plataforma",
        permissoes: ["visualizar", "criar", "editar", "deletar", "exportar", "gerenciar_usuarios"],
      });
      await db.createRole({
        nome: "Gerente",
        descricao: "Gerencia ações e resultados",
        permissoes: ["visualizar", "criar", "editar", "exportar", "executar_acoes"],
      });
      await db.createRole({
        nome: "Analista",
        descricao: "Cria insights e pesquisas",
        permissoes: ["visualizar", "criar", "editar", "exportar"],
      });
      await db.createRole({
        nome: "Visualizador",
        descricao: "Apenas visualiza relatórios",
        permissoes: ["visualizar"],
      });
      console.log("✅ Roles criados com sucesso!");
    }

    // Inserir colaboradores
    const colaboradores = await db.query.colaboradores.findMany();
    if (colaboradores.length === 0) {
      console.log("👥 Criando colaboradores...");
      await db.createColaborador({
        empresaId: 1,
        nome: "João Silva",
        email: "joao@empresa.com",
        role: "Admin",
        departamento: "Executivo",
        cargo: "CEO",
        status: "ativo",
      });
      await db.createColaborador({
        empresaId: 1,
        nome: "Maria Santos",
        email: "maria@empresa.com",
        role: "Gerente",
        departamento: "Marketing",
        cargo: "Gerente de Marketing",
        status: "ativo",
      });
      await db.createColaborador({
        empresaId: 1,
        nome: "Carlos Oliveira",
        email: "carlos@empresa.com",
        role: "Analista",
        departamento: "BI",
        cargo: "Analista de Dados",
        status: "pendente",
      });
      console.log("✅ Colaboradores criados com sucesso!");
    }

    console.log("✨ Seed concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
}

seed();
