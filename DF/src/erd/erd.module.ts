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
import { agent_capabilityModule } from './agent_capability/agent_capability.module';   
import { agent_log_eventModule } from './agent_log_event/agent_log_event.module';   
import { agent_manifestModule } from './agent_manifest/agent_manifest.module';   
import { agent_sessionModule } from './agent_session/agent_session.module';   
import { ai_passportModule } from './ai_passport/ai_passport.module';   
import { budget_quotaModule } from './budget_quota/budget_quota.module';   
import { concern_reportModule } from './concern_report/concern_report.module';   
import { controlModule } from './control/control.module';   
import { control_mappingModule } from './control_mapping/control_mapping.module';   
import { credential_refModule } from './credential_ref/credential_ref.module';   
import { evaluation_runModule } from './evaluation_run/evaluation_run.module';   
import { evaluation_suiteModule } from './evaluation_suite/evaluation_suite.module';   
import { examiner_grantModule } from './examiner_grant/examiner_grant.module';   
import { findingModule } from './finding/finding.module';   
import { incidentModule } from './incident/incident.module';   
import { kill_switch_actionModule } from './kill_switch_action/kill_switch_action.module';   
import { monitoring_ruleModule } from './monitoring_rule/monitoring_rule.module';   
import { telemetry_streamModule } from './telemetry_stream/telemetry_stream.module';   
import { tool_grantModule } from './tool_grant/tool_grant.module';   
import { usage_cost_dailyModule } from './usage_cost_daily/usage_cost_daily.module';   
import { value_metricModule } from './value_metric/value_metric.module';   
import { vendorModule } from './vendor/vendor.module';   
import { ownership_assignmentModule } from './ownership_assignment/ownership_assignment.module';   
import { policy_ruleModule } from './policy_rule/policy_rule.module';   
import { policy_decisionModule } from './policy_decision/policy_decision.module';   
import { promotion_ruleModule } from './promotion_rule/promotion_rule.module';   
import { regulatory_sourceModule } from './regulatory_source/regulatory_source.module';   
import { rate_cardModule } from './rate_card/rate_card.module';   
import { retention_policyModule } from './retention_policy/retention_policy.module';   
import { revocation_receiptModule } from './revocation_receipt/revocation_receipt.module';   
import { alertModule } from './alert/alert.module';   
import { approval_actionModule } from './approval_action/approval_action.module';   
import { approval_requestModule } from './approval_request/approval_request.module';   
import { asset_control_linkModule } from './asset_control_link/asset_control_link.module';   
import { authority_grantModule } from './authority_grant/authority_grant.module';   
import { risk_methodologyModule } from './risk_methodology/risk_methodology.module';   
import { service_identityModule } from './service_identity/service_identity.module';   
import { sod_ruleModule } from './sod_rule/sod_rule.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [ai_assetModule,ai_asset_modelModule,ai_asset_versionModule,ai_asset_tier_assessmentModule,ai_asset_data_classModule,ai_asset_dependencyModule,ai_agent_controlModule,ai_agent_actionModule,audit_eventModule,cert_templateModule,cert_template_stageModule,certificationModule,certification_conditionModule,certification_stageModule,discovery_stagingModule,evidence_exportModule,evidence_export_itemModule,evidence_itemModule,integration_field_mapModule,integration_runModule,integration_sourceModule,risk_ruleModule,risk_rule_conditionModule,sys_code_typeModule,sys_code_valueModule,agent_capabilityModule,agent_log_eventModule,agent_manifestModule,agent_sessionModule,ai_passportModule,budget_quotaModule,concern_reportModule,controlModule,control_mappingModule,credential_refModule,evaluation_runModule,evaluation_suiteModule,examiner_grantModule,findingModule,incidentModule,kill_switch_actionModule,monitoring_ruleModule,telemetry_streamModule,tool_grantModule,usage_cost_dailyModule,value_metricModule,vendorModule,ownership_assignmentModule,policy_ruleModule,policy_decisionModule,promotion_ruleModule,regulatory_sourceModule,rate_cardModule,retention_policyModule,revocation_receiptModule,alertModule,approval_actionModule,approval_requestModule,asset_control_linkModule,authority_grantModule,risk_methodologyModule,service_identityModule,sod_ruleModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
