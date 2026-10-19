import { HttpStatus, Module } from '@nestjs/common';
import { ai_assetModule } from './ai_asset/ai_asset.module';   
import { ai_asset_modelModule } from './ai_asset_model/ai_asset_model.module';   
import { ai_asset_versionModule } from './ai_asset_version/ai_asset_version.module';   
import { ai_asset_tier_assessmentModule } from './ai_asset_tier_assessment/ai_asset_tier_assessment.module';   
import { ai_asset_data_classModule } from './ai_asset_data_class/ai_asset_data_class.module';   
import { ai_asset_dependencyModule } from './ai_asset_dependency/ai_asset_dependency.module';   
import { ai_agent_controlModule } from './ai_agent_control/ai_agent_control.module';   
import { ai_agent_actionModule } from './ai_agent_action/ai_agent_action.module';   
import { audit_eventModule } from './audit_event/audit_event.module';   
import { cert_templateModule } from './cert_template/cert_template.module';   
import { cert_template_stageModule } from './cert_template_stage/cert_template_stage.module';   
import { certificationModule } from './certification/certification.module';   
import { certification_conditionModule } from './certification_condition/certification_condition.module';   
import { certification_stageModule } from './certification_stage/certification_stage.module';   
import { discovery_stagingModule } from './discovery_staging/discovery_staging.module';   
import { evidence_exportModule } from './evidence_export/evidence_export.module';   
import { evidence_export_itemModule } from './evidence_export_item/evidence_export_item.module';   
import { evidence_itemModule } from './evidence_item/evidence_item.module';   
import { integration_field_mapModule } from './integration_field_map/integration_field_map.module';   
import { integration_runModule } from './integration_run/integration_run.module';   
import { integration_sourceModule } from './integration_source/integration_source.module';   
import { risk_ruleModule } from './risk_rule/risk_rule.module';   
import { risk_rule_conditionModule } from './risk_rule_condition/risk_rule_condition.module';   
import { sys_code_typeModule } from './sys_code_type/sys_code_type.module';   
import { sys_code_valueModule } from './sys_code_value/sys_code_value.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [ai_assetModule,ai_asset_modelModule,ai_asset_versionModule,ai_asset_tier_assessmentModule,ai_asset_data_classModule,ai_asset_dependencyModule,ai_agent_controlModule,ai_agent_actionModule,audit_eventModule,cert_templateModule,cert_template_stageModule,certificationModule,certification_conditionModule,certification_stageModule,discovery_stagingModule,evidence_exportModule,evidence_export_itemModule,evidence_itemModule,integration_field_mapModule,integration_runModule,integration_sourceModule,risk_ruleModule,risk_rule_conditionModule,sys_code_typeModule,sys_code_valueModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
