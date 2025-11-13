import axios, { AxiosInstance } from "axios";
import crypto from "crypto";

export interface MetaCampaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetaAd {
  id: string;
  campaignId: string;
  adsetId: string;
  name: string;
  status: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export interface MetaInsight {
  campaignId: string;
  date: Date;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export class MetaConnector {
  private accessToken: string;
  private adAccountId: string;
  private apiVersion = "v18.0";
  private client: AxiosInstance;

  constructor(accessToken: string, adAccountId: string) {
    this.accessToken = accessToken;
    this.adAccountId = adAccountId;

    this.client = axios.create({
      baseURL: `https://graph.instagram.com/${this.apiVersion}`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  /**
   * Testar conexão com Meta API
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get(`/me`);
      return !!response.data.id;
    } catch (error) {
      console.error("Erro ao testar conexão Meta:", error);
      return false;
    }
  }

  /**
   * Obter todas as campanhas
   */
  async getCampaigns(): Promise<MetaCampaign[]> {
    try {
      const response = await this.client.get(
        `/act_${this.adAccountId}/campaigns`,
        {
          params: {
            fields:
              "id,name,status,daily_budget,lifetime_budget,spend,insights.date_preset(last_30d){impressions,clicks,spend,actions,action_values}",
            limit: 100,
          },
        }
      );

      return response.data.data.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        budget: campaign.daily_budget || campaign.lifetime_budget || 0,
        spend: campaign.spend || 0,
        impressions: campaign.insights?.[0]?.impressions || 0,
        clicks: campaign.insights?.[0]?.clicks || 0,
        conversions:
          campaign.insights?.[0]?.actions?.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value || 0,
        ctr:
          campaign.insights?.[0]?.clicks && campaign.insights?.[0]?.impressions
            ? (
                (campaign.insights[0].clicks /
                  campaign.insights[0].impressions) *
                100
              ).toFixed(2)
            : 0,
        cpc:
          campaign.insights?.[0]?.clicks && campaign.spend
            ? (campaign.spend / campaign.insights[0].clicks).toFixed(2)
            : 0,
        cpa:
          campaign.insights?.[0]?.actions &&
          campaign.insights[0].actions.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value
            ? (
                campaign.spend /
                campaign.insights[0].actions.find(
                  (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
                ).value
              ).toFixed(2)
            : 0,
        roas:
          campaign.insights?.[0]?.action_values?.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value && campaign.spend
            ? (
                campaign.insights[0].action_values.find(
                  (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
                ).value / campaign.spend
              ).toFixed(2)
            : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter campanhas Meta:", error);
      return [];
    }
  }

  /**
   * Obter anúncios de uma campanha
   */
  async getAds(campaignId: string): Promise<MetaAd[]> {
    try {
      const response = await this.client.get(
        `/${campaignId.replace("act_", "")}/ads`,
        {
          params: {
            fields:
              "id,name,status,adset_id,insights.date_preset(last_30d){impressions,clicks,spend,actions,action_values}",
            limit: 100,
          },
        }
      );

      return response.data.data.map((ad: any) => ({
        id: ad.id,
        campaignId,
        adsetId: ad.adset_id,
        name: ad.name,
        status: ad.status,
        impressions: ad.insights?.[0]?.impressions || 0,
        clicks: ad.insights?.[0]?.clicks || 0,
        spend: ad.insights?.[0]?.spend || 0,
        conversions:
          ad.insights?.[0]?.actions?.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value || 0,
        ctr:
          ad.insights?.[0]?.clicks && ad.insights?.[0]?.impressions
            ? (
                (ad.insights[0].clicks / ad.insights[0].impressions) *
                100
              ).toFixed(2)
            : 0,
        cpc:
          ad.insights?.[0]?.clicks && ad.insights?.[0]?.spend
            ? (ad.insights[0].spend / ad.insights[0].clicks).toFixed(2)
            : 0,
        cpa:
          ad.insights?.[0]?.actions &&
          ad.insights[0].actions.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value
            ? (
                ad.insights[0].spend /
                ad.insights[0].actions.find(
                  (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
                ).value
              ).toFixed(2)
            : 0,
        roas:
          ad.insights?.[0]?.action_values?.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value && ad.insights?.[0]?.spend
            ? (
                ad.insights[0].action_values.find(
                  (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
                ).value / ad.insights[0].spend
              ).toFixed(2)
            : 0,
      }));
    } catch (error) {
      console.error("Erro ao obter anúncios Meta:", error);
      return [];
    }
  }

  /**
   * Obter insights diários de uma campanha
   */
  async getCampaignInsights(campaignId: string): Promise<MetaInsight[]> {
    try {
      const response = await this.client.get(
        `/${campaignId.replace("act_", "")}/insights`,
        {
          params: {
            fields:
              "date_start,impressions,clicks,spend,actions,action_values",
            time_range: JSON.stringify({
              since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              until: new Date().toISOString().split("T")[0],
            }),
            limit: 100,
          },
        }
      );

      return response.data.data.map((insight: any) => ({
        campaignId,
        date: new Date(insight.date_start),
        impressions: insight.impressions || 0,
        clicks: insight.clicks || 0,
        spend: parseFloat(insight.spend) || 0,
        conversions:
          insight.actions?.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value || 0,
        revenue:
          insight.action_values?.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value || 0,
        ctr:
          insight.clicks && insight.impressions
            ? ((insight.clicks / insight.impressions) * 100).toFixed(2)
            : 0,
        cpc:
          insight.clicks && insight.spend
            ? (insight.spend / insight.clicks).toFixed(2)
            : 0,
        cpa:
          insight.actions &&
          insight.actions.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value
            ? (
                insight.spend /
                insight.actions.find(
                  (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
                ).value
              ).toFixed(2)
            : 0,
        roas:
          insight.action_values &&
          insight.action_values.find(
            (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
          )?.value
            ? (
                insight.action_values.find(
                  (a: any) => a.action_type === "offsite_conversion.fb_pixel_purchase"
                ).value / insight.spend
              ).toFixed(2)
            : 0,
      }));
    } catch (error) {
      console.error("Erro ao obter insights Meta:", error);
      return [];
    }
  }

  /**
   * Sincronizar todos os dados
   */
  async syncAll(): Promise<{
    campaigns: MetaCampaign[];
    ads: MetaAd[];
    insights: MetaInsight[];
    recordsSynced: number;
    recordsFailed: number;
    duration: number;
  }> {
    const startTime = Date.now();
    let recordsSynced = 0;
    let recordsFailed = 0;

    try {
      // Obter campanhas
      const campaigns = await this.getCampaigns();
      recordsSynced += campaigns.length;

      // Obter anúncios
      let ads: MetaAd[] = [];
      for (const campaign of campaigns) {
        try {
          const campaignAds = await this.getAds(campaign.id);
          ads = [...ads, ...campaignAds];
          recordsSynced += campaignAds.length;
        } catch (error) {
          recordsFailed++;
        }
      }

      // Obter insights
      let insights: MetaInsight[] = [];
      for (const campaign of campaigns) {
        try {
          const campaignInsights = await this.getCampaignInsights(campaign.id);
          insights = [...insights, ...campaignInsights];
          recordsSynced += campaignInsights.length;
        } catch (error) {
          recordsFailed++;
        }
      }

      const duration = Date.now() - startTime;

      return {
        campaigns,
        ads,
        insights,
        recordsSynced,
        recordsFailed,
        duration,
      };
    } catch (error) {
      console.error("Erro ao sincronizar Meta:", error);
      return {
        campaigns: [],
        ads: [],
        insights: [],
        recordsSynced,
        recordsFailed,
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Obter dados formatados para exibição
   */
  async getData() {
    const data = await this.syncAll();
    return {
      campaigns: data.campaigns,
      ads: data.ads,
      insights: data.insights,
      summary: {
        totalCampaigns: data.campaigns.length,
        totalAds: data.ads.length,
        totalInsights: data.insights.length,
        totalSpend: data.campaigns.reduce((sum, c) => sum + c.spend, 0),
        totalImpressions: data.campaigns.reduce(
          (sum, c) => sum + c.impressions,
          0
        ),
        totalClicks: data.campaigns.reduce((sum, c) => sum + c.clicks, 0),
        totalConversions: data.campaigns.reduce(
          (sum, c) => sum + c.conversions,
          0
        ),
        averageROAS:
          data.campaigns.length > 0
            ? (
                data.campaigns.reduce((sum, c) => sum + parseFloat(c.roas), 0) /
                data.campaigns.length
              ).toFixed(2)
            : 0,
      },
    };
  }
}

export default MetaConnector;

