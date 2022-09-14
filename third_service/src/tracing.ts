import {
  CompositePropagator, W3CTraceContextPropagator, W3CBaggagePropagator
} from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';
import { Config } from "./config"

const otelSDK = new NodeSDK({
  metricReader: new PrometheusExporter({ port: Config.metricPort }),
  serviceName: Config.serviceName,
  spanProcessor: new BatchSpanProcessor(new JaegerExporter({ host: Config.jaegerHost, port: Config.jaegerPort })),
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({ propagators: [new JaegerPropagator()]}),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new KafkaJsInstrumentation()
  ],
});

export default otelSDK;


// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err),)
    .finally(() => process.exit(0));
});
