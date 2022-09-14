export class Config {
  static serviceName = process.env.SERVICE_NAME;
  static kafkaClientId = process.env.KAFKA_CLIENT_ID;
  static kafkaBrokers = process.env.KAFKA_BROKERS
  static groupId = process.env.KAFKA_GROUP_ID;
  static topic = process.env.TOPIC;
  static jaegerHost=process.env.JAEGER_HOST;
  static jaegerPort=Number(process.env.JAEGER_PORT);
  static port=Number(process.env.PORT);
  static metricPort=Number(process.env.METRIC_PORT)
}