/**
 * Slack Connector
 * Integração com Slack para sincronizar mensagens, canais, usuários
 */

import axios, { AxiosInstance } from "axios";

export interface SlackConfig {
  botToken: string;
}

export class SlackConnector {
  private botToken: string;
  private client: AxiosInstance;
  private baseURL = "https://slack.com/api";

  constructor(config: SlackConfig) {
    this.botToken = config.botToken;

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Authorization": `Bearer ${this.botToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Testa a conexão com Slack
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.client.post("auth.test");
      return { success: response.data.ok };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém usuários do Slack
   */
  async getUsers(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.post("users.list", { limit });

      if (!response.data.ok) {
        throw new Error(response.data.error);
      }

      return response.data.members.map((user: any) => ({
        id: user.id,
        name: user.name,
        realName: user.real_name,
        email: user.profile?.email,
        phone: user.profile?.phone,
        title: user.profile?.title,
        isActive: !user.deleted,
        isBot: user.is_bot,
        createdAt: new Date(user.profile?.created || 0),
      }));
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      return [];
    }
  }

  /**
   * Obtém canais do Slack
   */
  async getChannels(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.post("conversations.list", {
        limit,
        exclude_archived: false,
      });

      if (!response.data.ok) {
        throw new Error(response.data.error);
      }

      return response.data.channels.map((channel: any) => ({
        id: channel.id,
        name: channel.name,
        topic: channel.topic?.value,
        purpose: channel.purpose?.value,
        isPrivate: channel.is_private,
        isArchived: channel.is_archived,
        memberCount: channel.num_members,
        created: new Date(channel.created * 1000),
      }));
    } catch (error) {
      console.error("Erro ao obter canais:", error);
      return [];
    }
  }

  /**
   * Obtém mensagens de um canal
   */
  async getChannelMessages(channelId: string, limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.post("conversations.history", {
        channel: channelId,
        limit,
      });

      if (!response.data.ok) {
        throw new Error(response.data.error);
      }

      return response.data.messages.map((message: any) => ({
        id: message.ts,
        userId: message.user,
        text: message.text,
        type: message.type,
        timestamp: new Date(parseFloat(message.ts) * 1000),
        reactions: message.reactions?.map((r: any) => ({
          name: r.name,
          count: r.count,
        })),
      }));
    } catch (error) {
      console.error("Erro ao obter mensagens:", error);
      return [];
    }
  }

  /**
   * Obtém grupos (private channels) do Slack
   */
  async getGroups(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.post("conversations.list", {
        limit,
        types: "private_channel",
      });

      if (!response.data.ok) {
        throw new Error(response.data.error);
      }

      return response.data.channels.map((group: any) => ({
        id: group.id,
        name: group.name,
        topic: group.topic?.value,
        memberCount: group.num_members,
        created: new Date(group.created * 1000),
      }));
    } catch (error) {
      console.error("Erro ao obter grupos:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados do Slack
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const users = await this.getUsers();
      const channels = await this.getChannels();
      const groups = await this.getGroups();

      let totalMessages = 0;
      for (const channel of channels) {
        const messages = await this.getChannelMessages(channel.id);
        totalMessages += messages.length;
      }

      const totalRecords = users.length + channels.length + groups.length + totalMessages;

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

export default SlackConnector;

