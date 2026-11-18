import { Provider } from '@nestjs/common';
import { Client, Connection } from '@temporalio/client';
import { temporalAddress } from './temporal.config';

export const TEMPORAL_CLIENT = 'TEMPORAL_CLIENT';

export const temporalProviders: Provider[] = [
  {
    provide: TEMPORAL_CLIENT,
    useFactory: () => {
      // lazy: connects on first use, so the Nest app still starts if Temporal server is down
      const connection = Connection.lazy({ address: temporalAddress() });
      return new Client({ connection });
    },
  },
];
