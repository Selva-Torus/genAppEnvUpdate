import { Injectable, Logger, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { NativeConnection, Worker } from '@temporalio/worker';
import { DynamicFlowService } from 'src/Torus/v1/te/dynamicFlow.service';
import { TeService } from 'src/Torus/v1/te/te.service';
import { createDynamicFlowActivities } from './dynamic-flow.activities';
import {
  DYNAMIC_FLOW_TASK_QUEUE,
  isFlowTemporalEnabled,
  temporalAddress,
  temporalState,
} from './temporal.config';

const RETRY_DELAY_MS = 10_000;

// Runs the Temporal worker inside the Nest app so activities can use DynamicFlowService (Redis, CommonService, ...)
@Injectable()
export class DynamicFlowWorker implements OnApplicationBootstrap, OnModuleDestroy {
  private readonly logger = new Logger(DynamicFlowWorker.name);
  private worker: Worker;
  private retryTimer: NodeJS.Timeout;
  private destroyed = false;

  constructor(
    private readonly dynamicFlowService: DynamicFlowService,
    private readonly teService: TeService,
  ) {}

  onApplicationBootstrap() {
    if (!isFlowTemporalEnabled()) return;
    // Not awaited: app startup shouldn't wait for (or fail on) the Temporal server
    this.start();
  }

  private async start() {
    try {
      const connection = await NativeConnection.connect({ address: temporalAddress() });
      this.worker = await Worker.create({
        connection,
        namespace: 'default',
        taskQueue: DYNAMIC_FLOW_TASK_QUEUE,
        workflowsPath: require.resolve('./dynamic-flow.workflows'),
        activities: createDynamicFlowActivities(this.dynamicFlowService, this.teService),
      });

      // Not awaited: run() only resolves when the worker shuts down
      this.worker
        .run()
        .catch((error) => this.logger.error('Temporal worker stopped with error', error))
        .finally(() => {
          temporalState.workerRunning = false;
          connection.close();
          this.scheduleRetry();
        });
      temporalState.workerRunning = true;
      this.logger.log(`Temporal worker started on task queue '${DYNAMIC_FLOW_TASK_QUEUE}'`);
    } catch (error) {
      this.logger.warn(
        `Temporal worker could not connect to ${temporalAddress()} (${error?.message}). ` +
          `Flow nodes run inline; retrying in ${RETRY_DELAY_MS / 1000}s`,
      );
      this.scheduleRetry();
    }
  }

  private scheduleRetry() {
    if (this.destroyed) return;
    clearTimeout(this.retryTimer);
    this.retryTimer = setTimeout(() => this.start(), RETRY_DELAY_MS);
  }

  onModuleDestroy() {
    this.destroyed = true;
    clearTimeout(this.retryTimer);
    if (this.worker?.getState() === 'RUNNING') {
      this.worker.shutdown();
    }
  }
}
