/**
 * Stripe Connector
 * Integração com Stripe para sincronizar transações, clientes, faturas
 */

import Stripe from "stripe";

export interface StripeConfig {
  apiKey: string;
}

export class StripeConnector {
  private stripe: Stripe;

  constructor(config: StripeConfig) {
    this.stripe = new Stripe(config.apiKey, {
      apiVersion: "2024-04-10",
    });
  }

  /**
   * Testa a conexão com Stripe
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.stripe.customers.list({ limit: 1 });
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém clientes do Stripe
   */
  async getCustomers(limit: number = 100): Promise<any[]> {
    try {
      const customers = await this.stripe.customers.list({ limit });

      return customers.data.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        created: new Date(customer.created * 1000),
        balance: customer.balance,
      }));
    } catch (error) {
      console.error("Erro ao obter clientes:", error);
      return [];
    }
  }

  /**
   * Obtém transações (charges) do Stripe
   */
  async getCharges(limit: number = 100): Promise<any[]> {
    try {
      const charges = await this.stripe.charges.list({ limit });

      return charges.data.map((charge) => ({
        id: charge.id,
        amount: charge.amount / 100, // Converter de centavos
        currency: charge.currency,
        status: charge.status,
        customerId: charge.customer,
        description: charge.description,
        created: new Date(charge.created * 1000),
        receiptUrl: charge.receipt_url,
      }));
    } catch (error) {
      console.error("Erro ao obter charges:", error);
      return [];
    }
  }

  /**
   * Obtém faturas do Stripe
   */
  async getInvoices(limit: number = 100): Promise<any[]> {
    try {
      const invoices = await this.stripe.invoices.list({ limit });

      return invoices.data.map((invoice) => ({
        id: invoice.id,
        customerId: invoice.customer,
        amount: invoice.amount_due / 100,
        amountPaid: invoice.amount_paid / 100,
        currency: invoice.currency,
        status: invoice.status,
        dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
        created: new Date(invoice.created * 1000),
        pdfUrl: invoice.pdf,
      }));
    } catch (error) {
      console.error("Erro ao obter faturas:", error);
      return [];
    }
  }

  /**
   * Obtém subscrições do Stripe
   */
  async getSubscriptions(limit: number = 100): Promise<any[]> {
    try {
      const subscriptions = await this.stripe.subscriptions.list({ limit });

      return subscriptions.data.map((subscription) => ({
        id: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        items: subscription.items.data.map((item) => ({
          id: item.id,
          priceId: item.price.id,
          quantity: item.quantity,
        })),
        created: new Date(subscription.created * 1000),
      }));
    } catch (error) {
      console.error("Erro ao obter subscrições:", error);
      return [];
    }
  }

  /**
   * Obtém produtos do Stripe
   */
  async getProducts(limit: number = 100): Promise<any[]> {
    try {
      const products = await this.stripe.products.list({ limit });

      return products.data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
        created: new Date(product.created * 1000),
        updated: new Date(product.updated * 1000),
      }));
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados do Stripe
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const customers = await this.getCustomers();
      const charges = await this.getCharges();
      const invoices = await this.getInvoices();
      const subscriptions = await this.getSubscriptions();
      const products = await this.getProducts();

      const totalRecords =
        customers.length + charges.length + invoices.length + subscriptions.length + products.length;

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

export default StripeConnector;

