/**
 * Jira Connector
 * Integração com Jira para sincronizar issues, sprints, projetos
 */

import axios, { AxiosInstance } from "axios";
import * as base64 from "base-64";

export interface JiraConfig {
  domain: string; // ex: mycompany.atlassian.net
  email: string;
  apiToken: string;
}

export class JiraConnector {
  private domain: string;
  private email: string;
  private apiToken: string;
  private client: AxiosInstance;
  private baseURL: string;

  constructor(config: JiraConfig) {
    this.domain = config.domain;
    this.email = config.email;
    this.apiToken = config.apiToken;
    this.baseURL = `https://${this.domain}/rest/api/3`;

    const auth = base64.encode(`${this.email}:${this.apiToken}`);

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Testa a conexão com Jira
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.get("/myself");
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém projetos do Jira
   */
  async getProjects(limit: number = 50): Promise<any[]> {
    try {
      const response = await this.client.get("/project", {
        params: { maxResults: limit },
      });

      return response.data.map((project: any) => ({
        id: project.id,
        key: project.key,
        name: project.name,
        type: project.projectTypeKey,
        lead: project.lead?.displayName,
        description: project.description,
        category: project.projectCategory?.name,
      }));
    } catch (error) {
      console.error("Erro ao obter projetos:", error);
      return [];
    }
  }

  /**
   * Obtém issues do Jira
   */
  async getIssues(jql: string = "", limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.get("/search", {
        params: {
          jql: jql || "ORDER BY updated DESC",
          maxResults: limit,
          fields: [
            "key",
            "summary",
            "description",
            "status",
            "priority",
            "assignee",
            "reporter",
            "created",
            "updated",
            "duedate",
            "labels",
            "components",
          ],
        },
      });

      return response.data.issues.map((issue: any) => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description,
        status: issue.fields.status?.name,
        priority: issue.fields.priority?.name,
        assignee: issue.fields.assignee?.displayName,
        reporter: issue.fields.reporter?.displayName,
        created: issue.fields.created,
        updated: issue.fields.updated,
        dueDate: issue.fields.duedate,
        labels: issue.fields.labels,
        components: issue.fields.components?.map((c: any) => c.name),
      }));
    } catch (error) {
      console.error("Erro ao obter issues:", error);
      return [];
    }
  }

  /**
   * Obtém sprints do Jira
   */
  async getSprints(boardId: string, limit: number = 50): Promise<any[]> {
    try {
      const response = await this.client.get(`/board/${boardId}/sprint`, {
        params: { maxResults: limit },
      });

      return response.data.values.map((sprint: any) => ({
        id: sprint.id,
        name: sprint.name,
        state: sprint.state,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        goal: sprint.goal,
      }));
    } catch (error) {
      console.error("Erro ao obter sprints:", error);
      return [];
    }
  }

  /**
   * Obtém boards do Jira
   */
  async getBoards(limit: number = 50): Promise<any[]> {
    try {
      const response = await this.client.get("/board", {
        params: { maxResults: limit },
      });

      return response.data.values.map((board: any) => ({
        id: board.id,
        name: board.name,
        type: board.type,
        projectKey: board.projectKey,
      }));
    } catch (error) {
      console.error("Erro ao obter boards:", error);
      return [];
    }
  }

  /**
   * Obtém usuários do Jira
   */
  async getUsers(limit: number = 50): Promise<any[]> {
    try {
      const response = await this.client.get("/users/search", {
        params: { maxResults: limit },
      });

      return response.data.map((user: any) => ({
        id: user.accountId,
        name: user.displayName,
        email: user.emailAddress,
        active: user.active,
        timezone: user.timeZone,
      }));
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados do Jira
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const projects = await this.getProjects();
      const issues = await this.getIssues();
      const boards = await this.getBoards();
      const users = await this.getUsers();

      let totalSprints = 0;
      for (const board of boards) {
        const sprints = await this.getSprints(board.id.toString());
        totalSprints += sprints.length;
      }

      const totalRecords = projects.length + issues.length + boards.length + users.length + totalSprints;

      return {
        status: "success",
        recordsSynced: totalRecords,
        recordsFailed: 0,
      };
    } catch (error) {
      return {
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        error: String(error),
      };
    }
  }
}

export default JiraConnector;

