CREATE TABLE `alertas_seguranca` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresaId` int NOT NULL,
	`tipo` enum('acesso_negado','multiplas_tentativas_falhas','mudanca_permissoes','exclusao_dados','acesso_inusitado','outro') NOT NULL,
	`severidade` enum('baixa','media','alta','critica') NOT NULL DEFAULT 'media',
	`descricao` text NOT NULL,
	`usuarioId` int,
	`enderecoIP` varchar(45),
	`localizacao` varchar(100),
	`lido` boolean NOT NULL DEFAULT false,
	`resolvido` boolean NOT NULL DEFAULT false,
	`notasResolucao` text,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`resolvidoEm` timestamp,
	CONSTRAINT `alertas_seguranca_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresaId` int NOT NULL,
	`usuarioId` int,
	`acao` varchar(100) NOT NULL,
	`modulo` varchar(100) NOT NULL,
	`recursoId` int,
	`recursoTipo` varchar(100),
	`descricao` text,
	`mudancasAntes` json,
	`mudancasDepois` json,
	`enderecoIP` varchar(45),
	`userAgent` text,
	`resultado` enum('sucesso','erro','acesso_negado') NOT NULL DEFAULT 'sucesso',
	`mensagemErro` text,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `colaboradores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresaId` int NOT NULL,
	`usuarioId` int,
	`email` varchar(320) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`roleId` int NOT NULL,
	`status` enum('ativo','inativo','pendente') NOT NULL DEFAULT 'pendente',
	`dataConvite` timestamp NOT NULL DEFAULT (now()),
	`dataAceite` timestamp,
	`departamento` varchar(100),
	`cargo` varchar(100),
	`telefone` varchar(50),
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`atualizadoEm` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`criadoPor` int,
	CONSTRAINT `colaboradores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `configuracoes_empresa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresaId` int NOT NULL,
	`autenticacao2FA` boolean NOT NULL DEFAULT false,
	`ssoAtivo` boolean NOT NULL DEFAULT false,
	`urlSSO` varchar(255),
	`notificacoesEmail` boolean NOT NULL DEFAULT true,
	`notificacoesSlack` boolean NOT NULL DEFAULT false,
	`webhookSlack` varchar(500),
	`conformidadeLGPD` boolean NOT NULL DEFAULT true,
	`retencaoDados` int,
	`idioma` varchar(10) NOT NULL DEFAULT 'pt-BR',
	`fuso` varchar(50) NOT NULL DEFAULT 'America/Sao_Paulo',
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`atualizadoEm` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `configuracoes_empresa_id` PRIMARY KEY(`id`),
	CONSTRAINT `configuracoes_empresa_empresaId_unique` UNIQUE(`empresaId`)
);
--> statement-breakpoint
CREATE TABLE `permissoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roleId` int NOT NULL,
	`modulo` varchar(100) NOT NULL,
	`pode_visualizar` boolean NOT NULL DEFAULT false,
	`pode_criar` boolean NOT NULL DEFAULT false,
	`pode_editar` boolean NOT NULL DEFAULT false,
	`pode_deletar` boolean NOT NULL DEFAULT false,
	`pode_exportar` boolean NOT NULL DEFAULT false,
	`pode_compartilhar` boolean NOT NULL DEFAULT false,
	`pode_executar_acoes` boolean DEFAULT false,
	`pode_gerar_relatorios` boolean DEFAULT false,
	`pode_usar_laboratorio` boolean DEFAULT false,
	`pode_gerenciar_usuarios` boolean DEFAULT false,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`atualizadoEm` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `permissoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresaId` int NOT NULL,
	`nome` varchar(100) NOT NULL,
	`descricao` text,
	`cor` varchar(20),
	`ativo` boolean NOT NULL DEFAULT true,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`atualizadoEm` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `alertas_seguranca` ADD CONSTRAINT `alertas_seguranca_empresaId_empresas_id_fk` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alertas_seguranca` ADD CONSTRAINT `alertas_seguranca_usuarioId_users_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_empresaId_empresas_id_fk` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_usuarioId_users_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_empresaId_empresas_id_fk` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_usuarioId_users_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_criadoPor_users_id_fk` FOREIGN KEY (`criadoPor`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `configuracoes_empresa` ADD CONSTRAINT `configuracoes_empresa_empresaId_empresas_id_fk` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permissoes` ADD CONSTRAINT `permissoes_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `roles` ADD CONSTRAINT `roles_empresaId_empresas_id_fk` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE cascade ON UPDATE no action;