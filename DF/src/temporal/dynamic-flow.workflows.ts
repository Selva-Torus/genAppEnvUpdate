import { proxyActivities } from '@temporalio/workflow';
// Only import types: workflow code runs in a sandbox and must not load Nest services
import type { pfDto, PoEvent } from 'src/dto';
import type { DynamicFlowActivities } from './dynamic-flow.activities';

const { runNode } = proxyActivities<DynamicFlowActivities>({
  startToCloseTimeout: '30 minutes',
  // nodes write to DBs / call APIs and are not idempotent, so never retry automatically
  retry: { maximumAttempts: 1 },
});

const { runFlow } = proxyActivities<DynamicFlowActivities>({
  startToCloseTimeout: '2 hours',
  retry: { maximumAttempts: 1 },
});

// One workflow per flow node (apinode, dbnode, decisionnode, ...)
export async function flowNodeWorkflow(input: PoEvent): Promise<any> {
  return await runNode(input);
}

// One workflow per flow run (POST /temporal/flow/run, same body as /te/eventEmitter)
export async function flowWorkflow(pfdto: pfDto): Promise<any> {
  return await runFlow(pfdto);
}
