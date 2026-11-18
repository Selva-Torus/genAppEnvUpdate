import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { v4 as uuid } from 'uuid';
import type { PoEvent } from 'src/dto';
import type { flowNodeWorkflow, flowWorkflow } from './dynamic-flow.workflows';
import type { pfDto } from 'src/dto';
import { TEMPORAL_CLIENT } from './temporal.providers';
import { DYNAMIC_FLOW_TASK_QUEUE, temporalState } from './temporal.config';

// WorkflowFailedError -> ActivityFailure -> ApplicationFailure: the real message/statusCode is at the end of the chain
function toErrorResponse(error: any) {
  let root = error;
  while (root?.cause) root = root.cause;
  const details = root?.details?.[0];
  return { message: root?.message || error?.message, statusCode: details?.statusCode, type: root?.type || root?.name };
}

@Injectable()
export class TemporalService {
  constructor(@Inject(TEMPORAL_CLIENT) private readonly client: Client) {}

  // Used by DynamicFlowService: each flow node runs in the DynamicFlowWorker.
  // workflowId starts with upId so all nodes of one flow run can be searched together in the UI.
 async startFlowNodeWorkflow(input: PoEvent) {
    const pfdto = input?.pfdto;
    const key=pfdto?.key.split(':AFK:')[1]?.split(':')[0] ;

    return this.client.workflow.start<typeof flowNodeWorkflow>('flowNodeWorkflow', {
      taskQueue: DYNAMIC_FLOW_TASK_QUEUE,
      args: [input],
      
      workflowId: ` ${key}-${pfdto?.nodeName}-${pfdto?.upId}}`,
    });
  }

  // Used by POST /temporal/node/run: start the node workflow and wait for its result.
  // HTTP errors (503, 500 on start) mean the node did not run; a failed run comes back as 200 with `error`.
  async runFlowNode(input: PoEvent) {
    if (!temporalState.workerRunning) {
      throw new ServiceUnavailableException('Temporal worker is not running (check TEMPORAL_FLOW_ENABLED and the Temporal server)');
    }
    const handle = await this.startFlowNodeWorkflow(input);
    try {
      const result = await handle.result();
      return { workflowId: handle.workflowId, result };
    } catch (error) {
      return {
        workflowId: handle.workflowId,
        error: toErrorResponse(error),
      };
    }
  }

  // Used by POST /temporal/flow/run: runs the whole flow (same as /te/eventEmitter) as one workflow
  async runFlow(pfdto: pfDto) {
    if (!temporalState.workerRunning) {
      throw new ServiceUnavailableException('Temporal worker is not running (check TEMPORAL_FLOW_ENABLED and the Temporal server)');
    }
    const flowName = pfdto?.key?.split(':AFK:')[1]?.split(':')[0] || 'flow';
    const handle = await this.client.workflow.start<typeof flowWorkflow>('flowWorkflow', {
      taskQueue: DYNAMIC_FLOW_TASK_QUEUE,
      args: [pfdto],
      workflowId: `flow-${flowName}-${uuid()}`,
    });
    try {
      const result = await handle.result();
      return { workflowId: handle.workflowId, result };
    } catch (error) {
      return {
        workflowId: handle.workflowId,
        error: toErrorResponse(error),
      };
    }
  }

  async getStatus(workflowId: string) {
    const handle = this.client.workflow.getHandle(workflowId);
    const description = await handle.describe();
    const status = description.status.name;
    const result = status === 'COMPLETED' ? await handle.result() : null;
    return { workflowId, status, result };
  }
}
