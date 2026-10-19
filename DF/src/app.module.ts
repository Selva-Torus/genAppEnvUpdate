
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common.Service';
import { RuleService } from './ruleService';
import { CodeService } from './codeService';
import { RedisService } from './redisService';
import { JwtService } from '@nestjs/jwt';
import { JwtServices } from "src/jwt.services";
import { UfModule } from './Torus/v1/uf/uf.module';
import { TeModule } from './Torus/v1/te/te.module';
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { ErdModule } from './erd/erd.module';
import { CdcPrismaService } from './erd/cdc_prisma.service';
import { DFcardMetricsDashboardModule } from './dfd/DFcardMetricsDashboard/v1/DFcardMetricsDashboard.module';    
import { DFpiechartDashboardModule } from './dfd/DFpiechartDashboard/v1/DFpiechartDashboard.module';    
import { DFbarChartDashboardModule } from './dfd/DFbarChartDashboard/v1/DFbarChartDashboard.module';    
import { DFdashboardTableModule } from './dfd/DFdashboardTable/v1/DFdashboardTable.module';    
import { DFaiRegistryModule } from './dfd/DFaiRegistry/v1/DFaiRegistry.module';    
import { DFbusinessUnitComboModule } from './dfd/DFbusinessUnitCombo/v1/DFbusinessUnitCombo.module';    
import { DFbusinessOwnerComboModule } from './dfd/DFbusinessOwnerCombo/v1/DFbusinessOwnerCombo.module';    
import { DFassetTypeCodeComboModule } from './dfd/DFassetTypeCodeCombo/v1/DFassetTypeCodeCombo.module';    
import { DFdiscoverySourceModule } from './dfd/DFdiscoverySource/v1/DFdiscoverySource.module';    
import { DFintegrationSourceComboModule } from './dfd/DFintegrationSourceCombo/v1/DFintegrationSourceCombo.module';    
import { DFriskTierCodeComboModule } from './dfd/DFriskTierCodeCombo/v1/DFriskTierCodeCombo.module';    
import { DFbusinessCriticalityComboModule } from './dfd/DFbusinessCriticalityCombo/v1/DFbusinessCriticalityCombo.module';    
import { DFuseCaseCodeComboModule } from './dfd/DFuseCaseCodeCombo/v1/DFuseCaseCodeCombo.module';    
import { DFregulatoryCodeValueComboModule } from './dfd/DFregulatoryCodeValueCombo/v1/DFregulatoryCodeValueCombo.module';    
import { DFlifecycleStatusCodeComboModule } from './dfd/DFlifecycleStatusCodeCombo/v1/DFlifecycleStatusCodeCombo.module';    
import { DFhostingRegionComboModule } from './dfd/DFhostingRegionCombo/v1/DFhostingRegionCombo.module';    
import { DFdataClassListModule } from './dfd/DFdataClassList/v1/DFdataClassList.module';    
import { DFassetCodeNameConcatComboModule } from './dfd/DFassetCodeNameConcatCombo/v1/DFassetCodeNameConcatCombo.module';    
import { DFdataClassComboModule } from './dfd/DFdataClassCombo/v1/DFdataClassCombo.module';    
import { DFmodelDetailsModule } from './dfd/DFmodelDetails/v1/DFmodelDetails.module';    
import { DFmodelFamilyComboModule } from './dfd/DFmodelFamilyCombo/v1/DFmodelFamilyCombo.module';    
import { DFAIAgentControlModule } from './dfd/DFAIAgentControl/v1/DFAIAgentControl.module';    
import { DFkillSwitchCodeComboModule } from './dfd/DFkillSwitchCodeCombo/v1/DFkillSwitchCodeCombo.module';    
import { DFauthorityLevelComboModule } from './dfd/DFauthorityLevelCombo/v1/DFauthorityLevelCombo.module';    
import { DFAIAgentActionModule } from './dfd/DFAIAgentAction/v1/DFAIAgentAction.module';    
import { DFAIAssetVersionModule } from './dfd/DFAIAssetVersion/v1/DFAIAssetVersion.module';    
import { DFAIAssetDependTypeComboModule } from './dfd/DFAIAssetDependTypeCombo/v1/DFAIAssetDependTypeCombo.module';    
import { DFAIAssetDependencyModule } from './dfd/DFAIAssetDependency/v1/DFAIAssetDependency.module';    
import { DFAIPassportModule } from './dfd/DFAIPassport/v1/DFAIPassport.module';    
import { DFAIModelTableModule } from './dfd/DFAIModelTable/v1/DFAIModelTable.module';    
import { DFAIAgentActionTableModule } from './dfd/DFAIAgentActionTable/v1/DFAIAgentActionTable.module';    
import { DFAICertificationTableModule } from './dfd/DFAICertificationTable/v1/DFAICertificationTable.module';    
import { DFAIChangeHistoryTableModule } from './dfd/DFAIChangeHistoryTable/v1/DFAIChangeHistoryTable.module';    
import { DFAIAUditTableModule } from './dfd/DFAIAUditTable/v1/DFAIAUditTable.module';    
import { DFAttachEvidenceModule } from './dfd/DFAttachEvidence/v1/DFAttachEvidence.module';    
import { DFdiscoveryQueueModule } from './dfd/DFdiscoveryQueue/v1/DFdiscoveryQueue.module';    
import { DFAwaitingReviewModule } from './dfd/DFAwaitingReview/v1/DFAwaitingReview.module';    
import { DFPossibleDuplicatesCardModule } from './dfd/DFPossibleDuplicatesCard/v1/DFPossibleDuplicatesCard.module';    
import { DFtierAssessmentModule } from './dfd/DFtierAssessment/v1/DFtierAssessment.module';    
import { DFcertificateTemplateModule } from './dfd/DFcertificateTemplate/v1/DFcertificateTemplate.module';    
import { DFAssetListModule } from './dfd/DFAssetList/v1/DFAssetList.module';    
import { DFapplyCertificateTempNameModule } from './dfd/DFapplyCertificateTempName/v1/DFapplyCertificateTempName.module';    
import { DFapplyCertStatusComboModule } from './dfd/DFapplyCertStatusCombo/v1/DFapplyCertStatusCombo.module';    
import { DFapplyCertificateStageComboModule } from './dfd/DFapplyCertificateStageCombo/v1/DFapplyCertificateStageCombo.module';    
import { DFcertificationStagesTableModule } from './dfd/DFcertificationStagesTable/v1/DFcertificationStagesTable.module';    
import { DFagentCertificateTableModule } from './dfd/DFagentCertificateTable/v1/DFagentCertificateTable.module';    
import { DFmyApprovalRiskModule } from './dfd/DFmyApprovalRisk/v1/DFmyApprovalRisk.module';    
import { DFruleConditionComboModule } from './dfd/DFruleConditionCombo/v1/DFruleConditionCombo.module';    
import { DFriskRuleConditionModule } from './dfd/DFriskRuleCondition/v1/DFriskRuleCondition.module';    
import { DFriskOperatorCodeComboModule } from './dfd/DFriskOperatorCodeCombo/v1/DFriskOperatorCodeCombo.module';    
import { DFstatusCodeComboModule } from './dfd/DFstatusCodeCombo/v1/DFstatusCodeCombo.module';    
import { DFcertificationConditionModule } from './dfd/DFcertificationCondition/v1/DFcertificationCondition.module';    
import { DFlistallShowStagesModule } from './dfd/DFlistallShowStages/v1/DFlistallShowStages.module';    
import { DFmyApprovalTableModule } from './dfd/DFmyApprovalTable/v1/DFmyApprovalTable.module';    
import { DFreportModule } from './dfd/DFreport/v1/DFreport.module';    
import { DFriskRuleModule } from './dfd/DFriskRule/v1/DFriskRule.module';    
import { DFassetTypeCertCompoModule } from './dfd/DFassetTypeCertCompo/v1/DFassetTypeCertCompo.module';    
import { DFuseCaseComboModule } from './dfd/DFuseCaseCombo/v1/DFuseCaseCombo.module';    
import { DFcertificationStageModule } from './dfd/DFcertificationStage/v1/DFcertificationStage.module';    
import { DFcertificationTemplateComboModule } from './dfd/DFcertificationTemplateCombo/v1/DFcertificationTemplateCombo.module';    
import { DFcertificationStageTypeCodeComboModule } from './dfd/DFcertificationStageTypeCodeCombo/v1/DFcertificationStageTypeCodeCombo.module';    
import { DFcodeTypeModule } from './dfd/DFcodeType/v1/DFcodeType.module';    
import { DFcodeValueModule } from './dfd/DFcodeValue/v1/DFcodeValue.module';    
import { DFcodeValueComboModule } from './dfd/DFcodeValueCombo/v1/DFcodeValueCombo.module';    
import { PFPAiRegistryModifyModule } from './pfd/PFPAiRegistryModify/v1/PFPAiRegistryModify.module';    
import { PFPaddAiRegistryModule } from './pfd/PFPaddAiRegistry/v1/PFPaddAiRegistry.module';    
import { PFPdataClassModifyModule } from './pfd/PFPdataClassModify/v1/PFPdataClassModify.module';    
import { PFPaddDataClassModule } from './pfd/PFPaddDataClass/v1/PFPaddDataClass.module';    
import { PFPmodelDetailModifyModule } from './pfd/PFPmodelDetailModify/v1/PFPmodelDetailModify.module';    
import { PFPaddAIModelModule } from './pfd/PFPaddAIModel/v1/PFPaddAIModel.module';    
import { PFPagentControlModifyModule } from './pfd/PFPagentControlModify/v1/PFPagentControlModify.module';    
import { PFPaddAgentControlModule } from './pfd/PFPaddAgentControl/v1/PFPaddAgentControl.module';    
import { PFPmodifyAgentActionModule } from './pfd/PFPmodifyAgentAction/v1/PFPmodifyAgentAction.module';    
import { PFPaddAgentActionModule } from './pfd/PFPaddAgentAction/v1/PFPaddAgentAction.module';    
import { PFPmodifyAssetVersionModule } from './pfd/PFPmodifyAssetVersion/v1/PFPmodifyAssetVersion.module';    
import { PFPaddAssetVersionModule } from './pfd/PFPaddAssetVersion/v1/PFPaddAssetVersion.module';    
import { PFPmodifyAiAssetDependencyModule } from './pfd/PFPmodifyAiAssetDependency/v1/PFPmodifyAiAssetDependency.module';    
import { PFPaddAiAssetDependencyModule } from './pfd/PFPaddAiAssetDependency/v1/PFPaddAiAssetDependency.module';    
import { PFPdiscoveryQueueResetConnectorModule } from './pfd/PFPdiscoveryQueueResetConnector/v1/PFPdiscoveryQueueResetConnector.module';    
import { PFPdiscoveryQueueRunConnectorModule } from './pfd/PFPdiscoveryQueueRunConnector/v1/PFPdiscoveryQueueRunConnector.module';    
import { PFPdiscoveryStagingModule } from './pfd/PFPdiscoveryStaging/v1/PFPdiscoveryStaging.module';    
import { PFPmodifyRiskTierAssesmentModule } from './pfd/PFPmodifyRiskTierAssesment/v1/PFPmodifyRiskTierAssesment.module';    
import { PFPriskRuleEvaluationModule } from './pfd/PFPriskRuleEvaluation/v1/PFPriskRuleEvaluation.module';    
import { PFPapplyCertificateModule } from './pfd/PFPapplyCertificate/v1/PFPapplyCertificate.module';    
import { PFPcertificationStagesModifyModule } from './pfd/PFPcertificationStagesModify/v1/PFPcertificationStagesModify.module';    
import { PFPcertificateModifyModule } from './pfd/PFPcertificateModify/v1/PFPcertificateModify.module';    
import { PFPmodifyAssessmentTypeApprovalModule } from './pfd/PFPmodifyAssessmentTypeApproval/v1/PFPmodifyAssessmentTypeApproval.module';    
import { PFPreviewApprovalModule } from './pfd/PFPreviewApproval/v1/PFPreviewApproval.module';    
import { PFPcertificationConditionModifyModule } from './pfd/PFPcertificationConditionModify/v1/PFPcertificationConditionModify.module';    
import { PFPaddCertificationConditionModule } from './pfd/PFPaddCertificationCondition/v1/PFPaddCertificationCondition.module';    
import { PFPdeleteCertificationConditionModule } from './pfd/PFPdeleteCertificationCondition/v1/PFPdeleteCertificationCondition.module';    
import { PFPAddEvidenceAttachmentModule } from './pfd/PFPAddEvidenceAttachment/v1/PFPAddEvidenceAttachment.module';    
import { PFPmodifyRiskRuleModule } from './pfd/PFPmodifyRiskRule/v1/PFPmodifyRiskRule.module';    
import { PFPaddRiskRuleModule } from './pfd/PFPaddRiskRule/v1/PFPaddRiskRule.module';    
import { PFPmodifYRuleConditionModule } from './pfd/PFPmodifYRuleCondition/v1/PFPmodifYRuleCondition.module';    
import { PFPaddRiskRuleConditionModule } from './pfd/PFPaddRiskRuleCondition/v1/PFPaddRiskRuleCondition.module';    
import { PFPdeleteRiskRuleConditionModule } from './pfd/PFPdeleteRiskRuleCondition/v1/PFPdeleteRiskRuleCondition.module';    
import { PFPmodifyCertificateTemplateModule } from './pfd/PFPmodifyCertificateTemplate/v1/PFPmodifyCertificateTemplate.module';    
import { PFPaddCertificateTemplateModule } from './pfd/PFPaddCertificateTemplate/v1/PFPaddCertificateTemplate.module';    
import { PFPdeleteCertificateTemplateModule } from './pfd/PFPdeleteCertificateTemplate/v1/PFPdeleteCertificateTemplate.module';    
import { PFPmodifyCertificationtemplateStageModule } from './pfd/PFPmodifyCertificationtemplateStage/v1/PFPmodifyCertificationtemplateStage.module';    
import { PFPaddCertificationTemplateStageModule } from './pfd/PFPaddCertificationTemplateStage/v1/PFPaddCertificationTemplateStage.module';    
import { PFPdeleteCertificationTemplateStageModule } from './pfd/PFPdeleteCertificationTemplateStage/v1/PFPdeleteCertificationTemplateStage.module';    
import { PFPupdateCodeTypeModule } from './pfd/PFPupdateCodeType/v1/PFPupdateCodeType.module';    
import { PFPaddCodeTypeModule } from './pfd/PFPaddCodeType/v1/PFPaddCodeType.module';    
import { PFPdeleteCodeTypeModule } from './pfd/PFPdeleteCodeType/v1/PFPdeleteCodeType.module';    
import { PFPmodifyCodeValueModule } from './pfd/PFPmodifyCodeValue/v1/PFPmodifyCodeValue.module';    
import { PFPaddCodeValueModule } from './pfd/PFPaddCodeValue/v1/PFPaddCodeValue.module';    
import { PFPdeleteCodeValueModule } from './pfd/PFPdeleteCodeValue/v1/PFPdeleteCodeValue.module';    
import { EncryptInterceptor } from './encryptInterceptor';
import { DecryptInterceptor } from './decryptInterceptor';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';
import { PersistenceService } from './persistence.service';
import { SwaggerGuard } from './swagger.guard';
import { AuthGuard } from './auth.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { getRedisConnectionOptions } from './redis.config';


@Module({
  imports: [
    BullModule.forRoot({
      connection: getRedisConnectionOptions(),
    }),
  CacheModule.register({isGlobal:true}),
   ThrottlerModule.forRoot({
    throttlers: [
      { name: 'default', ttl: 10_000, limit: 120 }
    ],
  }),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFcardMetricsDashboardModule,DFpiechartDashboardModule,DFbarChartDashboardModule,DFdashboardTableModule,DFaiRegistryModule,DFbusinessUnitComboModule,DFbusinessOwnerComboModule,DFassetTypeCodeComboModule,DFdiscoverySourceModule,DFintegrationSourceComboModule,DFriskTierCodeComboModule,DFbusinessCriticalityComboModule,DFuseCaseCodeComboModule,DFregulatoryCodeValueComboModule,DFlifecycleStatusCodeComboModule,DFhostingRegionComboModule,DFdataClassListModule,DFassetCodeNameConcatComboModule,DFdataClassComboModule,DFmodelDetailsModule,DFmodelFamilyComboModule,DFAIAgentControlModule,DFkillSwitchCodeComboModule,DFauthorityLevelComboModule,DFAIAgentActionModule,DFAIAssetVersionModule,DFAIAssetDependTypeComboModule,DFAIAssetDependencyModule,DFAIPassportModule,DFAIModelTableModule,DFAIAgentActionTableModule,DFAICertificationTableModule,DFAIChangeHistoryTableModule,DFAIAUditTableModule,DFAttachEvidenceModule,DFdiscoveryQueueModule,DFAwaitingReviewModule,DFPossibleDuplicatesCardModule,DFtierAssessmentModule,DFcertificateTemplateModule,DFAssetListModule,DFapplyCertificateTempNameModule,DFapplyCertStatusComboModule,DFapplyCertificateStageComboModule,DFcertificationStagesTableModule,DFagentCertificateTableModule,DFmyApprovalRiskModule,DFruleConditionComboModule,DFriskRuleConditionModule,DFriskOperatorCodeComboModule,DFstatusCodeComboModule,DFcertificationConditionModule,DFlistallShowStagesModule,DFmyApprovalTableModule,DFreportModule,DFriskRuleModule,DFassetTypeCertCompoModule,DFuseCaseComboModule,DFcertificationStageModule,DFcertificationTemplateComboModule,DFcertificationStageTypeCodeComboModule,DFcodeTypeModule,DFcodeValueModule,DFcodeValueComboModule,PFPAiRegistryModifyModule,PFPaddAiRegistryModule,PFPdataClassModifyModule,PFPaddDataClassModule,PFPmodelDetailModifyModule,PFPaddAIModelModule,PFPagentControlModifyModule,PFPaddAgentControlModule,PFPmodifyAgentActionModule,PFPaddAgentActionModule,PFPmodifyAssetVersionModule,PFPaddAssetVersionModule,PFPmodifyAiAssetDependencyModule,PFPaddAiAssetDependencyModule,PFPdiscoveryQueueResetConnectorModule,PFPdiscoveryQueueRunConnectorModule,PFPdiscoveryStagingModule,PFPmodifyRiskTierAssesmentModule,PFPriskRuleEvaluationModule,PFPapplyCertificateModule,PFPcertificationStagesModifyModule,PFPcertificateModifyModule,PFPmodifyAssessmentTypeApprovalModule,PFPreviewApprovalModule,PFPcertificationConditionModifyModule,PFPaddCertificationConditionModule,PFPdeleteCertificationConditionModule,PFPAddEvidenceAttachmentModule,PFPmodifyRiskRuleModule,PFPaddRiskRuleModule,PFPmodifYRuleConditionModule,PFPaddRiskRuleConditionModule,PFPdeleteRiskRuleConditionModule,PFPmodifyCertificateTemplateModule,PFPaddCertificateTemplateModule,PFPdeleteCertificateTemplateModule,PFPmodifyCertificationtemplateStageModule,PFPaddCertificationTemplateStageModule,PFPdeleteCertificationTemplateStageModule,PFPupdateCodeTypeModule,PFPaddCodeTypeModule,PFPdeleteCodeTypeModule,PFPmodifyCodeValueModule,PFPaddCodeValueModule,PFPdeleteCodeValueModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,JwtServices,RedisService,ConfigService,EnvData,PersistenceService,SwaggerGuard, {
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: DecryptInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard
    },CdcPrismaService],
})
export class AppModule implements NestModule {
  configure() {}
}
