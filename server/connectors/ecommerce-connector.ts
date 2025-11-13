import axios, { AxiosInstance } from "axios";

// ============ SHOPIFY CONNECTOR ============

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  status: string;
  vendor: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  email: string;
  status: string;
  totalPrice: number;
  currency: string;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  totalSpent: number;
  ordersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ShopifyConnector {
  private accessToken: string;
  private shopUrl: string;
  private apiVersion = "2024-01";
  private client: AxiosInstance;

  constructor(accessToken: string, shopUrl: string) {
    this.accessToken = accessToken;
    this.shopUrl = shopUrl;

    this.client = axios.create({
      baseURL: `https://${shopUrl}/admin/api/${this.apiVersion}`,
      headers: {
        "X-Shopify-Access-Token": this.accessToken,
        "Content-Type": "application/json",
      },
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get("/shop.json");
      return !!response.data.shop.id;
    } catch (error) {
      console.error("Erro ao testar conexão Shopify:", error);
      return false;
    }
  }

  async getProducts(): Promise<ShopifyProduct[]> {
    try {
      const response = await this.client.get("/products.json", {
        params: { limit: 250 },
      });

      return response.data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        handle: product.handle,
        status: product.status,
        vendor: product.vendor,
        price: product.variants?.[0]?.price || 0,
        quantity: product.variants?.reduce((sum: number, v: any) => sum + v.inventory_quantity, 0) || 0,
        createdAt: new Date(product.created_at),
        updatedAt: new Date(product.updated_at),
      }));
    } catch (error) {
      console.error("Erro ao obter produtos Shopify:", error);
      return [];
    }
  }

  async getOrders(): Promise<ShopifyOrder[]> {
    try {
      const response = await this.client.get("/orders.json", {
        params: { limit: 250, status: "any" },
      });

      return response.data.orders.map((order: any) => ({
        id: order.id,
        orderNumber: order.order_number,
        email: order.email,
        status: order.fulfillment_status || "pending",
        totalPrice: parseFloat(order.total_price),
        currency: order.currency,
        itemCount: order.line_items.length,
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
      }));
    } catch (error) {
      console.error("Erro ao obter pedidos Shopify:", error);
      return [];
    }
  }

  async getCustomers(): Promise<ShopifyCustomer[]> {
    try {
      const response = await this.client.get("/customers.json", {
        params: { limit: 250 },
      });

      return response.data.customers.map((customer: any) => ({
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.phone,
        totalSpent: parseFloat(customer.total_spent),
        ordersCount: customer.orders_count,
        createdAt: new Date(customer.created_at),
        updatedAt: new Date(customer.updated_at),
      }));
    } catch (error) {
      console.error("Erro ao obter clientes Shopify:", error);
      return [];
    }
  }

  async syncAll() {
    const startTime = Date.now();
    const products = await this.getProducts();
    const orders = await this.getOrders();
    const customers = await this.getCustomers();

    return {
      products,
      orders,
      customers,
      recordsSynced: products.length + orders.length + customers.length,
      recordsFailed: 0,
      duration: Date.now() - startTime,
    };
  }
}

// ============ WOOCOMMERCE CONNECTOR ============

export class WooCommerceConnector {
  private consumerKey: string;
  private consumerSecret: string;
  private storeUrl: string;
  private client: AxiosInstance;

  constructor(consumerKey: string, consumerSecret: string, storeUrl: string) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.storeUrl = storeUrl;

    this.client = axios.create({
      baseURL: `${storeUrl}/wp-json/wc/v3`,
      auth: {
        username: this.consumerKey,
        password: this.consumerSecret,
      },
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get("/system_status");
      return !!response.data.environment;
    } catch (error) {
      console.error("Erro ao testar conexão WooCommerce:", error);
      return false;
    }
  }

  async getProducts() {
    try {
      const response = await this.client.get("/products", {
        params: { per_page: 100 },
      });

      return response.data.map((product: any) => ({
        id: product.id,
        title: product.name,
        handle: product.slug,
        status: product.status,
        vendor: product.categories?.[0]?.name || "N/A",
        price: parseFloat(product.price),
        quantity: product.stock_quantity || 0,
        createdAt: new Date(product.date_created),
        updatedAt: new Date(product.date_modified),
      }));
    } catch (error) {
      console.error("Erro ao obter produtos WooCommerce:", error);
      return [];
    }
  }

  async getOrders() {
    try {
      const response = await this.client.get("/orders", {
        params: { per_page: 100 },
      });

      return response.data.map((order: any) => ({
        id: order.id,
        orderNumber: order.number,
        email: order.billing.email,
        status: order.status,
        totalPrice: parseFloat(order.total),
        currency: order.currency,
        itemCount: order.line_items.length,
        createdAt: new Date(order.date_created),
        updatedAt: new Date(order.date_modified),
      }));
    } catch (error) {
      console.error("Erro ao obter pedidos WooCommerce:", error);
      return [];
    }
  }

  async getCustomers() {
    try {
      const response = await this.client.get("/customers", {
        params: { per_page: 100 },
      });

      return response.data.map((customer: any) => ({
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.billing?.phone || "",
        totalSpent: parseFloat(customer.total_spent),
        ordersCount: customer.orders_count,
        createdAt: new Date(customer.date_created),
        updatedAt: new Date(customer.date_modified),
      }));
    } catch (error) {
      console.error("Erro ao obter clientes WooCommerce:", error);
      return [];
    }
  }

  async syncAll() {
    const startTime = Date.now();
    const products = await this.getProducts();
    const orders = await this.getOrders();
    const customers = await this.getCustomers();

    return {
      products,
      orders,
      customers,
      recordsSynced: products.length + orders.length + customers.length,
      recordsFailed: 0,
      duration: Date.now() - startTime,
    };
  }
}

// ============ MAGENTO CONNECTOR ============

export class MagentoConnector {
  private apiToken: string;
  private storeUrl: string;
  private client: AxiosInstance;

  constructor(apiToken: string, storeUrl: string) {
    this.apiToken = apiToken;
    this.storeUrl = storeUrl;

    this.client = axios.create({
      baseURL: `${storeUrl}/rest/V1`,
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get("/store/storeConfigs");
      return !!response.data?.[0]?.id;
    } catch (error) {
      console.error("Erro ao testar conexão Magento:", error);
      return false;
    }
  }

  async getProducts() {
    try {
      const response = await this.client.get("/products", {
        params: { searchCriteria: { pageSize: 100 } },
      });

      return response.data.items.map((product: any) => ({
        id: product.id,
        title: product.name,
        handle: product.url_key,
        status: product.status === 1 ? "active" : "inactive",
        vendor: product.attribute_set_id,
        price: product.price || 0,
        quantity: product.extension_attributes?.stock_item?.qty || 0,
        createdAt: new Date(product.created_at),
        updatedAt: new Date(product.updated_at),
      }));
    } catch (error) {
      console.error("Erro ao obter produtos Magento:", error);
      return [];
    }
  }

  async getOrders() {
    try {
      const response = await this.client.get("/orders", {
        params: { searchCriteria: { pageSize: 100 } },
      });

      return response.data.items.map((order: any) => ({
        id: order.id,
        orderNumber: order.increment_id,
        email: order.customer_email,
        status: order.status,
        totalPrice: parseFloat(order.grand_total),
        currency: order.order_currency_code,
        itemCount: order.items.length,
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
      }));
    } catch (error) {
      console.error("Erro ao obter pedidos Magento:", error);
      return [];
    }
  }

  async getCustomers() {
    try {
      const response = await this.client.get("/customers/search", {
        params: { searchCriteria: { pageSize: 100 } },
      });

      return response.data.items.map((customer: any) => ({
        id: customer.id,
        email: customer.email,
        firstName: customer.firstname,
        lastName: customer.lastname,
        phone: customer.custom_attributes?.find((a: any) => a.attribute_code === "telephone")?.value || "",
        totalSpent: 0, // Magento não retorna isso diretamente
        ordersCount: 0,
        createdAt: new Date(customer.created_at),
        updatedAt: new Date(customer.updated_at),
      }));
    } catch (error) {
      console.error("Erro ao obter clientes Magento:", error);
      return [];
    }
  }

  async syncAll() {
    const startTime = Date.now();
    const products = await this.getProducts();
    const orders = await this.getOrders();
    const customers = await this.getCustomers();

    return {
      products,
      orders,
      customers,
      recordsSynced: products.length + orders.length + customers.length,
      recordsFailed: 0,
      duration: Date.now() - startTime,
    };
  }
}

export default { ShopifyConnector, WooCommerceConnector, MagentoConnector };

