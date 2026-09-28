
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
import { DFdashboardTableModule } from './dfd/DFdashboardTable/v1/DFdashboardTable.module';    
import { DFcardMetricsDashboardModule } from './dfd/DFcardMetricsDashboard/v1/DFcardMetricsDashboard.module';    
import { DFpiechartDashboardModule } from './dfd/DFpiechartDashboard/v1/DFpiechartDashboard.module';    
import { DFaiRegistryModule } from './dfd/DFaiRegistry/v1/DFaiRegistry.module';    
import { DFbusinessUnitComboModule } from './dfd/DFbusinessUnitCombo/v1/DFbusinessUnitCombo.module';    
import { DFbusinessOwnerComboModule } from './dfd/DFbusinessOwnerCombo/v1/DFbusinessOwnerCombo.module';    
import { DFdataClassListModule } from './dfd/DFdataClassList/v1/DFdataClassList.module';    
import { DFassetNameComboModule } from './dfd/DFassetNameCombo/v1/DFassetNameCombo.module';    
import { DFmodelDetailsModule } from './dfd/DFmodelDetails/v1/DFmodelDetails.module';    
import { DFAIAgentControlModule } from './dfd/DFAIAgentControl/v1/DFAIAgentControl.module';    
import { DFdiscoveryQueueModule } from './dfd/DFdiscoveryQueue/v1/DFdiscoveryQueue.module';    
import { DFdiscoveryQueueCardsModule } from './dfd/DFdiscoveryQueueCards/v1/DFdiscoveryQueueCards.module';    
import { DFassetCodeNameConcatComboModule } from './dfd/DFassetCodeNameConcatCombo/v1/DFassetCodeNameConcatCombo.module';    
import { DFrecentEvidencePackTableModule } from './dfd/DFrecentEvidencePackTable/v1/DFrecentEvidencePackTable.module';    
import { DFcodeTypeModule } from './dfd/DFcodeType/v1/DFcodeType.module';    
import { DFcodeValueModule } from './dfd/DFcodeValue/v1/DFcodeValue.module';    
import { DFcodeValueComboModule } from './dfd/DFcodeValueCombo/v1/DFcodeValueCombo.module';    
import { DFintegrationSourceModule } from './dfd/DFintegrationSource/v1/DFintegrationSource.module';    
import { DFsourceCategoryComboModule } from './dfd/DFsourceCategoryCombo/v1/DFsourceCategoryCombo.module';    
import { DFintegrationRunModule } from './dfd/DFintegrationRun/v1/DFintegrationRun.module';    
import { DFintegrationFieldMapModule } from './dfd/DFintegrationFieldMap/v1/DFintegrationFieldMap.module';    
import { DFfieldMapComboModule } from './dfd/DFfieldMapCombo/v1/DFfieldMapCombo.module';    
import { DFriskRuleModule } from './dfd/DFriskRule/v1/DFriskRule.module';    
import { DFriskTierCodeComboModule } from './dfd/DFriskTierCodeCombo/v1/DFriskTierCodeCombo.module';    
import { DFriskRuleConditionModule } from './dfd/DFriskRuleCondition/v1/DFriskRuleCondition.module';    
import { DFcertificateTemplateModule } from './dfd/DFcertificateTemplate/v1/DFcertificateTemplate.module';    
import { DFcertificationStageModule } from './dfd/DFcertificationStage/v1/DFcertificationStage.module';    
import { DFAIAgentActionModule } from './dfd/DFAIAgentAction/v1/DFAIAgentAction.module';    
import { DFAIAssetVersionModule } from './dfd/DFAIAssetVersion/v1/DFAIAssetVersion.module';    
import { DFAIAssetDependTypeComboModule } from './dfd/DFAIAssetDependTypeCombo/v1/DFAIAssetDependTypeCombo.module';    
import { DFAIAssetDependencyModule } from './dfd/DFAIAssetDependency/v1/DFAIAssetDependency.module';    
import { PFPAiRegistryModifyModule } from './pfd/PFPAiRegistryModify/v1/PFPAiRegistryModify.module';    
import { PFPaddAiRegistryModule } from './pfd/PFPaddAiRegistry/v1/PFPaddAiRegistry.module';    
import { PFPdataClassModifyModule } from './pfd/PFPdataClassModify/v1/PFPdataClassModify.module';    
import { PFPaddDataClassModule } from './pfd/PFPaddDataClass/v1/PFPaddDataClass.module';    
import { PFPmodelDetailModifyModule } from './pfd/PFPmodelDetailModify/v1/PFPmodelDetailModify.module';    
import { PFPaddAIModelModule } from './pfd/PFPaddAIModel/v1/PFPaddAIModel.module';    
import { PFPagentControlModifyModule } from './pfd/PFPagentControlModify/v1/PFPagentControlModify.module';    
import { PFPaddAgentControlModule } from './pfd/PFPaddAgentControl/v1/PFPaddAgentControl.module';    
import { PFPaddEvidencePackModule } from './pfd/PFPaddEvidencePack/v1/PFPaddEvidencePack.module';    
import { PFPupdateCodeTypeModule } from './pfd/PFPupdateCodeType/v1/PFPupdateCodeType.module';    
import { PFPaddCodeTypeModule } from './pfd/PFPaddCodeType/v1/PFPaddCodeType.module';    
import { PFPdeleteCodeTypeModule } from './pfd/PFPdeleteCodeType/v1/PFPdeleteCodeType.module';    
import { PFPmodifyCodeValueModule } from './pfd/PFPmodifyCodeValue/v1/PFPmodifyCodeValue.module';    
import { PFPaddCodeValueModule } from './pfd/PFPaddCodeValue/v1/PFPaddCodeValue.module';    
import { PFPdeleteCodeValueModule } from './pfd/PFPdeleteCodeValue/v1/PFPdeleteCodeValue.module';    
import { PFPmodifyIntegrationSourceModule } from './pfd/PFPmodifyIntegrationSource/v1/PFPmodifyIntegrationSource.module';    
import { PFPaddIntegrationSourceModule } from './pfd/PFPaddIntegrationSource/v1/PFPaddIntegrationSource.module';    
import { PFPdeleteIntegrationSourceModule } from './pfd/PFPdeleteIntegrationSource/v1/PFPdeleteIntegrationSource.module';    
import { PFPmodifyIntegrationRunModule } from './pfd/PFPmodifyIntegrationRun/v1/PFPmodifyIntegrationRun.module';    
import { PFPaddIntegrationRunModule } from './pfd/PFPaddIntegrationRun/v1/PFPaddIntegrationRun.module';    
import { PFPdeleteIntegraionRunModule } from './pfd/PFPdeleteIntegraionRun/v1/PFPdeleteIntegraionRun.module';    
import { PFPmodifyIntegrationFieldMapModule } from './pfd/PFPmodifyIntegrationFieldMap/v1/PFPmodifyIntegrationFieldMap.module';    
import { PFPaddIntegrationFieldMapModule } from './pfd/PFPaddIntegrationFieldMap/v1/PFPaddIntegrationFieldMap.module';    
import { PFPdeleteIntegrationFieldMapModule } from './pfd/PFPdeleteIntegrationFieldMap/v1/PFPdeleteIntegrationFieldMap.module';    
import { PFPmodifyRiskRuleModule } from './pfd/PFPmodifyRiskRule/v1/PFPmodifyRiskRule.module';    
import { PFPaddRiskRuleModule } from './pfd/PFPaddRiskRule/v1/PFPaddRiskRule.module';    
import { PFPmodifyRiskRuleConditionModule } from './pfd/PFPmodifyRiskRuleCondition/v1/PFPmodifyRiskRuleCondition.module';    
import { PFPaddRiskRuleConditionModule } from './pfd/PFPaddRiskRuleCondition/v1/PFPaddRiskRuleCondition.module';    
import { PFPdeleteRiskRuleConditionModule } from './pfd/PFPdeleteRiskRuleCondition/v1/PFPdeleteRiskRuleCondition.module';    
import { PFPmodifyCertificateTemplateModule } from './pfd/PFPmodifyCertificateTemplate/v1/PFPmodifyCertificateTemplate.module';    
import { PFPaddCertificateTemplateModule } from './pfd/PFPaddCertificateTemplate/v1/PFPaddCertificateTemplate.module';    
import { PFPdeleteCertificateTemplateModule } from './pfd/PFPdeleteCertificateTemplate/v1/PFPdeleteCertificateTemplate.module';    
import { PFPmodifyCertificationtemplateStageModule } from './pfd/PFPmodifyCertificationtemplateStage/v1/PFPmodifyCertificationtemplateStage.module';    
import { PFPaddCertificationTemplateStageModule } from './pfd/PFPaddCertificationTemplateStage/v1/PFPaddCertificationTemplateStage.module';    
import { PFPdeleteCertificationTemplateStageModule } from './pfd/PFPdeleteCertificationTemplateStage/v1/PFPdeleteCertificationTemplateStage.module';    
import { PFPmodifyAgentActionModule } from './pfd/PFPmodifyAgentAction/v1/PFPmodifyAgentAction.module';    
import { PFPaddAgentActionModule } from './pfd/PFPaddAgentAction/v1/PFPaddAgentAction.module';    
import { PFPmodifyAssetVersionModule } from './pfd/PFPmodifyAssetVersion/v1/PFPmodifyAssetVersion.module';    
import { PFPaddAssetVersionModule } from './pfd/PFPaddAssetVersion/v1/PFPaddAssetVersion.module';    
import { PFPmodifyAiAssetDependencyModule } from './pfd/PFPmodifyAiAssetDependency/v1/PFPmodifyAiAssetDependency.module';    
import { PFPaddAiAssetDependencyModule } from './pfd/PFPaddAiAssetDependency/v1/PFPaddAiAssetDependency.module';    
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
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFdashboardTableModule,DFcardMetricsDashboardModule,DFpiechartDashboardModule,DFaiRegistryModule,DFbusinessUnitComboModule,DFbusinessOwnerComboModule,DFdataClassListModule,DFassetNameComboModule,DFmodelDetailsModule,DFAIAgentControlModule,DFdiscoveryQueueModule,DFdiscoveryQueueCardsModule,DFassetCodeNameConcatComboModule,DFrecentEvidencePackTableModule,DFcodeTypeModule,DFcodeValueModule,DFcodeValueComboModule,DFintegrationSourceModule,DFsourceCategoryComboModule,DFintegrationRunModule,DFintegrationFieldMapModule,DFfieldMapComboModule,DFriskRuleModule,DFriskTierCodeComboModule,DFriskRuleConditionModule,DFcertificateTemplateModule,DFcertificationStageModule,DFAIAgentActionModule,DFAIAssetVersionModule,DFAIAssetDependTypeComboModule,DFAIAssetDependencyModule,PFPAiRegistryModifyModule,PFPaddAiRegistryModule,PFPdataClassModifyModule,PFPaddDataClassModule,PFPmodelDetailModifyModule,PFPaddAIModelModule,PFPagentControlModifyModule,PFPaddAgentControlModule,PFPaddEvidencePackModule,PFPupdateCodeTypeModule,PFPaddCodeTypeModule,PFPdeleteCodeTypeModule,PFPmodifyCodeValueModule,PFPaddCodeValueModule,PFPdeleteCodeValueModule,PFPmodifyIntegrationSourceModule,PFPaddIntegrationSourceModule,PFPdeleteIntegrationSourceModule,PFPmodifyIntegrationRunModule,PFPaddIntegrationRunModule,PFPdeleteIntegraionRunModule,PFPmodifyIntegrationFieldMapModule,PFPaddIntegrationFieldMapModule,PFPdeleteIntegrationFieldMapModule,PFPmodifyRiskRuleModule,PFPaddRiskRuleModule,PFPmodifyRiskRuleConditionModule,PFPaddRiskRuleConditionModule,PFPdeleteRiskRuleConditionModule,PFPmodifyCertificateTemplateModule,PFPaddCertificateTemplateModule,PFPdeleteCertificateTemplateModule,PFPmodifyCertificationtemplateStageModule,PFPaddCertificationTemplateStageModule,PFPdeleteCertificationTemplateStageModule,PFPmodifyAgentActionModule,PFPaddAgentActionModule,PFPmodifyAssetVersionModule,PFPaddAssetVersionModule,PFPmodifyAiAssetDependencyModule,PFPaddAiAssetDependencyModule,ErdModule,], 
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
