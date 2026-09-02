import { HttpStatus, Module } from '@nestjs/common';
    import { tob_api_repositoryModule } from './tob_api_repository/tob_api_repository.module';   
    import { tob_consent_requestModule } from './tob_consent_request/tob_consent_request.module';   
    import { tob_api_process_logsModule } from './tob_api_process_logs/tob_api_process_logs.module';   
    import { tob_pricing_masterModule } from './tob_pricing_master/tob_pricing_master.module';   
    import { tob_tpp_registryModule } from './tob_tpp_registry/tob_tpp_registry.module';   
    import { tob_tpp_api_pricingModule } from './tob_tpp_api_pricing/tob_tpp_api_pricing.module';   
    import { tob_tpp_invoice_paymentsModule } from './tob_tpp_invoice_payments/tob_tpp_invoice_payments.module';   
    import { tob_revenue_summaryModule } from './tob_revenue_summary/tob_revenue_summary.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [tob_api_repositoryModule,tob_consent_requestModule,tob_api_process_logsModule,tob_pricing_masterModule,tob_tpp_registryModule,tob_tpp_api_pricingModule,tob_tpp_invoice_paymentsModule,tob_revenue_summaryModule,],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
