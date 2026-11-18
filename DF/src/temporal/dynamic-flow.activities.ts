import { ApplicationFailure } from '@temporalio/client';
import type { pfDto, PoEvent } from 'src/dto';
import type { DynamicFlowService } from 'src/Torus/v1/te/dynamicFlow.service';
import type { TeService } from 'src/Torus/v1/te/te.service';

// te.service throws plain objects (e.g. `throw eventResponse` -> { statusCode: 503, message }) and HttpExceptions.
// Temporal can't read a message from a plain object, so convert both into an ApplicationFailure that keeps
// the real message and statusCode (details[0]) for TemporalService to return.
function toFailure(error: any): ApplicationFailure {
  const response = typeof error?.getResponse === 'function' ? error.getResponse() : error;
  const statusCode = error?.getStatus?.() ?? response?.statusCode ?? error?.status;
  let message = response?.message ?? error?.message;
  if (typeof message !== 'string') message = JSON.stringify(message ?? response);
  return ApplicationFailure.create({
    message,
    type: error?.name || 'FlowError',
    nonRetryable: true,
    details: [{ statusCode, response }],
  });
}

export function createDynamicFlowActivities(dynamicFlowService: DynamicFlowService, teService: TeService) {
  return {
    // runInline=true so the node executes here instead of starting another workflow
    async runNode(input: PoEvent) {
      try {
        return await dynamicFlowService.DynamicFlowProcess(input, true);
      } catch (error) {
        throw toFailure(error);
      }
    },

    // Same as POST /te/eventEmitter; each node inside still runs as its own flowNodeWorkflow
    async runFlow(pfdto: pfDto) {
      try {
        return await teService.EventEmitter(pfdto);
      } catch (error) {
        throw toFailure(error);
      }
    },
  };
}

export type DynamicFlowActivities = ReturnType<typeof createDynamicFlowActivities>;
