export class Config {
  static serviceName = process.env.SERVICE_NAME;
  static jaegerHost=process.env.JAEGER_HOST;
  static jaegerPort=Number(process.env.JAEGER_PORT);
  static port=Number(process.env.PORT);
  static metricPort=Number(process.env.METRIC_PORT)
  static second_service_api_url=process.env.SECOND_SERVICE_API_URL
}