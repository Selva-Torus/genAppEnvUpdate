export const DYNAMIC_FLOW_TASK_QUEUE = "";

export const temporalAddress = () => process.env.TEMPORAL_ADDRESS || 'localhost:7233';

// TEMPORAL_FLOW_ENABLED=true -> every flow node runs through the Temporal worker, otherwise inline as before
export const isFlowTemporalEnabled = () => process.env.TEMPORAL_FLOW_ENABLED === 'true';

// Set by DynamicFlowWorker once its Temporal worker is polling
export const temporalState = { workerRunning: false };
