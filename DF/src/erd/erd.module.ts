import { HttpStatus, Module } from '@nestjs/common';
import { attorneysModule } from './attorneys/attorneys.module';   
import { creditorsModule } from './creditors/creditors.module';   
import { venuesModule } from './venues/venues.module';   
import { venue_special_rulesModule } from './venue_special_rules/venue_special_rules.module';   
import { document_typesModule } from './document_types/document_types.module';   
import { checklist_itemsModule } from './checklist_items/checklist_items.module';   
import { status_lookupModule } from './status_lookup/status_lookup.module';   
import { priority_lookupModule } from './priority_lookup/priority_lookup.module';   
import { rejection_reason_lookupModule } from './rejection_reason_lookup/rejection_reason_lookup.module';   
import { accountsModule } from './accounts/accounts.module';   
import { account_documentsModule } from './account_documents/account_documents.module';   
import { amr_checklist_statusModule } from './amr_checklist_status/amr_checklist_status.module';   
import { amr_review_sessionsModule } from './amr_review_sessions/amr_review_sessions.module';   
import { activity_logModule } from './activity_log/activity_log.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [attorneysModule,creditorsModule,venuesModule,venue_special_rulesModule,document_typesModule,checklist_itemsModule,status_lookupModule,priority_lookupModule,rejection_reason_lookupModule,accountsModule,account_documentsModule,amr_checklist_statusModule,amr_review_sessionsModule,activity_logModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
