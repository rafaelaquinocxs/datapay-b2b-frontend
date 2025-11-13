/**
 * AWS Connector
 * Integração com AWS para sincronizar EC2, S3, RDS, CloudWatch
 */

import {
  EC2Client,
  DescribeInstancesCommand,
} from "@aws-sdk/client-ec2";
import {
  S3Client,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";
import {
  RDSClient,
  DescribeDBInstancesCommand,
} from "@aws-sdk/client-rds";
import {
  CloudWatchClient,
  ListMetricsCommand,
} from "@aws-sdk/client-cloudwatch";

export interface AWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export class AWSConnector {
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;
  private ec2Client: EC2Client;
  private s3Client: S3Client;
  private rdsClient: RDSClient;
  private cloudwatchClient: CloudWatchClient;

  constructor(config: AWSConfig) {
    this.accessKeyId = config.accessKeyId;
    this.secretAccessKey = config.secretAccessKey;
    this.region = config.region;

    const credentials = {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    };

    this.ec2Client = new EC2Client({ region: this.region, credentials });
    this.s3Client = new S3Client({ region: this.region, credentials });
    this.rdsClient = new RDSClient({ region: this.region, credentials });
    this.cloudwatchClient = new CloudWatchClient({ region: this.region, credentials });
  }

  /**
   * Testa a conexão com AWS
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.ec2Client.send(new DescribeInstancesCommand({}));
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém instâncias EC2
   */
  async getEC2Instances(): Promise<any[]> {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);

      const instances: any[] = [];

      for (const reservation of response.Reservations || []) {
        for (const instance of reservation.Instances || []) {
          instances.push({
            id: instance.InstanceId,
            type: instance.InstanceType,
            state: instance.State?.Name,
            launchTime: instance.LaunchTime,
            publicIpAddress: instance.PublicIpAddress,
            privateIpAddress: instance.PrivateIpAddress,
            tags: instance.Tags?.reduce((acc: any, tag: any) => {
              acc[tag.Key || ""] = tag.Value;
              return acc;
            }, {}),
          });
        }
      }

      return instances;
    } catch (error) {
      console.error("Erro ao obter instâncias EC2:", error);
      return [];
    }
  }

  /**
   * Obtém buckets S3
   */
  async getS3Buckets(): Promise<any[]> {
    try {
      const command = new ListBucketsCommand({});
      const response = await this.s3Client.send(command);

      return (response.Buckets || []).map((bucket) => ({
        name: bucket.Name,
        createdAt: bucket.CreationDate,
      }));
    } catch (error) {
      console.error("Erro ao obter buckets S3:", error);
      return [];
    }
  }

  /**
   * Obtém instâncias RDS
   */
  async getRDSInstances(): Promise<any[]> {
    try {
      const command = new DescribeDBInstancesCommand({});
      const response = await this.rdsClient.send(command);

      return (response.DBInstances || []).map((instance) => ({
        id: instance.DBInstanceIdentifier,
        engine: instance.Engine,
        engineVersion: instance.EngineVersion,
        status: instance.DBInstanceStatus,
        allocatedStorage: instance.AllocatedStorage,
        instanceClass: instance.DBInstanceClass,
        endpoint: instance.Endpoint?.Address,
        createdAt: instance.InstanceCreateTime,
      }));
    } catch (error) {
      console.error("Erro ao obter instâncias RDS:", error);
      return [];
    }
  }

  /**
   * Obtém métricas do CloudWatch
   */
  async getCloudWatchMetrics(): Promise<any[]> {
    try {
      const command = new ListMetricsCommand({
        Limit: 100,
      });
      const response = await this.cloudwatchClient.send(command);

      return (response.Metrics || []).map((metric) => ({
        namespace: metric.Namespace,
        metricName: metric.MetricName,
        dimensions: metric.Dimensions?.map((d) => ({
          name: d.Name,
          value: d.Value,
        })),
      }));
    } catch (error) {
      console.error("Erro ao obter métricas CloudWatch:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados da AWS
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const instances = await this.getEC2Instances();
      const buckets = await this.getS3Buckets();
      const rdsInstances = await this.getRDSInstances();
      const metrics = await this.getCloudWatchMetrics();

      const totalRecords = instances.length + buckets.length + rdsInstances.length + metrics.length;

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

export default AWSConnector;

